<template>
    <PageWrapper class="organize-manage-details__wrapper">
        组织详情
    </PageWrapper>
</template>
<script>
export default {
    name: 'OrganizeManageOrganizeDetails',
    components: {},
    props:{},
    data() {
        return {}
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        // 获取列表数据
        getData () {
            return new Promise(resolve => {
                setTimeout(()=>{
                    resolve(
                        [null, {data: {total: 4, list: []}}]
                    )
                }, 1500)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.organize-manage-details__wrapper {}
</style>