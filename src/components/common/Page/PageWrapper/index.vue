<!-- 
    showBread 是否显示Breadcrumb，false不显示 true或不设置默认显示
    showBack  是否显示Breadcrumb中的返回按钮，false不显示 true或不设置默认显示
 -->
<template>
    <div class="page-wrapper">
        <Breadcrumb v-bind="$attrs" v-if="showBread"></Breadcrumb>
        <div class="content-wrapper scrollbar">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PageWrapper',
    computed: {
        showBread() {
            return !(this.$attrs.showBread === false)
        }
    }
}
</script>
<style lang="less" scoped>
.page-wrapper { 
    height: 100%;
    overflow: hidden;
    .content-wrapper {
        height: calc(100% - 74px);
        overflow-y: auto;
        padding: 15px;
    }
}
</style>