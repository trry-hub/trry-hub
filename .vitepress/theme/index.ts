import './styles/index.css'
import { h, App } from 'vue'
import { VPTheme } from '@vue/theme'
import PreferenceSwitch from './components/PreferenceSwitch.vue'
import {
  preferComposition,
  preferSFC,
  filterHeadersByPreference
} from './components/preferences'
import SponsorsAside from './components/SponsorsAside.vue'
import VueSchoolLink from './components/VueSchoolLink.vue'
import Banner from './components/Banner.vue'
import TextAd from './components/TextAd.vue'
import SvgIcon from './components/SvgIcon.vue'

// 加载 svg 图标
import 'virtual:svg-icons-register'
// 加载 iconify 图标
import { downloadAndInstall } from '../iconify'
import icons from '../iconify/index.json'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    return h(VPTheme.Layout, null, {
      banner: () => h(Banner),
      'sidebar-top': () => h(PreferenceSwitch),
      'aside-mid': () => h(SponsorsAside)
    })
  },
  enhanceApp({ app }: { app: App }) {
    if (icons.useType === 'offline') {
      console.log('%c [ icons.useType ]-40', 'font-size:13px; background:pink; color:#bf2c9f;', icons.useType)
      for (const info of icons.collections) {
        downloadAndInstall(info)
      }
    }
    app.provide('prefer-composition', preferComposition)
    app.provide('prefer-sfc', preferSFC)
    app.provide('filter-headers', filterHeadersByPreference)
    app.component('VueSchoolLink', VueSchoolLink)
    app.component('TextAd', TextAd)
    app.component('SvgIcon', SvgIcon)

  }
})
