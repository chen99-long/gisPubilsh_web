import Axios from './axios'


//获取投稿资源列表
export async function getList(params) {
    // Axios.defaults.baseURL = 'http://49.232.28.149:3001/';
    // Axios.defaults.baseURL = 'http://localhost:3001/'

    // 封装函数，返回一个promise实例
    const ret = await Axios.get('getAdvice')
    return ret
}


//    传值，删除资源
export async function delAdvice(index) {
    const ret = await Axios.post('delAdvice?index=' + index)
    return ret
}