import { h, App, Component } from 'vue'
import VPTheme from 'vitepress/theme'
import MyLayout from './pages/MyLayout.vue'


// 加载 svg 图标
import 'virtual:svg-icons-register'
import 'uno.css'

import './styles/index.css'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    return h(MyLayout, null, {
      // banner: () => h(Banner),
      // 'sidebar-top': () => h(PreferenceSwitch),
      // 'aside-mid': () => h(SponsorsAside),
    })
  },
  async enhanceApp({ app }: { app: App }) {
    // app.provide('prefer-composition', preferComposition)
    // app.provide('prefer-sfc', preferSFC)
    // app.provide('filter-headers', filterHeadersByPreference)
    // app.component('VueSchoolLink', VueSchoolLink)
    // app.component('TextAd', TextAd)
    // 获取components 下的所有组件
    const modules = import.meta.glob('./components/*.vue')

    for (let key of Object.keys(modules)) {
      const name = key.split('/').pop()?.split('.')[0] as string
      const componentModule = await modules[key]() as {default: Component}
      app.component(name, componentModule.default || componentModule)
    }
  }
})
