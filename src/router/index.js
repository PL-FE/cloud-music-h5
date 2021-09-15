import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/layout'
import Login from '@/views/about/login.vue'
import Recommend from '@/components/recommend/index.vue'
import songDetails from '@/components/song-details/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout
  },
  {
    name: 'recommend',
    path: '/recommend',
    component: Recommend
  },
  {
    name: 'song-details',
    path: '/song-details/:id',
    component: songDetails
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})
// // 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (getCookie('MUSIC_U')) {
    next()
  } else {
    if (to.name !== 'login') {
      localStorage.clear()
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

function getCookie (name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (document.cookie.match(reg)) {
    const arr = document.cookie.match(reg)
    return unescape(arr[2])
  }
  return null
}

export default router
