import { getAppTagList } from '@/api/admin/appTag/index.js'
const appTag = {
    namespaced: true,
    state: {
        appTagList1: [], // 本组织应用分类
        appTagList2: [], // 下级组织应用分类
    },
    mutations: {
        SET_APPTAGLIST1: (state, data) => {
            state.appTagList1 = data;
        },
        SET_APPTAGLIST2: (state, data) => {
            state.appTagList2 = data;
        },
    },
    actions: {
        // 获取本组织应用分类
        async getAppTagList1 ({ commit }) {
            let [err, res] = await getAppTagList(
                {type: 1}
            );
            if (!err) {
                commit('SET_APPTAGLIST1', res.data)
            };
        },
        // 获取下级组织应用分类
        async getAppTagList2 ({ commit }) {
            let [err, res] = await getAppTagList(
                {type: 2}
            );
            if (!err) {
                commit('SET_APPTAGLIST2', res.data)
            };
        }
    }
}

export default appTag;