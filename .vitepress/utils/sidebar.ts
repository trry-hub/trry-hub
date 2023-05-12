import { join } from 'path';
import { readdirSync, statSync } from 'fs';
import { type DefaultTheme } from 'vitepress';

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

const DEFAULT_IGNORE_FOLDER = ['scripts', 'components', 'assets', '.vitepress'];

export default function generateSideBar(option: SidebarPluginOptionType) {

  option.path = option.path ?? 'docs';
  option.prefix = option.prefix ?? option.path ?? 'docs';
  const docsPath = join(process.cwd(), option.path);

  function removePrefix(str: string, identifier: string | RegExp): string {
    return str.replace(identifier, '');
  }

  function createSideBarItems(
    targetPath: string,
    ...reset: string[]
  ): DefaultTheme.SidebarItem[] {
    const { ignoreIndexItem, deletePrefix, collapsed = false, sideBarItemsResolved, beforeCreateSideBarItems } = option;
    const rawNode = readdirSync(join(targetPath, ...reset));
    const node = beforeCreateSideBarItems?.(rawNode) ?? rawNode;
    if (ignoreIndexItem && node.length === 1 && node[0] === 'index.md') {
      return [];
    }
    const result: DefaultTheme.SidebarItem[] = [];
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
        let text = fname;

        if (deletePrefix) {
          text = removePrefix(text, deletePrefix);
        }

        if (items.length > 0) {
          const sidebarItem: DefaultTheme.SidebarItem = {
            text,
            items
          };
          // vitePress sidebar option collapsed
          sidebarItem.collapsed = collapsed;
          result.push(sidebarItem);
        }
      } else {
        // is filed
        if (ignoreIndexItem && fname === 'index.md' || /^-.*\.(md|MD)$/.test(fname)) {
          continue;
        }
        const fileName = fname.replace(/\.md$/, '');
        let text = fileName;
        if (deletePrefix) {
          text = removePrefix(text, deletePrefix);
        }

        const item: DefaultTheme.SidebarItem = {
          text,
          link: '/' + option.prefix + '/' + [...reset, `${fileName}.html`].join('/')
        };
        result.push(item);
      }
    }
    return sideBarItemsResolved?.(result) ?? result;
  }

  function createSideBarGroups(
    targetPath: string,
    folder: string
  ): DefaultTheme.SidebarItem[] {
    return [
      {
        items: createSideBarItems(targetPath, folder)
      }
    ];
  }

  function createSidebarMulti(
    path: string,
    prefix: string
  ): DefaultTheme.SidebarMulti {
    const { ignoreList = [], ignoreIndexItem = false, sideBarResolved } = option;
    const il = [...DEFAULT_IGNORE_FOLDER, ...ignoreList];
    const data: DefaultTheme.SidebarMulti = {};
    const node = readdirSync(path).filter(
      (n) => statSync(join(path, n)).isDirectory() && !il.includes(n)
    );

    for (const k of node) {
      data[`/${prefix}/${k}/`] = createSideBarGroups(path, k);
    }

    if (ignoreIndexItem) {
      for (const i in data) {
        let obj = data[i];
        obj = obj.filter((i) => (i.items != null) && i.items.length > 0);
        if (obj.length === 0) {
          Reflect.deleteProperty(data, i);
        }
      }
    }

    return sideBarResolved?.(data) ?? data;
  }


  let sidebar = createSidebarMulti(docsPath, option.prefix);
  return sidebar
}
