<template>
    <div class="app-manage__wrapper">
        <ItemCard class="app-item-card">
            <div class="items">
                <div class="app-item" v-for="item in appList" :key="item.value" @click="toView(item)">
                    <i class="el-icon-more" @click.stop="setAppInfo(item)"></i>
                    <div class="icon">
                        <img src="@/assets/icons/logo.png" alt="">
                    </div>
                    <div class="name">{{ item.name }}</div>
                </div>
                <div v-if="canAdd" class="app-item add-item flex-xy-center">
                    <i class="el-icon-plus" @click="addApp"></i>
                </div>
                <div class="empty__wrapper" v-if="!appList.length">
                    <el-empty  description="暂无可用应用"></el-empty>
                </div>
                
            </div>
        </ItemCard>
        <Dialog :title="appTitle" width="500px" :visible.sync="dialogVisible" :show-close="false" @confirm="confirm">
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
        },
        appTagList: {
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
    created () { },
    methods: {
        addApp () {
            this.appAction = 'add';
            this.defaultData = {status:1, type: Number(this.type)};
            this.appTitle = '新建应用';
            this.dialogVisible = true;
            this.setTypeOptions();
        },
        setTypeOptions () {
            this.config[1].options = this.appTagList.map(item=>{
                return {
                    label: item.label,
                    value: item.id
                }
            });
        },
        setAppInfo(data) {
            this.appAction = 'edit';
            this.defaultData = data;
            this.appTitle = '编辑应用';
            this.dialogVisible = true;
            this.setTypeOptions();
        },
        async confirm (slotComps) {
            // 通过slot拿到表单数据
            let componentInstance = slotComps.default[0].componentInstance;
            let [err, res] = await componentInstance.getData();
            if (!err) {
                // 新增
                if (this.appAction == 'add') {
                    // 新增需要带上组织id
                    res.organize_id = this.currentOrganize[this.currentOrganize.length - 1];
                    // 新增需要带上应用分类id， 如果不存在该分类，后端直接创建
                    res.tag_type = 1;
                    let [err2, res2] = await addApp(res);
                    if (!err2) {
                        this.dialogVisible = false;
                        this.$message.success('新建成功！');
                    }
                } else {// 编辑
                    let [err2, res2] = await updateApp(res);
                    if (!err2) {
                        this.dialogVisible = false;
                        this.$message.success('编辑成功！');
                    }
                }
            }
        },
        toView(data) {
            this.$router.push({
                path: `/design/app/${data.id}`
            })
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
    .empty__wrapper {
        width: 100%;
        /deep/.el-empty {
            padding: 10px 0;
        }
    }
}
</style>