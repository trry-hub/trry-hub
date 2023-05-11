import { loadEnv } from 'vitepress'
import { defineConfigWithTheme } from 'vitepress'
// import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import createVitePlugins from '../vite/plugins'
import navbar from './utils/navbar'
import anchor from 'markdown-it-anchor'


export default ({ mode, command }: { mode: string; command: string }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfigWithTheme({
    extends: baseConfig,
    title: 'blog',
    base: '/trry-github/',
    description: 'trry-blog',
    srcDir: 'src',

    themeConfig: {
      nav: navbar,
      outline: 'deep',
      outlineTitle: '目录',
      search: {
        provider: 'local'
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/trry-github' },
        { icon: 'twitter', link: 'https://twitter.com/vuejs' },
        { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
      ],

      editLink: {
        pattern: 'https://github.com/trry-github/trry-github/edit/main/:path',
        text: '在GitHub上编辑此页面',
      },
      algolia: {
        appId: '9LTFBEUH19',
        apiKey: '95b87f6f59ebff1c5e40cda2c92d323c',
        indexName: 'trry-io',
        placeholder: '搜索文档',
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            searchBox: {
              resetButtonTitle: '清除查询条件',
              resetButtonAriaLabel: '清除查询条件',
              cancelButtonText: '取消',
              cancelButtonAriaLabel: '取消',
            },
            startScreen: {
              recentSearchesTitle: '搜索历史',
              noRecentSearchesText: '没有搜索历史',
              saveRecentSearchButtonTitle: '保存至搜索历史',
              removeRecentSearchButtonTitle: '从搜索历史中移除',
              favoriteSearchesTitle: '收藏',
              removeFavoriteSearchButtonTitle: '从收藏中移除',
            },
            errorScreen: {
              titleText: '无法获取结果',
              helpText: '你可能需要检查你的网络连接',
            },
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
              searchByText: '搜索提供者',
            },
            noResultsScreen: {
              noResultsText: '无法找到相关结果',
              suggestedQueryText: '你可以尝试查询',
              reportMissingResultsText: '你认为该查询应该有结果？',
              reportMissingResultsLinkText: '点击反馈',
            },
          },
        },
      },

      footer: {
        license: {
          text: 'MIT License',
          link: 'https://opensource.org/licenses/MIT'
        },
        copyright: `Copyright © 2014-${new Date().getFullYear()} trry`
      }
    },

    markdown: {
      lineNumbers: true,
      // anchor: {
      //   permalink: anchor.permalink.headerLink()
      // },
      // toc: { includeLevel: [1, 2] },
      config: (md) => {
        md.use(require('markdown-it-katex'))
        const originalRender = md.render
        md.render = function () {
          return originalRender.apply(this, arguments as any).replace(/<span class="katex">/g, '<span v-pre class="katex">')
        }
      },
    },

    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['iconify-icon'].includes(tag)
        }
      }
    },

    vite: {
      plugins: createVitePlugins(env, command === 'build')
    }
  })
}
