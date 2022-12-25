// 解构出 createApp
import { createApp } from 'vue'
// 导入根组件
import App from './App.vue'
// 导入路由配置
import router from './router'
// 导入全局样式
import './assets/main.css'
// 创建一个根app实例
const app = createApp(App)
// 将路由挂载到app实例
app.use(router)
// 将app实例挂载到id为app的元素上
app.mount('#app')
