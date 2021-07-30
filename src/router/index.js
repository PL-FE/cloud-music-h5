import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/layout'
import Recommend from '@/views/home-page/recommend/index.vue'

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
  }
]

export default new VueRouter({
  routes
})
