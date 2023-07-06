// import createInspector from './inspector'
// import createAutoImport from './auto-import'
// import createComponents from './components'
// import createSetupExtend from './setup-extend'
import createUnocss from './unocss'
import createSvgIcon from './svg-icon'
import createAutoImport from './auto-import'
// import createLayouts from './layouts'
// import createPages from './pages'
// import createCompression from './compression'
// import createSpritesmith from './spritesmith'

export default function createVitePlugins(viteEnv: any, isBuild = false)  {
  const vitePlugins = []
  // vitePlugins.push(createInspector())
  // vitePlugins.push(createAutoImport())
  // vitePlugins.push(createComponents())
  // vitePlugins.push(createSetupExtend())
  vitePlugins.push(createUnocss())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(...createAutoImport())
  // vitePlugins.push(createLayouts())
  // vitePlugins.push(createPages())
  // isBuild && vitePlugins.push(...createCompression(viteEnv))
  // vitePlugins.push(...createSpritesmith(isBuild))
  return vitePlugins
}
