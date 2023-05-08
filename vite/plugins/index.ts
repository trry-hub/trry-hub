import type { PluginOption } from 'vitepress/vite'
import Vue from 'vitepress'
// import vueJsx from '@vitejs/plugin-vue-jsx'

// import createHtml from './html'
// import createAutoImport from './auto-import'
// import createComponents from './components'
// import createSetupExtend from './setup-extend'
// import createUnocss from './unocss'
import createSvgIcon from './svg-icon'
// import createI18n from './i18n'
// import createMock from './mock'
// import createLayouts from './layouts'
// import createPages from './pages'
// import createCompression from './compression'
// import createSpritesmith from './spritesmith'

export default function createVitePlugins(viteEnv: any, isBuild = false) {
  console.log(
    '%c [ viteEnv ]-19',
    'font-size:13px; background:pink; color:#bf2c9f;',
    viteEnv
  )
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // Vue({
    //   reactivityTransform: true
    // })
    // vueJsx()
  ]
  // vitePlugins.push(createHtml(viteEnv, isBuild))
  // vitePlugins.push(createAutoImport())
  // vitePlugins.push(createComponents())
  // vitePlugins.push(createSetupExtend())
  // vitePlugins.push(createUnocss())
  // vitePlugins.push(createSvgIcon(isBuild))
  // vitePlugins.push(createI18n())
  // vitePlugins.push(createMock(viteEnv, isBuild))
  // vitePlugins.push(createLayouts())
  // vitePlugins.push(createPages())
  // isBuild && vitePlugins.push(...createCompression(viteEnv))
  // vitePlugins.push(...createSpritesmith(isBuild))
  return vitePlugins
}
