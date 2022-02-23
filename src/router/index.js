import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Boolean',
    component: () => import(/* webpackChunkName: "Boolean" */ '../views/Boolean.vue')
  },
  {
    path: '/Array',
    name: 'Array',
    component: () => import(/* webpackChunkName: "Array" */ '../views/Array.vue')
  },
  {
    path: '/ObjectTarget',
    name: 'ObjectTarget',
    component: () => import(/* webpackChunkName: "ObjectTarget" */ '../views/ObjectTarget.vue')
  },
  {
    path: '/ObjectExclude',
    name: 'ObjectExclude',
    component: () => import(/* webpackChunkName: "ObjectExclude" */ '../views/ObjectExclude.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
