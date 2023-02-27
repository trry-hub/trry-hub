import createAutoImport from './auto-import'
import createComponents from './components'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = []
    vitePlugins.push(createComponents())
    vitePlugins.push(createAutoImport())
    return vitePlugins
}
