import request from '@/utils/request'
// 获取文章
export const getArticles = (id) => {
  return request({
    method: 'GET',
    url: `/home/index/show?id=${id}`
  })
}
// 收藏/点赞
export const userDataHandle = (params) => {
  return request({
    method: 'GET',
    url: '/home/user/userDataHandle',
    params
  })
}
// 点赞
export const zanArticles = (articleId, action) => {
  return request({
    method: 'GET',
    url: `/home/user/userDataHandle?type=2&article_id=${articleId}&action=${action}`
  })
}
// 取消点赞收藏
export const noUserDataHandle = (params) => {
  return request({
    method: 'GET',
    url: '/home/user/userDataHandle',
    params
  })
}
// 删除我的文章
export const delArticles = (params) => {
  return request({
    method: 'GET',
    url: '/home/user/delArticle',
    params
  })
}
// 修改文章
export const editArticles = (data) => {
  return request({
    method: 'POST',
    url: '/home/user/editArticle',
    data
  })
}
