import { createRouter, createWebHashHistory } from 'vue-router'
import ToolsView from '@/views/ToolsView.vue'
import ExpenseView from '@/views/ExpenseView.vue'
import IconsView from '@/views/IconsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ExpenseView
  },
  {
    path: '/tools',
    name: 'tools',
    component: ToolsView
  },
  {
    path: '/icons',
    name: 'icons',
    component: IconsView
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/PortfolioView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
