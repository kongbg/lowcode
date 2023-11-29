import { getOrganizeTree } from '@/api/admin/organizeManage/index.js'
const platform = {
    namespaced: true,
    state: {
        userInfo: {}, // 平台用户信息
        organizetree: [], // 组织信息
        currentOrganize: [], // 左上角选择的组织id
    },
    mutations: {
        SET_ORGANIZE_TREE: (state, data) => {
            state.organizetree = data;
        },
        SET_USERINFO: (state, data) => {
            state.userInfo = data;
        },
        SET_CURRENTORGANIZE: (state, data) => {
            state.currentOrganize = data;
        },
    },
    actions: {
        // 获取组织信息
        async getOrganizeTree ({ commit }) {
            let [err, res] = await getOrganizeTree();
            if (!err) {
                if (res.data.length) {
                    commit('SET_CURRENTORGANIZE', [res.data[0].id])
                }
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