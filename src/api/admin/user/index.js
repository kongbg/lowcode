import axios from '../../axios.js';
/**
 * 登录
 * @param {*} data 
 * @returns 
 */
export const login = data => {
    return axios({
        url: '/api/platform/user/login',
        method: 'post',
        data
    })
}

/**
 * 退出
 * @param {*} data 
 * @returns 
 */
export const logout = data => {
    return axios({
        url: '/api/platform/user/logout',
        method: 'post',
        data
    })
}