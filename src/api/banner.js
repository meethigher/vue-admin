//导入封装的js
import ajax from "@/utils/request.js";

export function bannerList() {
    return ajax({
        method: "get",
        url: "/banner/list"
    });
}

export function addBanner(data) {
    return ajax({
        method: "post",
        url: "/banner/add",
        data: data
    });
}