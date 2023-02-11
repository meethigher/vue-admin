import axios from "axios";

//封装baseUrl
//开发环境development 打包命令npm run dev
//生产环境production 打包命令npm run build
const isDev = process.env.NODE_ENV == "development";
const dev = "http://127.0.0.1/api/";
const pro = "http://121.89.205.189:3000/";
const request = axios.create({
    baseURL: isDev ? dev : pro,
    timeout: 60000,//单位毫秒
    headers: {"X-Custom-Header": "foobar"}
});


// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = localStorage.getItem("token") || "";
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 自定义各种数据请求
export default function ajax(config) {
    //解构赋值 https://www.cnblogs.com/tfxz/p/12838739.html
    // let node = {
    //     type: "Identifier"
    // };
    // // 使用解构来创建两个字段，type、name，如果node中该字段有值，则覆盖掉
    // ({type = 'type', name = 'name'} = node);
    // console.log(type); // "Identifier"
    // console.log(name); // "name"
    const {url = "", method = "GET", data = {}, headers = {}} = config;

    //判断请求类型
    switch (method.toUpperCase()) {
        case "GET":
            return request.get(url, {
                params: data
            });
        case "POST":
            //表单形式
            if (headers["content-type"] == "application/x-www-form-url-encoded") {
                //格式化数据
                const obj = new URLSearchParams();
                for (let key in data) {
                    obj.append(key, data[key]);
                }
                return request.post(url, data, {headers});
            }
            //文件形式
            if (headers["content-type"] == "multipart/form-data") {
                //文件处理对象
                let obj = new FormData();
                for (let key in data) {
                    obj.append(key, data[key]);
                }
                return request.post(url, data, {headers});
            }
            //json形式
            return request.post(url, data);
    }
}
