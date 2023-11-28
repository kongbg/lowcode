<template>
    <PageWrapper class="organize-manage__wrapper">
        <div class="content-main">
            <!-- xs <768 sm >=769 md >=992 lg >=1200 xl >= 1920-->
            <el-row :gutter="0">
                <el-col class="organize-tree" :xs="24" :sm="24" :md="8" :lg="6" :xl="5">
                    <div class="head-container">
                        <el-input
                            v-model="deptName"
                            placeholder="请输入部门名称"
                            clearable
                            size="small"
                            prefix-icon="el-icon-search"
                        />
                        <el-button
                            style="margin-left: 10px"
                            type="primary"
                            size="small"
                            @click="addItemOnPage"
                        >新增组织</el-button>
                    </div>
                    <div class="head-container">
                        <el-tree :data="organizetree" node-key="id" default-expand-all :expand-on-click-node="false" :props="{label: 'name', children: 'children'}">
                            <div class="custom-tree-node" slot-scope="{ node, data }">
                                <div class="node-name" @click="elpopovers=[];nodeClick(node, data)">{{ node.label }}</div>
                                <el-popover
                                    class="actions"
                                    placement="bottom"
                                    width="160"
                                    trigger="click"
                                    v-model="elpopovers[node.id]"
                                >
                                    <div>
                                        <div>
                                            <el-button type="text" size="mini" @click.stop="editItemOnPage(node, data)">编辑组织信息</el-button>
                                        </div>
                                        <div>
                                            <el-button type="text" size="mini" @click.stop="addItemOnPage2(node, data)">添加组织</el-button>
                                        </div>
                                        <div>
                                            <el-button type="text" size="mini" @click.stop="deleteItemOrganize(node, data)">删除组织</el-button>
                                        </div>
                                    </div>
                                    <span slot="reference" @click="elpopovers=[node.id]">...</span>
                                </el-popover>
                            </div>
                        </el-tree>
                    </div>
                </el-col>
                <el-col class="organize-list" :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
                    <div class="organize-name"> {{ organizeName }}</div>
                    <PageList ref="pageList" row-key="id" :columns="columns" :api="getData" :pagination="pagination"
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

        <!-- 新增组织 -->
        <Dialog :title="organizeTitle" width="30%" :visible.sync="organizeDialog" @confirm="organizeConfirm">
            
                <DynamicForms
                    :config="addItemConfig"
                    :rules="addItemRules"
                    :model="addItemData"
                    mode=""
                    label-width="120px"
                    size="small"
                ></DynamicForms>
            
        </Dialog>
    </PageWrapper>
</template>
<script>
import { columns, pagination, mockTableData, filterConfig, filterData, filterRules, Enum,
    addItemConfig,
    addItemRules,
    addItemData
} from './dict';
import { mapGetters } from "vuex";
import { addOrganize, updateOrganize } from '@/api/admin/organizeManage/index.js';
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
            expands: ['1'],

            deptName: '',
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],

            organizeDialog: false,
            parentId: '',
            organizeTitle: '新增组织',
            organizeAction: 'add',
            addItemConfig,
            addItemRules,
            addItemData,

            elpopovers: [],
        }
    },
    computed: {
        ...mapGetters(["organizetree"]),
        organizeName: {
            set(val) {
                organizeName = val;
            },
            get() {
                let id = this.expands[0] || '';
                let info = this.data.find(item=>item.id==id);
                return info.label || '';
            }
        }
    },
    created() { },
    mounted() { },
    methods: {
        // 获取列表数据
        getData() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(
                        [null, { data: { total: 4, list: mockTableData } }]
                    )
                }, 100)
            })
        },
        // 处理列表返回数据
        handleResult(result) {
            return result;
        },
        // 新增
        addItem(params) {
            this.$router.push({
                name: 'OrganizeManageOrganizeDetails',
                query: {
                    action: 'add'
                }
            })
            // 新增成功,更新列表
            // this.$refs.pageList.updateData({action: "add"});
        },
        // 弹窗新增
        addItemOnPage (pid='') {
            this.addItemData = {};
            this.organizeDialog = true;
            this.organizeTitle = '新增组织';
            this.organizeAction = 'add';
            this.parentId = pid;
        },
        // 弹窗新增 confirm 事件
        async organizeConfirm (slotComps, dialogComp) {
            let componentInstance = slotComps.default[0].componentInstance;
            let [err, res] = await componentInstance.getData();
            if (!err) {
                if (this.organizeAction == 'add') {
                    let [err2, res2] = await addOrganize(res);
                    if (this.parentId) res.pid = this.parentId;
                    if (!err2) {
                        this.organizeDialog = false;
                        this.$message.success('新建成功！');
                    }
                } else {
                    let [err2, res2] = await updateOrganize(res);
                    if (!err2) {
                        this.organizeDialog = false;
                        this.$message.success('编辑成功！');
                        // 获取组织树形结构
                        this.$store.dispatch('getOrganizeTree')
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
                name: 'OrganizeManageOrganizeDetails',
                query: {
                    action: 'edit'
                }
            })
            // let key = 'id';
            // this.$refs.pageList.updateData({action: "edit", info, key});
        },
        // 弹窗编辑
        editItemOnPage (info, data) {
            this.organizeDialog = true;
            this.organizeTitle = '编辑组织';
            this.organizeAction = 'edit';
            this.addItemData = data
        },
        // 弹窗新增下级组织
        addItemOnPage2(info, data) {
            this.addItemOnPage(data.id);
        },
        // 删除
        deleteItem(info) {
            // 编辑成功,不调接口更新
            // info：当前行信息，删除时传入，实现列表不调接口更新
            // key: 唯一标识，默认为id, 通过key删除改行
            let key = 'id';
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // todo: 调接口
                this.$refs.pageList.updateData({ action: "delete", info, key });
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        // 删除组织
        deleteItemOrganize () {
            this.$confirm('此操作将永久删除该组织, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // todo: 调接口
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
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
                name: 'OrganizeManageOrganizeDetails',
                query: {
                    id: info.id,
                    action: 'read'
                }
            })
        },

        // 树形节点点击
        nodeClick(data) {
            this.organizeName = data.label;
        }
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