import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'stop search',
        component: () => import('@/views/StopView/StopSuche.vue'),
      },
    ],
  },
  {
    path: '/stops/:id',
    name: 'stop details',
    component: () => import('@/views/StopView/StopDetails.vue'),
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('@/views/FavoritesView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: () => import('@/views/PageNotFound.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory('/vbb-stop-service/'),
})

export { routes }

export default router
