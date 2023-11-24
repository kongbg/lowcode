<template>
    <PageWrapper class="organize-manage__wrapper">
        <PageList
            ref="pageList"
            row-key="id"
            :columns="columns"
            :api="getData"
            :pagination="pagination"
            :handleResult="handleResult"
            :filterConfig="filterConfig"
            :filterRules="filterRules"
            :filterData="filterData"
            :expand-row-keys="expands"
            border
        >
            <div class="table-tools" slot="table-tools">
                <el-button size="small" type="primary" @click="addItem">新增</el-button>
            </div>
            <el-table-column slot="status" label="状态" align="center">
                <template slot-scope="{row}">
                    {{ row.status | getTextByKey('status')}}
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

        <!-- 新增组织 -->
    </PageWrapper>
</template>
<script>
import { columns, pagination, mockTableData, filterConfig, filterData, filterRules, Enum } from './dict';
import { getData } from '@/api/admin/organizeManage/index.js'
export default {
    name: 'OrganizeManageOrganize',
    components: {},
    props:{},
    data() {
        return {
            columns,
            pagination,
            filterConfig,
            filterRules,
            filterData,
            expands: ['1'],
            getData,
        }
    },
    filters: {
        getTextByKey (data, key) {
            // console.log('getTextByKey',data, key, Enum)
            let info = Enum[key].find(item=>item.value == data)
            return info && info.label || '';
        }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        // 处理列表返回数据
        handleResult (result) {
            return result;
        },
        // 新增
        addItem () {
            this.$router.push({
                name: 'OrganizeManageOrganizeDetails',
                query: {
                    action: 'add'
                }
            })
            // 新增成功,更新列表
            // this.$refs.pageList.updateData({action: "add"});
        },
        // 编辑
        editItem (info) {
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
        // 删除
        deleteItem (info) {
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
                this.$refs.pageList.updateData({action: "delete", info, key});
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
        viewDetails (info) {
            this.$router.push({
                name: 'OrganizeManageOrganizeDetails',
                query: {
                    id: info.id,
                    action: 'read'
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.organize-manage__wrapper {}
</style>