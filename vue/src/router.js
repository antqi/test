import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home.vue'),
    },
    {
      path: '/store',
      name: 'store',
      component: () => import('@/views/store/index.vue'),
    },
    {
      path: '/diy',
      name: 'diy',
      component: () => import('@/views/diy.vue'),
    },
  ],
})

export default router
