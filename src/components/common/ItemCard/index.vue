<template>
    <div class="item-card__warpper">
        <title-card v-if="$attrs.title" v-bind="$attrs" ></title-card>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ItemCard',
    props: {},
    data() {
        return {}
    },
}
</script>
<style lang="less" scoped>
.item-card__warpper {
    background: #fff;
    
}
</style>

