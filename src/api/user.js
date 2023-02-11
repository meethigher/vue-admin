//导入封装的js
import ajax from "@/utils/request";

//管理系统登录接口的封装
export function login(params) {
    return ajax({
        method: "post",
        url: "/admin/login",
        data: params
    });
}

//获取管理员列表
export function adminList() {
    return ajax({
        method: "get",
        url: "/admin/list"
    });
}

//新增管理员
export function addAdmin(params) {
    return ajax({
        method: "post",
        url: "/admin/add",
        data: params
    });
}

//修改管理员
export function updateAdmin(params) {
    return ajax({
        method: "post",
        url: "/admin/update",
        data: params
    });
}

//删除管理员
export function deleteAdmin(params) {
    return ajax({
        method: "post",
        url: "/admin/delete",
        data: params
    });
}
