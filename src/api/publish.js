import Axios from './axios'

export async function publish(fd) {
    const ret = Axios.post("contribute", fd, {
        //设置请求头  
        // headers: { "Content-Type": "multipart/form-data" },

    });
    return ret;
}