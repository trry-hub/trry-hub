import type { DefaultTheme } from 'vitepress'
import navbar from '../utils/navbar'
import generateSideBar from '../utils/sidebar'
import { docsRoot } from './site'

const sidebar = generateSideBar({
  path: docsRoot,
})

export function createThemeConfig(): DefaultTheme.Config {
  return {
    nav: navbar,
    sidebar,
    logo: '/logo.svg',
    outline: 'deep',
    outlineTitle: '目录',
    lastUpdatedText: '上次更新',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/trry-hub' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/HBherRA' },
    ],
    editLink: {
      pattern: 'https://github.com/trry-hub/trry-hub/edit/main/:path',
      text: '在GitHub上编辑此页面',
    },
    footer: {
      copyright: `Copyright © 2014-${new Date().getFullYear()} trry`,
    },
  }
}
