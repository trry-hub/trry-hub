import { defineConfig } from 'vitepress'
// 自动引入zh目录下文件为sidebar
import sidebar from "../utils/sidebar";
// import createVitePlugins from '../vite/plugins'

export default defineConfig({
    title: "trry-blog",
    lang: 'zh-CN',
    base: "/docs/",
    description: "简单记录生活",
    head: [
        ["link", { rel: 'icon', href: '/favicon.ico' }],
        [
            "link",
            {
                rel: "stylesheet",
                href: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css",
            },
        ],
    ],
    lastUpdated: true,
    themeConfig: {
        logo: '/trry.png',
        footer: {
            copyright: 'Copyright © 2020-present trry'
        },
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdatedText: "上次更新",
        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/trry-github' }
        ],

        editLink: {
            pattern: 'https://github.com/trry-github/-Learning/edit/docs/docs/:path',
            text: '在GitHub上编辑此页面'
        },
        outline: 'deep',
        algolia: {
            appId: '9LTFBEUH19',
            apiKey: "95b87f6f59ebff1c5e40cda2c92d323c",
            indexName: "trry-io",
            placeholder: '搜索文档',
            translations: {
                button: {
                    buttonText: '搜索文档',
                    buttonAriaLabel: '搜索文档'
                },
                modal: {
                    searchBox: {
                        resetButtonTitle: '清除查询条件',
                        resetButtonAriaLabel: '清除查询条件',
                        cancelButtonText: '取消',
                        cancelButtonAriaLabel: '取消'
                    },
                    startScreen: {
                        recentSearchesTitle: '搜索历史',
                        noRecentSearchesText: '没有搜索历史',
                        saveRecentSearchButtonTitle: '保存至搜索历史',
                        removeRecentSearchButtonTitle: '从搜索历史中移除',
                        favoriteSearchesTitle: '收藏',
                        removeFavoriteSearchButtonTitle: '从收藏中移除'
                    },
                    errorScreen: {
                        titleText: '无法获取结果',
                        helpText: '你可能需要检查你的网络连接'
                    },
                    footer: {
                        selectText: '选择',
                        navigateText: '切换',
                        closeText: '关闭',
                        searchByText: '搜索提供者'
                    },
                    noResultsScreen: {
                        noResultsText: '无法找到相关结果',
                        suggestedQueryText: '你可以尝试查询',
                        reportMissingResultsText: '你认为该查询应该有结果？',
                        reportMissingResultsLinkText: '点击反馈'
                    }
                }
            }
        },
        nav: [
            { text: "首页", link: "/" },
        ],
        sidebar
    },
    markdown: {
        lineNumbers: true,
        anchor: { permalink: false },
        toc: { includeLevel: [1, 2] },
        config: (md) => {
            md.use(require("markdown-it-katex"));
            const originalRender = md.render;
            md.render = function () {
                return originalRender
                    .apply(this, arguments)
                    .replace(
                        /<span class="katex">/g,
                        '<span v-pre class="katex">'
                    );
            };
        },
    },
    // plugins: createVitePlugins(env, command === 'build'),
})
