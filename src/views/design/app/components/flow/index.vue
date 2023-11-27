<template>
    <div class="flow-page__wrapper">
        <Mxgraph ref="mxgraph" :nodeInfo="nodeInfo" @inited="inited"></Mxgraph>
    </div>
</template>
<script>
import Mxgraph from '../mxgraph';
import draggable from 'vuedraggable'
export default {
    name: "Flow",
    components: {
        Mxgraph,
        draggable
    },
    watch: {
        cells(nval, oval) {
            console.log('新增了一个节点:',nval, oval);
            this.addFlowCell(this.cells);
        }
    },
    data () {
        return {
            nodeInfo: {},
            cells:[]
        }
    },
    created () {
        this.nodeInfo = this.initNodes()
    },
    mounted () {
        // document.querySelector('.box1').addEventListener('mousemove', ()=>{
        //     console.log('mouseMove1')
        // })
        // document.querySelector('.box2').addEventListener('mousemove', ()=>{
        //     console.log('mouseMove2')
        // })
    },
    methods: {
        initNodes () {
            let info = {
                type: '',
                nodeList: [
                    {
                        id: '11111',
                        type: '1', // 1-节点 2-连线
                        x: 200,
                        y: 10,
                        w: 60,
                        h: 30,
                        content: 'Hello',
                        style: {
                            fillColor: "#3CAEA3",
                            fontColor: "white",
                            fontSize: 15,
                            rounded: 1
                        }
                    },
                    {
                        id: '22222',
                        type: '1', // 1-节点 2-连线
                        x: 200,
                        y: 80,
                        w: 60,
                        h: 30,
                        content: 'world',
                        style: {
                            fillColor: "#3CAEA3",
                            fontColor: "white",
                            fontSize: 15,
                            rounded: 1
                        }
                    },
                    {
                        id: '44444',
                        type: '1', // 1-节点 2-连线
                        x: 360,
                        y: 130,
                        w: 60,
                        h: 30,
                        content: 'world',
                        style: {
                            fillColor: "#3CAEA3",
                            fontColor: "white",
                            fontSize: 15,
                            rounded: 1
                        }
                    },
                    {
                        id: '55555',
                        type: '2', // 1-节点 2-连线
                        source: '11111',
                        target: '44444',
                        content: 'world',
                        style: {
                            fillColor: "#3CAEA3",
                            fontColor: "white",
                            fontSize: 15,
                            rounded: 1
                        }
                    },
                    {
                        id: '33333',
                        type: '2', // 1-节点 2-连线
                        source: '11111',
                        target: '22222',
                        content: 'world',
                        style: {
                            fillColor: "#3CAEA3",
                            fontColor: "white",
                            fontSize: 15,
                            rounded: 1
                        }
                    }
                ]
            }

            return info;
        },
        addFlowCell(cells) {
            this.$refs.mxgraph.addFlowCell(cells);
        },
        getComponentData() {
            return {
                on: {
                    change: this.handleChange,
                    input: this.inputChanged,
                    mousemove: this.onmousemove,
                },
                attrs:{
                    wrap: true
                },
                props: {
                    value: this.activeNames
                }
            };
        },
        handleChange(){
            console.log('handleChange')
        },
        inputChanged(){
            console.log('inputChanged')
        },
        onmousemove() {
            console.log('onmousemove1111')
        },
        // mxgraph初始化成功
        inited(graph) {
            this.$emit('inited', graph)
        }


    }
}
</script>
<style lang="less" scoped>
.flow-page__wrapper{
    height: 100%;
    border: 1px solid #d8dbe1;
    box-sizing: border-box;
    position: relative;
    /deep/.cell {
        display: none !important;;
    }
}
</style>