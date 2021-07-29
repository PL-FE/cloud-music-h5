import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout
  }
]

export default new VueRouter({
  routes
})
