<script>
    /*在项目中，万物皆模块*/
    import logo from "../assets/loading.svg";
    import {Fold, Expand} from "@element-plus/icons-vue";
    //@代表src
    import AsideCom from "@/components/AsideCom.vue";

    export default {
        data() {
            return {
                url: logo,
                /*放置历史属性，用于存储图标展示的状态*/
                collapse: true
            };
        },
        /*计算属性*/
        computed: {
            headerLeft() {
                return this.collapse ? "Fold" : "Expand";
            },
            asideWidth() {
                return this.collapse ? "200px" : "54px";
            }
        },
        //生命周期函数
        mounted() {
            //用户没有登录
            if (!this.$store.state.userInfo.adminname) {
                this.$router.push("/login");
                return;
            }
        },
        //注册组件
        components: {
            Fold,
            Expand,
            AsideCom
        },
        methods: {
            setCount() {
                //commit同步执行mutations方法
                // this.$store.commit('add')
                //dispatch异步执行action
                // this.$store.dispatch("addAction")

                //传参同步执行
                // this.$store.commit("addNum",8);
                //传参异步执行
                this.$store.dispatch("addActionNum", 8);
            },
            logout() {
                localStorage.clear();
                this.$store.commit("updateUserInfo", {});
                this.$router.push("/login");
            }
        }
    };
</script>

<template>
    <div class="common-layout">
        <el-container>
            <!--左侧侧边栏-->
            <el-aside>
                <div class="logo-box">
                    <el-image :src="url"></el-image>
                    <h2 class="manage-title" v-show="collapse">后台管理系统</h2>
                </div>
                <!--collapse用来判断是否收起侧边栏，传给子组件-->
                <AsideCom :zhedie="collapse"/>
            </el-aside>
            <!--右侧内容，分为头部和内容-->
            <el-container>
                <!--头部-->
                <el-header>
                    <el-icon :size="30" @click="collapse=!collapse">
                        <component :is="headerLeft"></component>
                    </el-icon>
                    <span>欢迎 {{$store.state.userInfo.adminname}} <el-button @click="logout">退出</el-button></span>
                </el-header>
                <!--内容-->
                <el-main>
                    <!--                    {{$store.state.userInfo}}<br>-->
                    <!--                    Main-->
                    <!--                    {{$store.state.count}}<br>-->
                    <!--                    <button @click="setCount">修改全局状态方法</button>-->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<!--css预编译语言：less、sass-->
<style scoped lang="less">
    .el-container {
        background-color: #f8f9fa;


        .el-aside {
            background-color: #d0ebff;
            /*直接将计算属性拿过来*/
            width: v-bind(asideWidth);
            transition: all .2s;

            .logo-box {
                .manage-title {
                    font-size: 16px;
                }

                .el-image {
                    width: 32px;
                    height: 32px;
                    margin-right: 10px;
                }

                padding: 0 10px;
                box-sizing: border-box;
                height: 60px;
                display: flex;
                align-items: center;
            }
        }
    }


    .el-header {
        background-color: #ced4da;
        display: flex;
        /*内容之间使用空格隔开
        https://www.runoob.com/try/try.php?filename=trycss3_justify-content
        */
        justify-content: space-between;
        /**
        内容垂直居中
        https://www.runoob.com/try/try.php?filename=trycss3_align-items
         */
        align-items: center;
    }

    .manage-title {

    }
</style>

