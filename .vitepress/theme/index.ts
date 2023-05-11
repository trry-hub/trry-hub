import { h, App } from 'vue'
import VPTheme from 'vitepress/theme'
import MyLayout from './pages/MyLayout.vue'
import SvgIcon from './components/SvgIcon.vue'


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
  enhanceApp({ app }: { app: App }) {
    // app.provide('prefer-composition', preferComposition)
    // app.provide('prefer-sfc', preferSFC)
    // app.provide('filter-headers', filterHeadersByPreference)
    // app.component('VueSchoolLink', VueSchoolLink)
    // app.component('TextAd', TextAd)
    app.component('SvgIcon', SvgIcon)
  }
})
