<template>
    <div class="page-list__wrapper">
        <DynamicForms
            :config="filterConfig"
            :rules="filterRules"
            :model="filterData"
            mode="filter"
            label-width="120px"
            size="small"
            @search="formDataChange"
        >
        </DynamicForms>
        <DynamicTables ref="dynamicTables" v-bind="$attrs">
            <template v-for="(item, key) in $slots" :slot="key">
                <slot :name="key"></slot>
            </template>
        </DynamicTables>
    </div>
</template>
<script>
export default {
    name: 'PageList',
    props: {
        filterConfig: {
            type: Array,
            default: ()=>[]
        },
        filterRules: {
            type: Object,
            default: ()=>{}
        },
        filterData: {
            type: Object,
            default: ()=>{}
        }
    },
    data () {
        return {}
    },
    mounted () {
        // console.log(this.$slots)
    },
    methods: {
        formDataChange (data) {
            this.$refs.dynamicTables.getData(data)
        },
        // 更新列表数据
        updateData (params) {
            // query：查询条件
            this.$refs.dynamicTables.updateData( { ...params, query: this.filterData });
        }
    }
}
</script>
<style lang="less" scoped>
.page-list__wrapper {}
</style>