import { h, App, Component } from 'vue'
import VPTheme from 'vitepress/theme'
import MyLayout from './pages/MyLayout.vue'

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

    // 自动导入 components 下的所有组件
    const modules = import.meta.glob<{ default: Component }>('./components/*.vue', { eager: true })

    for (let key of Object.keys(modules)) {
      const name = key.split('/').pop()?.split('.')[0] as string
      app.component(name, modules[key].default)
    }
  }
})
