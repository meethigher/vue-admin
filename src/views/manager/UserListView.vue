<template>
  <div class="header">用户列表</div>
  <el-table :data="computedUserList" style="width: 100%">
    <el-table-column type="index" :index="(pageIndex-1)*pageSize+1" label="序号" width="80"/>
    <el-table-column prop="nickname" label="用户名" width="180"/>
    <el-table-column prop="tel" label="手机号" width="180"/>
    <el-table-column label="头像" width="180">
      <template #default="scope">
        <!--scope.row表示当前这一行的所有数据-->
        <el-image style="width: 100px; height: 100px" :src="scope.row.avatar" :fit="fit" />
      </template>
    </el-table-column>
    <el-table-column label="创建时间" width="180">
      <template #default="scope">
        <!--scope.row表示当前这一行的所有数据-->
        <el-tag>{{ new Date(parseInt(scope.row.createTime)).toLocaleString() }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
  <!--分页显示-->
  <el-pagination background v-model:current-page="pageIndex" v-model:page-size="pageSize" layout="prev, pager, next"
                 :total="userList.length"/>
</template>

<script>
import {userList} from "@/api/user.js";


export default {
  data() {
    return {
      userList: [],
      //当前页
      pageIndex: 1,
      pageSize: 15,

    };
  },
  mounted() {
    userList().then(res => {
      if (res.code == "200") {
        this.userList = res.data;
        console.log(this.userList[0].createTime);
        console.log(new Date(this.userList[0].createTime).toLocaleString());
      } else {
        ElMessage.error(res.message);
      }
    });

  },
  computed: {
    computedUserList() {
      return this.userList.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize);
    }
  }
};


</script>

<style lang="less" scoped>
.header {
  margin-bottom: 16px;
}
</style>
