const getters = {
    organizetree: state => state.platform.organizetree,
    currentOrganize: state => state.platform.currentOrganize,
    userInfo: state => state.platform.userInfo,
    appTagList1: state => state.appTag.appTagList1,
    appTagList2: state => state.appTag.appTagList2
}
export default getters;