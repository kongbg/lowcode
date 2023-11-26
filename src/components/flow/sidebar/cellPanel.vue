<template>
    <div class="cell-panel__wrapper">
        <div class="cells">
            <div :class="['flow-cell', item.type]" v-for="(item,index) in cells" :key="index">
                <span>{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
    name: 'CellPanel',
    components: {
        draggable
    },
    props: {
        cells: {
            type: Array,
            default: () => [
                {
                    type: 'start',
                    name: '开始'
                },
                {
                    type: 'start',
                    name: '开始'
                },
                {
                    type: 'start',
                    name: '开始'
                },
                {
                    type: 'start',
                    name: '开始'
                },
                {
                    type: 'start',
                    name: '开始'
                },
                {
                    type: 'start',
                    name: '开始'
                },{
                    type: 'start',
                    name: '开始'
                },
                {
                    type: 'start',
                    name: '开始'
                },
                {
                    type: 'end',
                    name: '开始'
                },
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.cell-panel__wrapper {
    border-top: 1px solid #EBEEF5;
    .cells {
        display: flex;
        flex-wrap: wrap;
        padding: 15px 15px 0;
        
    }
}
</style>