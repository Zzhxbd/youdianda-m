import request from "@/utils/request";
//发布文章
export const addArticle = (data) => {
    return request({
        method: 'POST',
        url: `/user/addArticle`,
        data
    })
}