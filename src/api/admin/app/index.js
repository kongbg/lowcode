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