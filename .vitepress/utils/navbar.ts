import { readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type { DefaultTheme } from 'vitepress'
import { docsRoot } from '../config/site'

type NavItem = DefaultTheme.NavItem

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

/**
 * 根据内容目录下的文件夹生成导航栏
 * link 只匹配文件夹下第一个md文件，如果没有md文件，则递归到有md文件为止
 */
function generateNavBarItems(dir: string, docsDir: string): NavItem[] {
  const navItems: NavItem[] = []
  const res = sortItems(readdirSync(join(docsDir, dir)))

  for (const item of res) {
    const itemPath = join(docsDir, dir, item)
    const fullPath = join(dir, item).replace(/\.md$/i, '')

    if (isFile(itemPath)) {
      navItems.push({
        text: item.replace(/\.md$/i, ''),
        activeMatch: `^/${fullPath}/`,
        link: fullPath,
      })
      continue
    }

    const link = findFirstMarkdownPath(fullPath, docsDir)
    if (link) {
      navItems.push({
        text: item,
        activeMatch: `^/${fullPath}/`,
        link,
      })
      // generateNavBarItemSync(path.join(dir, item), docsDir, obj.items)
    }
  }

  return navItems
}

// 递归到第一个md文件组成路径
function findFirstMarkdownPath(dir: string, docsDir: string): string | undefined {
  const res = sortItems(readdirSync(join(docsDir, dir)))

  for (const item of res) {
    const itemPath = join(docsDir, dir, item)
    const fullPath = join(dir, item)

    if (isFile(itemPath) && /\.md$/i.test(item)) {
      return fullPath.replace(/\.md$/i, '')
    }
  }

  for (const item of res) {
    const itemPath = join(docsDir, dir, item)
    const fullPath = join(dir, item)

    if (!isFile(itemPath)) {
      const childPath = findFirstMarkdownPath(fullPath, docsDir)
      if (childPath) {
        return childPath
      }
    }
  }
}

function isFile(filePath: string) {
  try {
    const stats = statSync(filePath)
    return stats.isFile()
  } catch (err) {
    console.error(err)
    return false
  }
}

// 获取当前项目根路径
const docsDir = resolve(process.cwd())
const navBar = generateNavBarItems(docsRoot, docsDir)

export default navBar

// export default [
//   { text: '首页', link: '/' },
//   { text: '指南', link: '/guide/' },
//   { text: '组件', link: '/components/' },
//   { text: '工具', link: '/tools/' },
//   { text: '资源', link: '/resources/' },
//   { text: 'GitHub', link: '' },
// ]
