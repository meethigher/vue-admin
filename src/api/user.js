//导入封装的js
import ajax from "@/utils/request"

//管理系统登录接口的封装
export function login(params) {
    return ajax({
        method: "post",
        url: "/admin/admin/login",
        data: params
    })
}
