<template>
    <div class="flow-page__wrapper">
        <Mxgraph :nodeInfo="nodeInfo"></Mxgraph>
    </div>
</template>
<script>
import Mxgraph from '../mxgraph';
export default {
    name: "Flow",
    components: {
        Mxgraph
    },
    data () {
        return {
            nodeInfo: {}
        }
    },
    created () {
        this.nodeInfo = this.initNodes()
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
        }
    }
}
</script>
<style lang="less" scoped>
.flow-page__wrapper{
    height: 100%;
}
</style>