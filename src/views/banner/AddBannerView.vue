<template>
  <div class="header">添加轮播图</div>
  <el-form>
    <el-form-item label="请输入 alt">
      <el-input v-model="bannerData.alt" placeholder="请输入 alt"/>
    </el-form-item>

    <el-form-item label="请输入 link">
      <el-input v-model="bannerData.link" placeholder="请输入 link"/>
    </el-form-item>

    <el-form-item>
      <el-upload
          class="avatar-uploader"
          :http-request="httpRequest"
          :show-file-list="false">
        <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </el-form-item>

    <el-button type="primary" @click="addBannerButton">添加</el-button>
  </el-form>


</template>

<script>
import {Plus} from "@element-plus/icons-vue";
import {addBanner} from "../../api/banner";

export default {
  data() {
    return {
      imageUrl: "",
      bannerData: {
        alt: "",
        link: "",
        img: ""
      }
    };
  },
  components: {
    Plus
  },
  methods: {
    httpRequest(data) {
      //this.imageUrl = URL.createObjectURL(data.file);//临时的文件地址，仅用于展示
      //将用户选择的图片上传到存放图片的服务器，该服务器会返回一个图片地址
      //创建一个文件加载器
      let fileReader = new FileReader();
      //指定加载的文件
      fileReader.readAsDataURL(data.file);
      //加载完成后的回调函数
      fileReader.onload = () => {
        this.imageUrl = fileReader.result;
        this.bannerData.img = this.imageUrl;
      };
    },
    addBannerButton() {
      addBanner(this.bannerData).then(res => {
        if (res.code == "200") {
          ElMessage.success(res.message);
          this.bannerData={};
          this.imageUrl="";
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 16px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>

<style>
.avatar-uploader .el-upload {
  /*这些变量在main.js中引入的全局样式*/
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>