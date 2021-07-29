import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/index'
import Recommend from '@/views/recommend/index'

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
