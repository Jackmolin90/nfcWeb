import Vue from 'vue'
import 'normalize.css/normalize.css' // a modern alternative to css resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang'
import '@/icons'
import constant from '@/common/constant'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(Element, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

Vue.prototype.$constant = constant

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
