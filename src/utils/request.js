import axios from 'axios'

//创建一个axios对象出来
const request = axios.create({
    baseURL: 'http://localhost:8087',  //后台的地址
  timeout: 5000
})

//request拦截器
//可以自请求发送前请求做一些处理
//比如统一加上token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return config;
    }, error => {
        return Promise.reject(error);
});

//response拦截器
//可以对请求响应做一些处理
//比如统一处理状态码，统一处理错误信息
request.interceptors.response.use(
    response => {
        //对响应数据做些处理
        let res = response.data;
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res;
        }
        return res;
    
}, error => {
    console.log('err' + error);  // for debug
    // 对响应错误做些处理
    return Promise.reject(error);
});

export default request;