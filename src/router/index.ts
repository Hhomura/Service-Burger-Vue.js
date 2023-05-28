import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pedidos', //caminho da rota
      name: 'Pedidos',  //View Utilizada
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Pedidos.vue') //import da View
    },
    {
      path: '/teste',
      name: 'Teste',

      component: () => import('../views/Teste.vue')
    },
  ]
})

export default router
