import request from "@/utils/request";
//获取文章
export const getArticles = (id) => {
    return request({
        method: 'GET',
        url: `/home/index/show?id=${id}`,
    })
}
//收藏/点赞
export const userDataHandle = (params) => {
    return request({
        method: 'GET',
        url: `/home/user/userDataHandle`,
        params
    })
}
//点赞
export const zanArticles = (article_id,action) => {
    return request({
        method: 'GET',
        url: `/home/user/userDataHandle?type=2&article_id=${article_id}&action=${action}`,
    })
}