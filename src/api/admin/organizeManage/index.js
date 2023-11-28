import axios from '../../axios.js';
/**
 * 获取组织树形结构
 * @param {*} data
 * @returns
 */
export const getOrganizeTree = data => {
    return axios({
        url: '/api/platform/organize/tree',
        method: 'get',
        data
    })
}

/**
 * 新增组织
 * @param {*} data
 * @returns
 */
export const addOrganize = data => {
    return axios({
        url: '/api/platform/organize/add',
        method: 'post',
        data
    })
}

/**
 * 更新组织信息
 * @param {*} data
 * @returns
 */
export const updateOrganize = data => {
    return axios({
        url: '/api/platform/organize/update',
        method: 'post',
        data
    })
}

/**
 * 删除组织
 * @param {*} data
 * @returns
 */
export const deleteOrganize = data => {
    return axios({
        url: '/api/platform/organize/delete',
        method: 'post',
        data
    })
}