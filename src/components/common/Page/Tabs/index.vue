<template>
    <div class="tabs__wrapper">
        <el-tabs v-model="paneId" v-on="$listeners">
            <el-tab-pane class="tab-pane" v-for="item in tabList" :label="item.label" :name="item.value" :key="item.id"></el-tab-pane>
            <slot></slot>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'Tabs',
    props: {
        tabList: {
            type: Array,
            default: () => []
        },
        active: {
            type: String,
            default: '-1'
        }
    },
    computed: {
        paneId: {
            get() {
                return this.active;
            },
            set(val) {
                this.$emit('update:active', val)
            }
        }
    }
}
</script>
<style lang="less" scoped>
.tabs__wrapper {
    height: 100%;
    /deep/.el-tabs {
        height: 100%;
        .el-tabs__header {
            margin: 0;
            .el-tabs__nav-wrap {
            padding: 0 10px;
            }
        }
        .el-tabs__content {
            height: calc(100% - 40px);
        }
    }
    
}
</style>

