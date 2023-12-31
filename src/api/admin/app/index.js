import axios from '../../axios.js';
/**
 * 新增应用
 * @param {*} data
 * @returns
 */
export const addApp = data => {
    return axios({
        url: '/api/platform/app/add',
        method: 'post',
        data
    })
}

/**
 * 获取应用详情
 * @param {*} data
 * @returns
 */
export const getAppInfo = data => {
    return axios({
        url: '/api/platform/app/info',
        method: 'get',
        data
    })
}

/**
 * 获取应用列表
 * @param {*} data
 * @returns
 */
export const getAppList = data => {
    return axios({
        url: '/api/platform/app/list',
        method: 'get',
        data
    })
}

/**
 * 更新应用信息
 * @param {*} data
 * @returns
 */
export const updateApp = data => {
    return axios({
        url: '/api/platform/app/update',
        method: 'post',
        data
    })
}

/**
 * 删除应用
 * @param {*} data
 * @returns
 */
export const deleteApp = data => {
    return axios({
        url: '/api/platform/app/delete',
        method: 'post',
        data
    })
}