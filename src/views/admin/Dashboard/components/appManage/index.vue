<template>
    <div class="app-manage__wrapper">
        <ItemCard class="app-item-card">
            <div class="items">
                <div class="app-item" v-for="item in 0">
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
        <Dialog :title="appTitle" width="30%" :visible.sync="dialogVisible" :show-close="false" @confirm="confirm">
            <DynamicForms
                :config="config"
                :rules="rules"
                :model="defaultData"
                label-width="120px"
                size="small"
            >
            </DynamicForms>
        </Dialog>
    </div>
</template>
<script>
import { config, defaultData, rules } from './dict';
import { addApp, updateApp } from '@/api/admin/app/index.js'
import { mapGetters } from 'vuex'
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

            appTitle: '新建应用',
            appAction: 'add',

        }
    },
    computed: {
        ...mapGetters(['currentOrganize'])
    },
    methods: {
        async getApps() {

        },
        addApp () {
            this.appAction = 'add';
            this.defaultData = {};
            this.appTitle = '新建应用';
            this.dialogVisible = true;
        },
        setAppInfo(data) {
            his.appAction = 'edit';
            this.defaultData = data;
            this.appTitle = '编辑应用';
            this.dialogVisible = true;
        },
        async confirm (slotComps) {
            let componentInstance = slotComps.default[0].componentInstance;
            let [err, res] = await componentInstance.getData();
            if (!err) {
                if (this.appAction == 'add') {
                    res.organize_id = this.currentOrganize[this.currentOrganize.length - 1];
                    let [err2, res2] = await addApp(res);
                    if (!err2) {
                        this.dialogVisible = false;
                        this.$message.success('新建成功！');
                    }
                } else {
                    let [err2, res2] = await updateApp(res);
                    if (!err2) {
                        this.dialogVisible = false;
                        this.$message.success('编辑成功！');
                    }
                }
            }
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