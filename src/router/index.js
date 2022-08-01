import { createRouter, createWebHashHistory } from 'vue-router'
import FlightsView from '@/views/FlightsView.vue'
import ExpenseView from '@/views/ExpenseView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ExpenseView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/flights',
    name: 'Flights',
    component: FlightsView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
