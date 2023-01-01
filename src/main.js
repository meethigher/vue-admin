// 解构出 createApp
import {createApp} from "vue";
// 导入根组件
import App from "./App.vue";
// 导入路由配置,如果只有一个index.js，可以省略
import router from "./router";
//导入全局状态vuex
import store from "@/store/vuex";
// 导入全局格式化标签样式
import "normalize.css/normalize.css";
// 导入element-plus全局样式，在我们页面中如果使用反馈组件等通过 js 打开的东西，我们就需要导入全局样式
import "element-plus/dist/index.css";
// import './assets/main.css'
// 创建一个根app实例
const app = createApp(App);
// 将路由挂载到app实例
app.use(router);
//将全局状态管理挂载到app实例
app.use(store);
// 将app实例挂载到id为app的元素上
app.mount("#app");
