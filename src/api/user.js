import request from "@/utils/request";
// import store from '@/store/index'
//注册用户
export const regApi = (data) => {
    return request({
        method: 'POST',
        url: `home/index/reg`,
        data
    })
}
//登录
export const loginApi = (data) => {
    return request({
        method: 'POST',
        url: `home/index/login`,
        data
    })
}
//获取用户信息
export const userInfoApi = () => {
    return request({
        method: 'GET',
        url: `/home/user/getUserInfo`,
    })
}