import { getOrganizeTree } from '@/api/admin/organizeManage/index.js'
const platform = {
    state: {
        userInfo: {}, // 平台用户信息
        organizetree: [], // 组织信息
    },
    mutations: {
        SET_ORGANIZE_TREE: (state, data) => {
            state.organizetree = data;
        },
        SET_USERINFO: (state, data) => {
            state.userInfo = data;
        },
    },
    actions: {
        // 获取组织信息
        async getOrganizeTree ({ commit }) {
            let [err, res] = await getOrganizeTree();
            if (!err) {
                commit('SET_ORGANIZE_TREE', res.data)
            };
        },
        // 设置平台用户信息
        setUserInfo ({ commit }, data) {
            commit('SET_USERINFO', data)
        }
    }
}

export default platform;