<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item v-for="item in list" :key="item.name" :to="{name: item.name}">{{ item.label }}
    </el-breadcrumb-item>

    <!--    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>-->
    <!--    <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>-->
    <!--    <el-breadcrumb-item>promotion list</el-breadcrumb-item>-->
    <!--    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>-->
  </el-breadcrumb>
</template>
<script>
import {routers} from "@/router/index.js";

export default {
  data() {
    //放到外面是为了只执行一次，用来记录所有路由name对应的label
    this.routersMap = new Map();
    // 用来处理将路由处理成map
    this.initRoutesMap(routers);
    console.log(this.routersMap);
    return {
      list: []
    };
  },
  methods: {
    initRoutesMap(routes) {
      routes.forEach(route => {
        this.routersMap.set(route.name, route.label);
        //如果有子路由
        if (route.children) {
          //递归
          this.initRoutesMap(route.children);
        }
      });
    }
  },
  mounted() {
    /**
     * $router与$route区别
     *
     * $router就是用来做页面路由跳转用的
     * $routes是用来做路由信息查询的，比如面包屑导航
     */
    // console.log(this.$route);//在mounted里面不能做到实时
  },
  //监听器
  watch: {
    //监听$route变化
    $route: {
      //初始化时，令handler调用一次
      immediate: true,
      handler(route) {
        //记录当前的页面路由路径
        this.$store.commit("updateCurrentPath",route.path);
        //监听到路由发生变化之后，获取跳转的路径和对应的名称
        this.list = route.matched.map(item => {
          /**
           * [
           *  {name:'home',label:'首页'},
           *  {name:'manager',label:'账号管理'}
           * ]
           */
          return {
            name: item.name,
            label: this.routersMap.get(item.name)
          };
        });
      }


    }
  }
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 16px;
}
</style>