import Axios from 'axios'

// Axios.defaults.baseURL = 'http://49.232.28.149:3001/';
Axios.defaults.baseURL = 'http://localhost:3001/'
    //获取投稿资源列表
export async function getList(params) {
    // 封装函数，返回一个promise实例
    const ret = await Axios.get('getContribute')
    return ret
}

//    传值，发布资源
export async function getPub(index, type) {
    const ret = await Axios.post('Pub?index=' + index + '&&type=' + type)
    return ret
}

//    传值，删除资源
export async function delPub(index) {
    const ret = await Axios.post('Del?index=' + index)
    return ret
}