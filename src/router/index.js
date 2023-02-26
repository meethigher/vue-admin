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
//产品管理
import ProductIndexView from "../views/product/ProductIndexView.vue";
import ProductListView from "../views/product/ProductListView.vue";
import AddProductView from "../views/product/AddProductView.vue";
//导入图标
import EChartsIndexView from "../views/echarts/EChartsIndexView.vue";
import EChartsShowView from "../views/echarts/EChartsShowView.vue";
//excel管理
import ExcelIndexView from "../views/excel/ExcelIndexView.vue";
import ExcelImportView from "../views/excel/ExcelImportView.vue";
import ExcelExportView from "../views/excel/ExcelExportView.vue";
import EditorIndexView from "../views/editor/EditorIndexView.vue";
import EditorShowView from "../views/editor/EditorShowView.vue";
import MapIndexView from "../views/map/MapIndexView.vue";
import MapShowView from "../views/map/MapShowView.vue";
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
            },
            {
                path: "product",
                name: "product",
                label: "产品管理",
                component: ProductIndexView,
                children: [
                    {
                        path: "productList",
                        name: "productList",
                        label: "产品列表",
                        component: ProductListView
                    },
                    {
                        path: "addProduct",
                        name: "addProduct",
                        label: "添加产品",
                        component: AddProductView
                    },

                ]
            },
            {
                path: "echarts",
                name: "echarts",
                label: "图标管理",
                component: EChartsIndexView,
                children: [
                    {
                        path: "echartsShow",
                        name: "echartsShow",
                        label: "显示图标",
                        component: EChartsShowView
                    }
                ]
            },
            {
                path: "excel",
                name: "excel",
                label: "Excel管理",
                component: ExcelIndexView,
                children: [
                    {
                        path: "excelImport",
                        name: "excelImport",
                        label: "Excel导入",
                        component: ExcelImportView
                    },
                    {
                        path: "excelExport",
                        name: "excelExport",
                        label: "Excel导出",
                        component: ExcelExportView
                    }
                ]
            },
            {
                path: "editor",
                name: "editor",
                label: "富文本编辑器",
                component: EditorIndexView,
                children: [
                    {
                        path: "editorShow",
                        name: "editorShow",
                        label: "显示编辑器",
                        component: EditorShowView
                    }
                ]
            },
            {
                path: "map",
                name: "map",
                label: "地图管理",
                component: MapIndexView,
                children: [
                    {
                        path: "mapShow",
                        name: "mapShow",
                        label: "百度地图",
                        component: MapShowView
                    }
                ]
            },
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
