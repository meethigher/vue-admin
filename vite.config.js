import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 80,
        open: false, //自动打开
        base: "./ ", //生产环境路径
        /*配置代理转发，开发环境使用https://www.cnblogs.com/tik2012/p/16866356.html*/
        proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
            // 正则表达式写法
            '^/api': {
                target: 'http://121.89.205.189:3000/', // 后端服务实际地址
                changeOrigin: true, //开启代理
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
