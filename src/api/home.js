import request from '@/utils/request'
// 获取首页
export const getIndexApi = () => {
  return request({
    method: 'GET',
    url: '/home/index/index'
  })
}
// 获取hot
export const getHotApi = () => {
  return request({
    method: 'GET',
    url: '/home/index/hot'
  })
}
// 获取new
export const getNewApi = (params) => {
  return request({
    method: 'GET',
    url: '/home/index/new',
    params
  })
}
