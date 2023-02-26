<template>
  <div class="header">轮播图列表</div>
  <el-table :data="computedBannerList" style="width: 100%">
    <el-table-column type="index" :index="(pageIndex-1)*pageSize+1" label="序号" width="80"/>
    <el-table-column prop="alt" label="alt" width="180"/>
    <el-table-column prop="link" label="link" width="180"/>
    <el-table-column label="图片" width="180">
      <template #default="scope">
        <!--scope.row表示当前这一行的所有数据-->
        <el-image style="width: 100px; height: 100px" :src="scope.row.img" :fit="fit"/>
      </template>
    </el-table-column>
  </el-table>
  <!--分页显示-->
  <el-pagination background v-model:current-page="pageIndex" v-model:page-size="pageSize" layout="prev, pager, next"
                 :total="bannerList.length"/>
</template>

<script>
import {bannerList} from "@/api/banner.js";

export default {
  data() {
    return {
      bannerList: [],
      //当前页
      pageIndex: 1,
      pageSize: 5,
    };
  },
  mounted() {
    bannerList().then(res => {
      if (res.code == "200") {
        this.bannerList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  },
  computed: {
    computedBannerList() {
      return this.bannerList.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  margin-bottom: 16px;
}
.el-image {
  width: 100px;
}
</style>
