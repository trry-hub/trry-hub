import { h } from 'vue'
import Theme from 'vitepress/theme'
import './fonts/font.css'
import './styles/var.css'
// import HomePreview from './components/HomePreview.vue'
import ZoomImg from './components/ZoomImg.vue'
import CustomerEvaluate from './components/CustomerEvaluate.vue'
import ImgPreview from './components/ImgPreview.vue'

// import {ImgPreview} from 'naive-ui'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
    //   'home-features-after': () => h(HomePreview)
    })
  },
  enhanceApp({ app }) {
    app.component('ZoomImg', ZoomImg)
    app.component('CustomerEvaluate', CustomerEvaluate)
    app.component('ImgPreview', ImgPreview)
  }
}
