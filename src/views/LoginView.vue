<script>
    import {ElMessage} from "element-plus";
    import {login} from "../api/user";
    import md5 from "md5";
    import axios from "axios";
    import {mapState, mapMutations} from "vuex";

    export default {
        name: "LoginView",
        /**
         * data是函数的原因：让每个组件都有自身独立的数据
         */
        data() {
            return {
                "userName": "",
                "userPassword": ""
            };
        },
        computed: {
            ...mapState(["userInfo"])
        },
        methods: {
            ...mapMutations(["updateUserInfo"]),
            submitForm() {
                // if (this.userName.length < 4) {
                //     ElMessage.error("账号长度过短!");
                //     return;
                // }
                // if (this.userPassword.length < 4) {
                //     ElMessage.error("密码长度过短!");
                //     return;
                // }
                login({
                    adminname: this.userName,
                    password: this.userPassword
                }).then(res => {
                    let data = res;
                    if (data.code === "200") {
                        //跳转页面前，将数据存储
                        //第一种修改数据方法
                        // this.$store.commit("updateUserInfo", data);
                        //第二种修改数据方法，使用mapMutations
                        this.updateUserInfo(data.data);
                        //存储token
                        localStorage.setItem("token", data.data.token);
                        //跳转
                        this.$router.push("/");
                    } else {
                        ElMessage.error(data.message);
                    }
                });
            }
        }
    };
</script>
<template>
    <div class="login-container">
        <div class="form-wrap">
            <h1 class="header">后台管理系统{{userInfo.adminname}}</h1>
            <el-input v-model="userName" placeholder="请输入管理员账号"/>
            <el-input type="password" class="psw" v-model="userPassword" placeholder="请输入管理员密码"
                      @keydown.enter="submitForm" show-password/>
            <el-button type="success" @click="submitForm">登录</el-button>
        </div>
    </div>
</template>


<style lang="less" scoped>
    .login-container {
        height: 100%;
        background-color: #dbe4ff;

        .form-wrap {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            border-radius: 15px;
            padding: 32px 32px 20px;

            .header {
                text-align: center;
                margin-bottom: 32px;
            }

            .psw {
                margin-top: 10px
            }

            .el-button {
                width: 100%;
                margin-top: 20px
            }


        }
    }
</style>
