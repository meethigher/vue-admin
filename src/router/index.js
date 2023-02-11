/*
* 1. 先导入 vue-router
* createRouter 创建路由的方法
* createWebHistory 路由模式(History) 前面用的是 / 开头，一般是要后端配合使用，容易产生404
* createWebHashHistory 路由模式(Hash) 前面用的是 # 开头，无需配合
* */
import {createRouter, createWebHistory, createWebHashHistory} from "vue-router";
// 导入home组件
import HomeView from "../views/HomeView.vue";
//账号管理
import ManagerIndexView from "../views/manager/ManagerIndexView.vue";
import ManagerListView from "../views/manager/ManagerListView.vue";
import UserListView from "../views/manager/UserListView.vue";
//轮播图管理
import BannerIndexView from "../views/banner/BannerIndexView.vue";
import BannerListView from "../views/banner/BannerListView.vue";
import AddBannerView from "../views/banner/AddBannerView.vue";
// 配置路由规则
export const routers = [
    {
        //访问时的路径
        path: "/",
        //命名路由，路由的别名
        name: "home",
        label: "首页",
        //当访问到对应路由后需要展示的组件
        //路由的急加载
        component: HomeView,
        //子路由，路由path不需要加/。路由嵌套，可以理解成二级路由
        children: [
            {
                path: "manager",
                name: "manager",
                label: "账户管理",
                component: ManagerIndexView,
                //再次配置子路由
                children: [
                    {
                        path: "managerList",
                        name: "managerList",
                        label: "管理员列表",
                        component: ManagerListView
                    },
                    {
                        path: "userList",
                        name: "userList",
                        label: "用户列表",
                        component: UserListView
                    }
                ]

            },
            {
                path: "banner",
                name: "banner",
                label: "轮播图管理",
                component: BannerIndexView,
                children: [
                    {
                        path: "bannerList",
                        name: "bannerList",
                        label: "轮播图列表",
                        component: BannerListView
                    },
                    {
                        path: "addBanner",
                        name: "addBanner",
                        label: "添加轮播图",
                        component: AddBannerView
                    },

                ]
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        label: "登录",
        //路由的懒加载，对于一些不确定立即需要显示的页面，可以使用懒加载
        component: () => import("../views/LoginView.vue")
    }
];

// 创建router
const router = createRouter({
    // 配置路由模式
    history: createWebHistory(import.meta.env.BASE_URL),
    // 配置路由规则
    routes: routers
});

// 导出路由
export default router;
