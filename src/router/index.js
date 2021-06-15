import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

import children from "./modules/index"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: () => import('../views/monitor/Monitor.vue')
  },
  {
    path: '/zhejiang',
    name: 'zhejiang',
    component: () => import('../views/zhejiang/zhejiang.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../layout/Layout.vue'),
    hidden: true,
    children: children,
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  let _isLogin = store.state.isLogin;
  if (_isLogin) {
    next();
  }
  else {
    if (to.path == '/login') {
      next();
    } else {
      next('/login');
    }
  }
  NProgress.done();
})

export default router
