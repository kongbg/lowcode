<template>
    <div class="dynamic-tables__wrapper">
        <!-- 顶部工具栏 -->
        <slot name="table-tools" class="top-tools"></slot>
        <!-- 表格 -->
        <el-table v-bind="$attrs" :data="tableData" v-loading="tableLoading">
            <template v-for="(item, index) in $attrs.columns">
                <!-- 选择框 -->
                <el-table-column v-if="item.selection" :key="`selection_${index}`" type="selection"></el-table-column>
                <!-- 序号 -->
                <el-table-column
                    v-else-if="item.type === 'index'"
                    :key="`index_${index}`"
                    :label="item.label || '序号'"
                    :align="item.align || 'center'"
                    :width="item.width || 60"
                >
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <!-- 自定义内容 -->
                <slot
                    v-else-if="item.slot"
                    show-overflow-tooltip
                    :name="item.slot"
                    :fixed="item.fixed"
                    :height="item.height"
                ></slot>
                <!-- 定义了formatProp -->
                <el-table-column
                    v-else-if="item.formatProp"
                    v-bind="item"
                    :align="item.align || 'center'"
                    :key="`normal_${index}`"
                >
                    <template slot-scope="scope">
                        {{ item.formatProp(item, scope.row) }}
                    </template>
                </el-table-column>
                <!--常规内容-->
                <el-table-column v-else v-bind="item" :align="item.align || 'center'" :key="`normal_${index}`"></el-table-column>
            </template>
        </el-table>
        <!-- 分页 -->
        <div class="pagination__wrapper">
            <el-pagination
                v-bind="pagination"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
            ></el-pagination>
        </div>
    </div>
</template>
<script >
import { deepClone } from '@/utils'
export default {
    name: 'DynamicTables',
    components: {
    },
    computed: {
        pagination () {
            return this.$attrs.pagination || {};
        }
    },
    data () {
        return {
            tableData: [],
            tableLoading: false,
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData(query={}) {
            let { api, handleResult} = this.$attrs;
            let params = {
                page: this.pagination.currentPage,
                pageSize: this.pagination.pageSize,
            };
            params = Object.assign(params, query)
            // console.log(params);
            this.tableData = [];
            this.tableLoading = true;
            let [err, res] = await api(params);
            this.tableLoading = false;
            if (!err) {
                let { total, list } = res;
                if (handleResult && typeof handleResult == "function") {
                    list = handleResult(deepClone(list));
                }
                this.tableData = list;
                this.pagination.total = total;
            }
        },
        handleCurrentChange(current) {
            this.pagination.currentPage = current;
            this.getData();
        },
        handleSizeChange (pageSize) {
            this.pagination.currentPage = 1;
            this.pagination.pageSize = pageSize;
            this.getData();
        },
        // 暴露给组件外部使用的方法
        updateData (params) {
            let { action, query, info, key } = params;
            // 新增，页码重置为1
            if (action == 'add') {
                this.pagination.currentPage = 1;
                this.getData(query);
            } else if (action == 'edit') {
                let row = this.tableData.find(item => item[key] == info[key]);
                if (row) {
                    // row = Object.assign(row, info);
                    row = info;
                }
            } else if (action == 'delete') {
                let index = -1;
                for(let i=0;i<this.tableData.length;i++) {
                    let item = this.tableData[i];
                    if (info[key] === item[key]) {
                        index = i;
                        break;
                    }
                }
                this.tableData.splice(index, 1);
                if (this.tableData.length == 0) this.getData(query);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.dynamic-tables__wrapper {
    padding: 15px;
    background: #fff;
    border-radius: 4px;
    .table-tools {
        margin-bottom: 15px;
        display: flex;
        justify-content: right;
    }
    .pagination__wrapper {
        background: #fff;
        text-align: right;
        margin-top: 15px;
    }
}
</style>