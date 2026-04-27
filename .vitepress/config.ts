import { defineConfig, loadEnv } from 'vitepress'
import { createMarkdownConfig } from './config/markdown'
import { siteMetadata, isCustomElement } from './config/site'
import { createThemeConfig } from './config/theme'
import { createViteConfig } from './config/vite'

export default ({ mode, command }: { mode: string; command: string }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    ...siteMetadata,
    lastUpdated: true,
    themeConfig: createThemeConfig(),
    markdown: createMarkdownConfig(),
    vue: {
      template: {
        compilerOptions: {
          isCustomElement,
        }
      },
    },
    vite: createViteConfig(env, command === 'build'),
  })
}
