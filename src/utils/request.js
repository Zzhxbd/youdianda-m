import axios from "axios";
import store from '@/store'
const request = axios.create(
    {
        baseURL: 'http://124.223.14.236:8060/'   //http://124.223.14.236:8060/
    }
)
//请求拦截
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = store.state.token
    if(token){
        config.headers.token=`${token}`
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})
//响应拦截
export default request