<template>
  <div class="header">管理员列表
    <el-button type="primary" @click="addAdminButton">添加管理员</el-button>
  </div>
  <el-table :data="computedTableData" style="width: 100%">
    <el-table-column type="index" :index="(pageIndex-1)*pageSize+1" label="序号" width="80"/>
    <el-table-column prop="adminname" label="管理员名称" width="180"/>
    <el-table-column label="管理员权限" width="180">
      <template #default="scope">
        <!--scope.row表示当前这一行的所有数据-->
        <el-tag :type="scope.row.role==1?'success':''">{{ scope.row.role == 1 ? "管理员" : "超级管理员" }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button size="small" type="primary" @click="updateAdminButton(scope.row)">编辑</el-button>
        <el-button size="small" type="success" @click="deleteAdminButton(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--分页显示-->
  <el-pagination background v-model:current-page="pageIndex" v-model:page-size="pageSize" layout="prev, pager, next"
                 :total="tableData.length"/>
  <!--添加管理员-抽屉效果-->
  <el-drawer
      v-model="drawer" :title="interfaceType=='add'?'添加管理员':'修改管理员'"
      :before-close="beforeClose">
    <template #header>
      <h4>{{ interfaceType == "add" ? "添加管理员" : "修改管理员" }}</h4>
    </template>
    <el-form>
      <el-form-item label="管理员账号">
        <el-input placeholder="请输入管理员账号" v-model="formData.adminname"/>
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input placeholder="请输入管理员密码" v-model="formData.password"/>
      </el-form-item>
      <el-form-item label="管理员角色">
        <el-select placeholder="请选择管理员角色" v-model="formData.role">
          <el-option label="管理员" value="管理员"/>
          <el-option label="超级管理员" value="超级管理员"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-tree ref="treeRef" show-checkbox :data="menus" node-key="path" default-expand-all="true"
                 :default-checked-keys="defaultCheckedKeys"/>
      </el-form-item>
      <el-button v-if="interfaceType=='add'" size="small" type="primary" @click="add">添加</el-button>
      <el-button v-else="interface=='update'" size="small" type="primary" @click="update">修改</el-button>

    </el-form>
  </el-drawer>
</template>

<script>
import {adminList, addAdmin, updateAdmin, deleteAdmin} from "@/api/user.js";
import {routers} from "../../router/index.js";

export default {
  name: "ManagerListView",
  data() {
    return {
      tableData: [],
      //当前页
      pageIndex: 1,
      pageSize: 15,
      //是否显示抽屉
      drawer: false,
      //路由信息
      menus: routers[0].children,
      //管理员数据
      formData: {
        adminname: "",
        password: "",
        role: "",
        checkedKeys: ""
      },
      //默认选中项，编辑时权限数据的展示
      defaultCheckedKeys: [],
      //类型: add or update
      interfaceType: ""
    };
  },
  methods: {
    beforeClose() {
      this.drawer = false;
      this.formData = {};
      this.defaultCheckedKeys = [];
      if (this.$refs.treeRef) {
        this.$refs.treeRef.setCheckedKeys([]);
      }
    },
    formatCheckedKeys() {
      //只能拿到子级路由
      const list = this.$refs.treeRef.getCheckedNodes(true);
      //用来存放父级路由的label
      const tempList = [];
      //最终结果
      const result = [];
      //遍历拿到所有父级路由，方法含义查看https://www.runoob.com/jsref/jsref-obj-array.html
      list.forEach(item => {
        let parent = this.menus.find(mitem => {
          return mitem.children.some(child => child.label == item.label);
        });
        if (tempList.includes(parent.label)) {
          result.find(item => item.label == parent.label).children.push(item);
        } else {
          tempList.push(parent.label);
          result.push({
            label: parent.label,
            path: parent.path,
            children: [item]
          });
        }
      });
      //将权限树赋值
      return result;
    },
    addAdminButton() {
      this.drawer = true;
      this.interfaceType = "add";
    },
    updateAdminButton(row) {
      this.interfaceType = "update";
      //打开抽屉
      this.drawer = true;
      //获取当前的一行数据
      this.formData.adminname = row.adminname;
      this.formData.role = row.role == "1" ? "管理员" : "超级管理员";
      this.formData.checkedKeys = row.checkedKeys;
      //拥有的权限列表path
      const checkedKeys = [];
      this.formData.checkedKeys.forEach(parent => {
        parent.children.forEach(item => {
          checkedKeys.push(item.path);
        });
      });
      this.defaultCheckedKeys = checkedKeys;
    },
    deleteAdminButton(row) {
      ElMessageBox.confirm(
          "删除管理员名称为" + row.adminname + "的账号, 是否继续?",
          "操作确认提示",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          }
      )
          .then(() => {
            deleteAdmin({adminid: row.adminid}).then(res => {
              if (res.code == "200") {
                ElMessage.success(res.message);
                //获取管理员列表
                adminList().then(res => {
                  console.log(res);
                  if (res.code == "200") {
                    this.tableData = res.data;
                  } else {
                    ElMessage.error(res.message);
                  }
                });
              } else {
                ElMessage.error(res.message);
              }
            });
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "操作取消",
            });
          });

    },
    add() {
      //获取权限路由,处理数据
      this.formData.checkedKeys = this.formatCheckedKeys();
      this.formData.role = this.formData.role == "管理员" ? "1" : "2";
      //将数据发给服务器
      addAdmin(this.formData).then(res => {
        if (res.code == "200") {
          ElMessage.success(res.message);
          //关闭抽屉效果
          this.drawer = false;
          //重新获取最新数据
          //获取管理员列表
          adminList().then(res => {
            console.log(res);
            if (res.code == "200") {
              this.tableData = res.data;
            } else {
              ElMessage.error(res.message);
            }
          });
        } else {
          ElMessage.error(res.message);
          this.drawer = false;
        }
      });
    },
    update() {
      console.log(this.formData);
      if (this.formData.adminname == "" || this.formData.password == "") {
        ElMessage.error("管理员名称和密码不能为空");
        return;
      }
      this.formData.role = this.formData.role == "管理员" ? "1" : "2";
      this.formData.checkedKeys = this.formatCheckedKeys();
      updateAdmin(this.formData).then(res => {
        if (res.code == "200") {
          ElMessage.success(res.message);
          //关闭抽屉效果
          this.drawer = false;
          //重新获取最新数据
          //获取管理员列表
          adminList().then(res => {
            console.log(res);
            if (res.code == "200") {
              this.tableData = res.data;
            } else {
              ElMessage.error(res.message);
            }
          });
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  },
  mounted() {
    //获取管理员列表
    adminList().then(res => {
      if (res.code == "200") {
        this.tableData = res.data;
      } else {
        localStorage.clear();
        this.$store.commit("updateUserInfo", {});
        this.$router.push("/login");
      }
    });
  },
  computed: {
    computedTableData() {
      return this.tableData.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  margin-bottom: 16px;
}
</style>
