import axios from '../../axios.js';
export const getData = data => {
    return axios({
        url: '/api/platform/user/list',
        method: 'get',
        data
    })
}