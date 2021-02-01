import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import router from './router'
import store from './store'
import Axios from './api'
import 'amfe-flexible'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$api = Axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
