<template>
    <PageWrapper class="organize-manage-details__wrapper">
        <DynamicForms :config="formConfig" :rules="addItemRules" :model="addItemData" :action="action" mode="submit-inline"
            label-width="120px" size="small" @cancel="cancel" @submit="submit">
        </DynamicForms>
    </PageWrapper>
</template>
<script>
import { addItemConfig, addItemRules, addItemData, detailConfig } from '../dict'
import { getAppInfo } from '@/api/admin/app/index.js'
export default {
    name: 'OrganizeManageOrganizeDetails',
    components: {},
    props: {},
    data() {
        return {
            addItemConfig,
            detailConfig,
            addItemRules,
            addItemData,
            action: '',
            id: '',
        }
    },
    computed: {},
    created() {
        this.action = this.$route.query.action;
        this.id = this.$route.query.id;
        this.getData(this.id);
        this.initAddItemConfig();
    },
    mounted() { },
    methods: {
        // 获取列表数据
        async getData(id) {
            if (!id) return;
            let params = { id };
            let [err, res] = await getAppInfo(params);
            if (!err) {
                this.addItemData = res.data;
            }
        },
        cancel() {
            this.$router.back()
        },
        submit(data) {
            console.log('submit', data);
            this.$router.back()
        },
        initAddItemConfig() {
            this.formConfig = !this.id ? this.addItemConfig : this.detailConfig;

            // 全部属性禁止编辑
            this.formConfig.forEach(item => {
                item.disabled = this.action === 'read';
            })
        }
    }
}
</script>
<style lang="less" scoped>
.organize-manage-details__wrapper {}
</style>