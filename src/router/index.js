import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [    // 路由配置
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },
  
  {
    path: '/',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "about" */ '../views/Layout.vue'),

    children:[
      {
        path: '',
        name: 'home',
        component: HomeView
        
      },
      
      {
        path: 'admin',
        name: 'AdminView',
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
      },
      {
        path: 'reader',
        name: 'ReaderView',
        component: () => import(/* webpackChunkName: "about" */ '../views/ReaderView.vue')
      },
      {
        path: 'book',
        name: 'BookView',
        component: () => import(/* webpackChunkName: "about" */ '../views/BookView.vue')
      },
      {
        path: 'borrow',
        name: 'BorrowView',
        component: () => import(/* webpackChunkName: "about" */ '../views/BorrowView.vue')
      }

    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
