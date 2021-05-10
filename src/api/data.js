import Axios from 'axios'
// Axios.defaults.baseURL = 'http://49.232.28.149:3001/';
Axios.defaults.baseURL = 'http://localhost:3001/'
    //获取真实资源列表
export async function getList(params) {
    // 封装函数，返回一个promise实例
    const ret = await Axios.get('getList')
    return ret
}


//    传值，删除资源
export async function delData(index, type) {
    const ret = await Axios.post('delData?index=' + index + '&type=' + type)
    return ret
}