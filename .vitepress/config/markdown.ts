import type { UserConfig } from 'vitepress'
import markdownItMathjax3 from 'markdown-it-mathjax3'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'

export function createMarkdownConfig(): UserConfig['markdown'] {
  return {
    lineNumbers: true,
    config: (md) => {
      md.use(markdownItMathjax3)
      md.use(vitepressDemoPlugin)
    },
  }
}
