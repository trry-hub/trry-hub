import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { type DefaultTheme } from 'vitepress'

export interface SidebarPluginOptionType {
  ignoreList?: string[]
  path?: string
  prefix?: string
  createIndex?: boolean
  ignoreIndexItem?: boolean
  deletePrefix?: string | RegExp
  collapsed?: boolean
  sideBarResolved?: (data: DefaultTheme.SidebarMulti) => DefaultTheme.SidebarMulti
  sideBarItemsResolved?: (data: DefaultTheme.SidebarItem[]) => DefaultTheme.SidebarItem[]
  beforeCreateSideBarItems?: (data: string[]) => string[]
}

const DEFAULT_IGNORE_FOLDER = ['scripts', 'components', 'assets', '.vitepress']

const TOP_LEVEL_ORDER = [
  'AI提效',
  '前端基础',
  '前端框架',
  '工程化',
  '开发工具',
  '后端数据',
  '算法面试',
  '系统软件',
  '知识资料',
]

const collator = new Intl.Collator('zh-CN', {
  numeric: true,
  sensitivity: 'base',
})

function sortItems(items: string[]) {
  return [...items].sort((a, b) => {
    const aIndex = TOP_LEVEL_ORDER.indexOf(a)
    const bIndex = TOP_LEVEL_ORDER.indexOf(b)

    if (aIndex !== -1 || bIndex !== -1) {
      return (aIndex === -1 ? TOP_LEVEL_ORDER.length : aIndex)
        - (bIndex === -1 ? TOP_LEVEL_ORDER.length : bIndex)
    }

    return collator.compare(a, b)
  })
}

function sortDirectoryEntries(targetPath: string, items: string[]) {
  return sortItems(items).sort((a, b) => {
    const aIsDirectory = statSync(join(targetPath, a)).isDirectory()
    const bIsDirectory = statSync(join(targetPath, b)).isDirectory()

    if (aIsDirectory !== bIsDirectory) {
      return aIsDirectory ? 1 : -1
    }

    return 0
  })
}

export default function generateSideBar(option: SidebarPluginOptionType) {
  const docsPathOption = option.path ?? 'docs'
  const prefix = option.prefix ?? docsPathOption
  const docsPath = join(process.cwd(), docsPathOption)

  function removePrefix(str: string, identifier: string | RegExp): string {
    return str.replace(identifier, '')
  }

  function createSideBarItems(
    targetPath: string,
    ...reset: string[]
  ): DefaultTheme.SidebarItem[] {
    const {
      ignoreIndexItem,
      deletePrefix,
      collapsed = false,
      sideBarItemsResolved,
      beforeCreateSideBarItems,
    } = option
    const currentPath = join(targetPath, ...reset)
    const rawNode = sortDirectoryEntries(currentPath, readdirSync(currentPath))
    const node = beforeCreateSideBarItems?.(rawNode) ?? rawNode

    if (ignoreIndexItem && node.length === 1 && node[0] === 'index.md') {
      return []
    }

    const result: DefaultTheme.SidebarItem[] = []

    for (const fname of node) {
      if (statSync(join(targetPath, ...reset, fname)).isDirectory()) {
        // is directory
        // ignore cur node if items length is 0
        const items = createSideBarItems(
          join(targetPath),
          ...reset,
          fname
        );
        // replace directory name, if yes
        let text = fname

        if (deletePrefix) {
          text = removePrefix(text, deletePrefix)
        }

        if (items.length > 0) {
          const sidebarItem: DefaultTheme.SidebarItem = {
            text,
            items
          }
          // vitePress sidebar option collapsed
          sidebarItem.collapsed = collapsed
          result.push(sidebarItem)
        }
      } else {
        // is filed
        if ((ignoreIndexItem && fname === 'index.md') || /^-.*\.(md|MD)$/.test(fname)) {
          continue
        }
        const fileName = fname.replace(/\.md$/i, '')
        let text = fileName
        if (deletePrefix) {
          text = removePrefix(text, deletePrefix)
        }

        const item: DefaultTheme.SidebarItem = {
          text,
          link: `/${prefix}/${[...reset, `${fileName}.html`].join('/')}`,
        }
        result.push(item)
      }
    }
    return sideBarItemsResolved?.(result) ?? result
  }

  function createSideBarGroups(
    targetPath: string,
    folder: string
  ): DefaultTheme.SidebarItem[] {
    return [
      {
        items: createSideBarItems(targetPath, folder),
      },
    ]
  }

  function createSidebarMulti(
    path: string,
    prefix: string
  ): DefaultTheme.SidebarMulti {
    const { ignoreList = [], ignoreIndexItem = false, sideBarResolved } = option
    const ignoreFolders = [...DEFAULT_IGNORE_FOLDER, ...ignoreList]
    const data: DefaultTheme.SidebarMulti = {}
    const node = sortItems(readdirSync(path)).filter(
      (n) => statSync(join(path, n)).isDirectory() && !ignoreFolders.includes(n)
    )

    for (const k of node) {
      data[`/${prefix}/${k}/`] = createSideBarGroups(path, k)
    }

    if (ignoreIndexItem) {
      for (const i in data) {
        const groups = data[i]
        if (!Array.isArray(groups)) {
          continue
        }

        const visibleGroups = groups.filter((item) => item.items != null && item.items.length > 0)
        if (visibleGroups.length === 0) {
          Reflect.deleteProperty(data, i)
        } else {
          data[i] = visibleGroups
        }
      }
    }

    return sideBarResolved?.(data) ?? data
  }


  const sidebar = createSidebarMulti(docsPath, prefix)
  return sidebar
}
