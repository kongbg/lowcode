import axios from 'axios';
import { message } from '@/components/message/index.js';
import { deepClone } from '../utils/index.js';

const Service = axios.create({
    baseUrl: 'http://localhost:6080',
    timeout: 30 * 1000
})

// 请求拦截
Service.interceptors.request.use(
    config => {
        // 设置请求头
        let token = localStorage.getItem('Platform-token');
        if (token) {
            config.headers['Authorization'] = token;
        } else {
            // TODO: goto login
        }
        // console.log('config:', config)
        return config;
    },
    error => {
        console.log('请求拦截:', error)
    }
)

// 响应拦截
Service.interceptors.response.use(
    response => {
        let { status } = response;
        if (status == 200) {
            let { code, data, msg: message } = response.data;
            if (code == 200) {
                return [null, {...data, message}];
            } else if (code == '401') { // 鉴权失败，退出登录
                return [true, {...data, message}];
            } else {
                message({
                    type: 'warning',
                    message,
                    center: false
                })
                let err = {message}
                return [err, {...data, message}];
            }
        } else {
            console.log('网络请求失败！:', response)
            let err = {message}
            return [err, null];
        }
    },
    error => {
        console.log('响应拦截:', error)
        console.log('TODO:加弹窗提示', error.message)
        /**
         * code = ERR_NETWORK 网络错误
         */
        return [error, null];
    }
)


export default (options) => {
    // 处理poet get 传参不同问题
    let params = deepClone(options.params);
    let data = deepClone(options.data);
    if (options.method == 'get') {
        delete options.data;
        options.params = params || data;
    } else {
        delete options.params;
        options.params = data || params;
    }
    return Service(options);
};