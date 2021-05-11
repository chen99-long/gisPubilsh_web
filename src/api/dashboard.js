import Axios from './axios'
// import Axios from 'axios'

// Axios.defaults.baseURL = 'http://49.232.28.149:3001/';
// Axios.defaults.baseURL = 'http://localhost:3001/'
//更新首页信息
export async function getNum() {
    // 封装函数，返回一个promise实例
    const ret = await Axios.get('addAdvice')
    return ret
}