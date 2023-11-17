<template>
    <div class="app-manage__wrapper">
        <ItemCard class="app-item-card">
            <div class="items">
                <div class="app-item" v-for="item in 10">
                    <i class="el-icon-more" @click.stop="setAppInfo"></i>
                    <div class="icon">
                        <img src="@/assets/icons/logo.png" alt="">
                    </div>
                    <div class="name">日报日报</div>
                </div>
                <div v-if="canAdd" class="app-item add-item flex-xy-center">
                    <i class="el-icon-plus" @click="addApp"></i>
                </div>
            </div>
        </ItemCard>
        <Dialog title="新建应用" width="30%" :visible.sync="dialogVisible" :show-close="false" @confirm="confirm">
            <DynamicForms
                :config="config"
                :rules="rules"
                :value.sync="defaultData"
                label-width="120px"
                size="small"
            >
            </DynamicForms>
        </Dialog>

        <Dialog title="编辑应用信息" width="30%" :visible.sync="editDialog" :show-close="false" @confirm="confirm">
            <DynamicForms
                :config="config"
                :rules="rules"
                :value.sync="defaultData"
                label-width="120px"
                size="small"
            >
            </DynamicForms>
        </Dialog>
    </div>
</template>
<script>
import { config, defaultData, rules } from './dict';
export default {
    name: 'AppManage',
    props: {
        type: {
            type: String,
            default: ''
        },
        canAdd: {
            type: Boolean,
            default: false
        },
        appList: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            dialogVisible: false,
            config,
            rules,
            defaultData,

            editDialog: false,
        }
    },
    methods: {
        addApp () {
            this.dialogVisible = true;
        },
        async confirm (slotComp) {
            let { valid, data } = await slotComp.getFormData();
            if (valid) {
                this.dialogVisible = false;
            }
        },
        setAppInfo () {
            this.editDialog = true;
        }
    }
}
</script>
<style lang="less" scoped>
.app-manage__wrapper {
    .app-item-card {
        margin-top: 10px;
        .add-item {
            
            .el-icon-plus {
                font-size: 40px;
            }
        }
    }
}
</style>