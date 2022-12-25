/*
* 1. 先导入 vue-router
* createRouter 创建路由的方法
* createWebHistory 路由模式(History) 前面用的是 / 开头，一般是要后端配合使用，容易产生404
* createWebHashHistory 路由模式(Hash) 前面用的是 # 开头，无需配合
* */
import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
// 导入home组件
import HomeView from '../views/HomeView.vue'

// 配置路由规则
const routers=[
  {
    //访问时的路径
    path: '/',
    //命名路由，路由的别名
    name: 'home',
    //当访问到对应路由后需要展示的组件
    //路由的急加载
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    //路由的懒加载，对于一些不确定立即需要显示的页面，可以使用懒加载
    component: () => import('../views/AboutView.vue')
  }
]

// 创建router
const router = createRouter({
  // 配置路由模式
  history: createWebHistory(import.meta.env.BASE_URL),
  // 配置路由规则
  routes: routers
})

// 导出路由
export default router
