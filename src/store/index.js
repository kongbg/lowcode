import Vue from 'vue'
import Vuex from 'vuex'
import platform from '@/store/modules/platform'
import getters from '@/store/getters.js'
import createPersistedstate  from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        platform
    },
    getters,
    plugins:[
        createPersistedstate({
            key:'vuex',// 存数据的key名   自定义的  要有语义化
            // paths: ['loginModule'] // 要把那些模块加入缓存
        })
    ]
})