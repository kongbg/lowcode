<template>
    <PageWrapper class="organize-manage__wrapper">
        <div class="content-main">
            <el-row :gutter="0">
                <el-col class="organize-list">
                    <PageList ref="pageList" row-key="id" :columns="columns" :api="getAppList" :pagination="pagination"
                        :handleResult="handleResult" :filterConfig="filterConfig" :filterRules="filterRules"
                        :filterData="filterData" :expand-row-keys="expands" border>
                        <div class="table-tools" slot="table-tools">
                            <el-button size="small" type="primary" @click="addItem">新增</el-button>
                        </div>
                        <el-table-column slot="status" label="状态" align="center">
                            <template slot-scope="{row}">
                                {{ row.status | getLabelByKey('status', Enum) }}
                            </template>
                        </el-table-column>
                        <el-table-column slot="action" label="操作" width="160px" align="center">
                            <template slot-scope="{row}">
                                <div class="actions">
                                    <el-button size="mini" type="text" @click="editItem(row)">编辑</el-button>
                                    <el-button size="mini" type="text" @click="viewDetails(row)">详情</el-button>
                                    <el-button size="mini" type="text" @click="deleteItem(row)">删除</el-button>
                                    <el-popover placement="left" width="50" trigger="click" style="margin-left: 10px;">
                                        <el-button type="text" size="mini" @click="deleteItem(row)">重启</el-button>
                                        <el-button type="text" size="mini" @click="deleteItem(row)">重置</el-button>
                                        <el-button type="text" size="mini" @click="deleteItem(row)">禁用</el-button>
                                        <el-button type="text" size="mini" @click="deleteItem(row)">升级</el-button>
                                        <el-button type="text" size="mini" @click="deleteItem(row)">日志</el-button>
                                        <el-button type="text" size="mini" @click="deleteItem(row)">健康</el-button>
                                        <el-button type="text" size="mini" @click="deleteItem(row)">常开</el-button>
                                        <el-button type="text" size="mini" slot="reference">更多</el-button>
                                    </el-popover>
                                </div>
                            </template>
                        </el-table-column>
                    </PageList>
                </el-col>
            </el-row>
        </div>

        <!-- 新增应用 -->
        <Dialog :title="organizeTitle" width="500px" :visible.sync="organizeDialog" @confirm="organizeConfirm">
            <DynamicForms :config="addItemConfig" :rules="addItemRules" :model="addItemData" mode="" label-width="120px"
                size="small"></DynamicForms>
        </Dialog>
    </PageWrapper>
</template>
<script>
import {
    columns, pagination, filterConfig, filterData, filterRules, Enum,
    addItemConfig,
    addItemRules,
    addItemData
} from './dict';
import { mapGetters } from "vuex";
import { addOrganize, updateOrganize, deleteOrganize } from '@/api/admin/organizeManage/index.js';
import { getAppList, deleteApp } from '@/api/admin/app/index.js'
export default {
    name: 'OrganizeManageOrganize',
    components: {},
    props: {},
    data() {
        return {
            Enum,
            columns,
            pagination,
            filterConfig,
            filterRules,
            filterData,
            getAppList,
            expands: ['1'],

            deptName: '',

            organizeDialog: false,
            parentId: '',
            organizeTitle: '新增应用',
            organizeAction: 'add',
            addItemConfig,
            addItemRules,
            addItemData,

            elpopovers: [],

            organizeName: ''
        }
    },
    computed: {
        ...mapGetters(["organizetree"]),
    },
    async created() {
        // 获取应用树形结构
        await this.$store.dispatch('platform/getOrganizeTree');
        // 初始化应用名称
        this.initOrganizeName();
    },
    mounted() { },
    methods: {
        // 初始化应用名称
        initOrganizeName() {
            if (this.organizetree.length) {
                this.organizeName = this.organizetree[0].name;
            }
        },
        // 树形节点点击
        nodeClick(data) {
            this.organizeName = data.label;
        },
        // 处理列表返回数据
        handleResult(result) {
            return result;
        },
        // 新增
        addItem() {
            this.$router.push({
                name: 'AppManageMyappDetails',
                query: {
                    action: 'add'
                }
            })
            // 新增成功,更新列表
            // this.$refs.pageList.updateData({action: "add"});
        },
        // 弹窗新增
        addItemOnPage(pid = '') {
            this.addItemData = {};
            this.organizeDialog = true;
            this.organizeTitle = '新增应用';
            this.organizeAction = 'add';
            this.parentId = typeof pid == 'number' ? pid : '';
        },
        // 弹窗新增 confirm 事件
        async organizeConfirm(slotComps, dialogComp) {
            let componentInstance = slotComps.default[0].componentInstance;
            let [err, res] = await componentInstance.getData();
            if (!err) {
                if (this.organizeAction == 'add') {
                    console.log('this.parentId:', this.parentId)
                    if (this.parentId) res.pid = this.parentId;
                    let [err2, res2] = await addOrganize(res);
                    if (!err2) {
                        this.organizeDialog = false;
                        this.$message.success('新建成功！');
                        // 获取应用树形结构
                        this.$store.dispatch('platform/getOrganizeTree')
                    }
                } else {
                    let [err2, res2] = await updateOrganize(res);
                    if (!err2) {
                        this.organizeDialog = false;
                        this.$message.success('编辑成功！');
                        // 获取应用树形结构
                        this.$store.dispatch('platform/getOrganizeTree')
                    }
                }
            }
        },
        // 编辑
        editItem(info) {
            // 编辑成功,不调接口更新
            // info：当前行信息，编辑时传入，实现列表不调接口更新
            // key: 唯一标识，默认为id, 通过key更新改行
            this.$router.push({
                name: 'AppManageMyappDetails',
                query: {
                    id: info.id,
                    action: 'edit'
                }
            })
            // let key = 'id';
            // this.$refs.pageList.updateData({action: "edit", info, key});
        },
        // 弹窗编辑
        editItemOnPage(info, data) {
            this.organizeDialog = true;
            this.organizeTitle = '编辑应用';
            this.organizeAction = 'edit';
            this.addItemData = data
        },
        // 弹窗新增下级应用
        addItemOnPage2(info, data) {
            this.addItemOnPage(data.id);
        },
        // 删除
        deleteItem(info) {
            // 编辑成功,不调接口更新
            // info：当前行信息，删除时传入，实现列表不调接口更新
            // key: 唯一标识，默认为id, 通过key删除改行
            let key = 'id';
            this.$confirm('1此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // todo: 调接口
                let params = {};
                params[key] = info[key];
                let [err, res] = await deleteApp(params);
                if (!err) {
                    this.$refs.pageList.updateData({ action: "delete", info, key });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        // 删除应用
        deleteItemOrganize(info, data) {
            console.log(info, data)
            this.$confirm('此操作将永久删除该应用, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let id = data.id
                let [err, res] = await deleteOrganize({ id });
                if (!err) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 获取应用树形结构
                    this.$store.dispatch('platform/getOrganizeTree')
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        // 查看详情
        viewDetails(info) {
            this.$router.push({
                name: 'AppManageMyappDetails',
                query: {
                    id: info.id,
                    action: 'read'
                }
            })
        },


    }
}
</script>
<style lang="less" scoped>
.organize-manage__wrapper {
    .content-main {
        display: flex;

        .el-row {
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        .organize-tree {
            background: #fff;
            border-right: 1px solid #eee;
            padding: 0 15px;
            height: 100%;

            .head-container {
                margin: 20px 0;
                display: flex;
                align-items: center;
                width: 100%;

                .el-tree {
                    width: 100%;
                    color: #606266;
                    font-size: 14px;

                    .custom-tree-node {
                        width: 100%;
                        display: flex;

                        .node-name {
                            flex: 1;
                        }

                        .actions {
                            width: 24px;

                            .el-popover__reference {
                                display: block;
                                line-height: 9px;
                                height: 19px;
                                color: #333;
                                font-size: 20px
                            }
                        }
                    }
                }
            }
        }

        .organize-list {
            .organize-name {
                background: #fff;
                padding: 15px;
                font-size: 18px;
                font-weight: 550;
                margin-bottom: 15px;
            }
        }
    }
}
</style>