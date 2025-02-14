import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
  },
]

const router = createRouter({
  history: createWebHistory('/notes-app'),
  routes,
})

export default router
