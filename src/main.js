import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import router from './router'
import store from './store'
import Axios from './api'
import utils from './utils'

import 'amfe-flexible'
import 'vant/lib/index.css'
import '@/assets/style/common.less'
import '@/assets/style/enum.less'
Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$api = Axios
Vue.prototype.$utils = utils
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
