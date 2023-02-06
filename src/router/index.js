import { createRouter, createWebHashHistory } from 'vue-router'
import SettingsView from '@/views/SettingsView.vue'
import ExpenseView from '@/views/ExpenseView.vue'
import IconsView from '@/views/IconsView.vue'
import TasksView from '@/views/TasksView.vue'
import ToolsView from '@/views/ToolsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ExpenseView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TasksView
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
