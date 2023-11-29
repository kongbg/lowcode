import axios from '../../axios.js';

/**
 * 获取所有应用分类
 * @param {*} data
 * @returns
 */
export const getAppTagList = data => {
    return axios({
        url: '/api/platform/apptag/list',
        method: 'get',
        data
    })
}