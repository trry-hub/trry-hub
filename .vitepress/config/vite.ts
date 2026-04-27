import type { UserConfig as VitePressUserConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import createVitePlugins from '../../vite/plugins'

type ViteConfig = NonNullable<VitePressUserConfig['vite']>

const browserFsShim = fileURLToPath(new URL('../shims/browser-fs.ts', import.meta.url))
const browserPathShim = fileURLToPath(new URL('../shims/browser-path.ts', import.meta.url))

export function createViteConfig(env: Record<string, string>, isBuild: boolean): ViteConfig {
  return {
    define: {
      __VUE_OPTIONS_API__: false,
    },
    resolve: {
      alias: {
        fs: browserFsShim,
        path: browserPathShim,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
        sass: {
          api: 'modern',
        },
      },
    },
    optimizeDeps: {
      exclude: ['@vue/repl'],
    },
    ssr: {
      noExternal: ['@vue/repl'],
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity,
    },
    json: {
      stringify: true,
    },
    plugins: createVitePlugins(env, isBuild) as ViteConfig['plugins'],
  } satisfies ViteConfig
}
