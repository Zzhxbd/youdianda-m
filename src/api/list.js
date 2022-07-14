import request from "@/utils/request";
//获取list
export const getList = (params) => {
    return request({
        method: 'GET',
        url: `/home/index/list`,
        params
    })
}
//?page=1&limit=20&cateid=7