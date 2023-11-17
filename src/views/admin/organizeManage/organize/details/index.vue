<template>
    <PageWrapper class="organize-manage-details__wrapper">
        <DynamicForms
            :config="addItemConfig"
            :rules="addItemRules"
            :model="addItemData"
            :action="action"
            mode="submit-inline"
            label-width="120px"
            size="small"
            @cancel="cancel"
            @submit="submit"
        >
        </DynamicForms>
    </PageWrapper>
</template>
<script>
import { addItemConfig, addItemRules, addItemData } from '../dict'
export default {
    name: 'OrganizeManageOrganizeDetails',
    components: {},
    props:{},
    data() {
        return {
            addItemConfig,
            addItemRules,
            addItemData,
            action: '',
        }
    },
    computed: {},
    created() {
        this.action = this.$route.query.action;
        this.initAddItemConfig();
    },
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
        },
        cancel () {
            this.$router.back()
        },
        submit (data) {
            console.log('submit', data);
            this.$router.back()
        },
        initAddItemConfig() {
            // 全部属性禁止编辑
            this.addItemConfig.forEach(item => {
                item.disabled = this.action === 'read';
            })
        }
    }
}
</script>
<style lang="less" scoped>
.organize-manage-details__wrapper {}
</style>