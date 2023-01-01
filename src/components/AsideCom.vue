<script>
    import {User} from "@element-plus/icons-vue"

    export default {
        data() {
            return {}
        },
        /*接收传值*/
        props: [
            "zhedie"
        ],
        components: {
            User
        }
    }
</script>
<template>
    <!--el-menu自带的collapse属性-->
    <el-menu :collapse="!zhedie"
             :collapse-transition="false"
             default-active="2"
             class="el-menu-vertical-demo">
        <el-menu-item>首页</el-menu-item>
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <User/>
                </el-icon>
                <span>账号管理</span>
            </template>
            <el-menu-item>管理员列表</el-menu-item>
            <el-menu-item>用户列表</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>
