<script>
import {User} from "@element-plus/icons-vue";
import {mapState} from "vuex";

export default {
  data() {
    return {};
  },
  /*接收传值*/
  props: [
    "zhedie"
  ],
  computed: {
    ...mapState(['currentPath'])
  },
  components: {
    User
  }
};
</script>
<template>
  <!--el-menu自带的collapse属性-->
  <el-menu :default-active="currentPath" :collapse="!zhedie"
           :collapse-transition="false" :router="true" class="el-menu-vertical-demo">
    <el-menu-item index="/">首页</el-menu-item>
    <el-sub-menu index="/manager">
      <template #title>
        <el-icon>
          <User/>
        </el-icon>
        <span>账户管理</span>
      </template>
      <el-menu-item index="/manager/managerList">管理员列表</el-menu-item>
      <el-menu-item index="/manager/userList">用户列表</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/banner">
      <template #title>
        <el-icon>
          <User/>
        </el-icon>
        <span>轮播图管理</span>
      </template>
      <el-menu-item index="/banner/bannerList">轮播图列表</el-menu-item>
      <el-menu-item index="/banner/addBanner">添加轮播图</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
