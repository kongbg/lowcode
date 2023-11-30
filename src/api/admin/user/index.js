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
 * 注册
 * @param {*} data 
 * @returns 
 */
export const register = data => {
    return axios({
        url: '/api/platform/user/register',
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

/**
 * 获取用户列表
 * @param {*} data 
 * @returns 
 */
export const getUserList = data => {
    return axios({
        url: '/api/platform/user/list',
        method: 'get',
        data
    })
}

/**
 * 获取用户信息
 * @param {*} data 
 * @returns 
 */
export const getUserInfo = data => {
    return axios({
        url: '/api/platform/user/info',
        method: 'get',
        data
    })
}

/**
 * 更新用户信息
 * @param {*} data 
 * @returns 
 */
export const updateUser = data => {
    return axios({
        url: '/api/platform/user/update',
        method: 'post',
        data
    })
}