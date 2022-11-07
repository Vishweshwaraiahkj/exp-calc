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
    name: 'Tools',
    component: ToolsView
  },
  {
    path: '/icons',
    name: 'Icons',
    component: IconsView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
