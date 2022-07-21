import request from '@/utils/request'
// import store from '@/store/index'
// 注册用户
export const regApi = (data) => {
  return request({
    method: 'POST',
    url: 'home/index/reg',
    data
  })
}
// 登录
export const loginApi = (data) => {
  return request({
    method: 'POST',
    url: 'home/index/login',
    data
  })
}
// 获取用户信息
export const userInfoApi = () => {
  return request({
    method: 'GET',
    url: '/home/user/getUserInfo'
  })
}
// 修改用户信息
export const updateUser = (data) => {
  return request({
    method: 'POST',
    url: '/home/user/update',
    data
  })
}
// 更新头像
export const updateUserAvatar = (data) => {
  return request({
    method: 'POST',
    url: '/home/common/upload?type=images',
    data
  })
}
// 我的收藏
export const mySaseOrZan = (params) => {
  return request({
    method: 'GET',
    url: '/user/userDataList',
    params
  })
}
// 我的文章
export const myArticle = (params) => {
  return request({
    method: 'GET',
    url: '/user/myArticle',
    params
  })
}
