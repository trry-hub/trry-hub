import createAutoImport from './auto-import'
import createComponents from './components'
// import createSetupExtend from './setup-extend'
import createUnocss from './unocss'
import createSvgIcon from './svg-icon'
// import createLayouts from './layouts'
// import createPages from './pages'
// import createCompression from './compression'
// import createSpritesmith from './spritesmith'
// import createDemoBlock from './demo-block'

export default function createVitePlugins(viteEnv: any, isBuild = false)  {
  const vitePlugins = []
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  // vitePlugins.push(createSetupExtend())
  vitePlugins.push(createUnocss())
  vitePlugins.push(createSvgIcon(isBuild))
  // vitePlugins.push(createLayouts())
  // vitePlugins.push(createPages())
  // isBuild && vitePlugins.push(...createCompression(viteEnv))
  // vitePlugins.push(...createSpritesmith(isBuild))
  // vitePlugins.push(createDemoBlock())
  return vitePlugins
}
