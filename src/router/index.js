import Vue from 'vue'
import VueRouter from 'vue-router'
import Toys from '../views/Toys.vue'
import Login from '../views/Login.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Toys',
    component: Toys,
    alias: ['/toys'],
    meta:{
      login: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component:Login
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser
  let isAuthrequired = to.matched.some (route => route.meta.login)
  //debugger
  if(!user && isAuthrequired) {
    next('/login')
  } else {
    next()
  }
})
export default router
