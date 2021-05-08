import request from '@/utils/request'
import Axios from 'axios'

//获取投稿资源列表
export async function getList(params) {
    /* return request({
            url: '/vue-admin-template/table/list',
            method: 'get',
            params
        }) */
    // 封装函数，返回一个promise实例
    const ret = await Axios.get('http://localhost:3001/getAdvice')
    return ret
        /*     return request({
                url: 'http://localhost:3001/getContribute',
                method: 'get'
            }) */
}


//    传值，删除资源
export async function delAdvice(index) {
    const ret = await Axios.post('http://localhost:3001/delAdvice?index=' + index)
    return ret
}