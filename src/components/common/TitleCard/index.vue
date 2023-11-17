<template>
    <div class="title__wrapper">
        <span>{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: 'TitleCard',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    }
}
</script>
<style lang="less" scoped>
.title__wrapper {
    height: 16px;
    font-size: 16px;
    line-height: 16px;
    position: relative;
    padding: 10px;

    &::before {
        display: block;
        content: '';
        position: absolute;
        left: 0;
        top: 10px;
        width: 4px;
        height: 15px;
        background: #409EFF;
    }
}
</style>

