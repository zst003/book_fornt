// 后台的路径封装
import request from "@/utils/request";

//书城列表条件分页查询  
// current表示当前页,pageSize每一页的数量,param需要传递的参数
export function getBookInfoList(current,pageSize,param){
    // return一个请求
    return request({
        url:`/book/list/${current}/${pageSize}`,
        //设置请求方式
        method:'post',
        //请求体就是传递的参数
        data:param

    })
}