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
    const ret = await Axios.get('http://localhost:3001/getContribute')
    return ret
        /*     return request({
                url: 'http://localhost:3001/getContribute',
                method: 'get'
            }) */
}

//    传值，发布资源
export async function getPub(index, type) {
    const ret = await Axios.post('http://localhost:3001/Pub?index=' + index + '&&type=' + type)
    return ret
}

//    传值，删除资源
export async function delPub(index) {
    const ret = await Axios.post('http://localhost:3001/Del?index=' + index)
    return ret
}