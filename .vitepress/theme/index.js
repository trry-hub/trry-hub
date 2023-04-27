import { h } from 'vue'
import { VPTheme } from '@vue/theme'
import './styles/index.css'
import ZoomImg from './components/ZoomImg.vue'
import CustomerEvaluate from './components/CustomerEvaluate.vue'
import HomePreview from './components/HomePreview.vue'

// import ImgPreview from './components/ImgPreview.vue'
// import {ImgPreview} from 'naive-ui'

export default Object.assign({}, VPTheme, {
  Layout() {
    return h(VPTheme.Layout, null, {
      'home-features-after': () => h(HomePreview),
    })
  },
  enhanceApp({ app }) {
    // app.component('ZoomImg', ZoomImg)
    // app.component('CustomerEvaluate', CustomerEvaluate)
    // app.component('ImgPreview', ImgPreview)
  },
})
