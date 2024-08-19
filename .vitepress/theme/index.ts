import { h, App, Component } from 'vue'
import VPTheme from 'vitepress/theme'
import MyLayout from './pages/MyLayout.vue'

import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


// 加载 svg 图标
import 'virtual:svg-icons-register'
import 'uno.css'

import './styles/index.css'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    return h(MyLayout, null)
  },
  async enhanceApp({ app }: { app: App }) {

    app.use(ElementPlus)
    app.component('demo-preview', ElementPlusContainer)

    // 自动导入 components 下的所有组件
    const modules = import.meta.glob('./components/*.vue')

    for (let key of Object.keys(modules)) {
      const name = key.split('/').pop()?.split('.')[0] as string
      const componentModule = await modules[key]() as { default: Component }
      app.component(name, componentModule.default || componentModule)
    }
  }
})
