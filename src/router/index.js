import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/layout'
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
  }
]

export default new VueRouter({
  routes
})
