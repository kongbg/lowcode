<template>
    <div class="mxgraph__wraper">
        <!-- 创建操作按钮放置容器 -->
        <div id="methods">
            <div ref="buttons"></div>
        </div>
        <div class="graphContainer" ref="graphContainer"></div>
    </div>
</template>
<script>
import mxgraph from '@/assets/js/mxgraph';
const { mxGraph, mxClient, mxCodec, mxUtils, mxConstants, mxPerimeter, mxHierarchicalLayout } = mxgraph;

export default {
    name: "Model",
    props: {
        nodeInfo: {
            type: Object,
            default: () => {
                return {
                    type: '',
                    nodesList: [],// 所有节点
                }
            }
        }
    },
    data() {
        return {
            graph: null, // graph实例
            drag: false,
        }
    },
    mounted() {
        this.initGraph();
        document.addEventListener('mousedown', function(event) {
            this.drag = true;
        });
        document.addEventListener('mouseup', function(event) {
            this.drag = false;
        });
    },
    methods: {
        // 初始化mxGraph
        initGraph() {
            if (!mxClient.isBrowserSupported()) {
                // 判断是否支持mxgraph
                mxUtils.error('Browser is not supported!', 200, false);
            } else {
                // 在容器中创建图表
                let container = this.$refs.graphContainer;
                let MxGraph = mxGraph;
                let MxCodec = mxCodec;
                var graph = this.graph = new MxGraph(container);
                console.log('初始化mxGraph成功');
                this.$emit('inited', graph);
                // 生成节点
                // var parent = graph.getDefaultParent();
                // // 表示mxgraph图准备更新前的状态
                // graph.getModel().beginUpdate();
                // try {
                //     let nodeList = this.nodeInfo.nodeList || [];
                //     let cellList = nodeList.filter(item => item.type == 1);
                //     let edgesList = nodeList.filter(item => item.type == 2);
                //     let insertNodes = {};
                //     cellList.forEach(item => {
                //         let { id, x, y, w, h, content, style } = item;
                //         let node = graph.insertVertex(parent, id, content, x, y, w, h, `nodeStyle_${id}`);
                        
                //         // 自定义节点类型 node-节点
                //         node.type = 'node'
                //         // todo style=null是设置默认样式
                //         graph.getStylesheet().putCellStyle(`nodeStyle_${id}`, style);

                //         insertNodes[id] = node;
                //     });

                //     // todo 连线的样式修改
                //     edgesList.forEach(item => {
                //         let { id, source, target, content } = item;
                //         let edge = graph.insertEdge(parent, id, content, insertNodes[source], insertNodes[target]);
                //         // 自定义节点类型 edge-连线
                //         edge.type = 'edge'
                //     })

                // } finally {
                //     // 表示mxgraph图更新后的状态
                //     graph.getModel().endUpdate();
                // }

                // 配置鼠标在画布中的事件
                this.configMouseEvent();


                // //  增加操作按钮
                // //选中所有
                // this.$refs.buttons.appendChild(
                //     mxUtils.button('Select all', function() {
                //     graph.selectAll()
                //     })
                // )

                // //选择一个
                // this.$refs.buttons.appendChild(
                //     mxUtils.button('Choose one', function() {
                //     graph.selectCell()
                //     })
                // )

                // //取消选择
                // this.$refs.buttons.appendChild(
                //     mxUtils.button('Deselect', function() {
                //     var cells = graph.getSelectionCells()
                //     graph.removeSelectionCells(cells)
                //     })
                // )

                // //删除所选
                // this.$refs.buttons.appendChild(
                //     mxUtils.button('Delete', function() {
                //     var cells = graph.getSelectionCells()
                //     graph.removeCells(cells)
                //     })
                // )

                // //放大节点
                // this.$refs.buttons.appendChild(
                //     mxUtils.button('ZoomIn', function() {
                //     graph.zoomIn()
                //     })
                // )

                // //缩小节点
                // this.$refs.buttons.appendChild(
                //     mxUtils.button('ZoomOut', function() {
                //     graph.zoomOut()
                //     })
                // )

                // //还原节点
                // this.$refs.buttons.appendChild(
                //     mxUtils.button('ZoomActual', function() {
                //     graph.zoomActual()
                //     })
                // )

                // //清空画板
                // this.$refs.buttons.appendChild(
                //     mxUtils.button('Clear', function() {
                //     graph.removeCells(graph.getChildVertices(graph.getDefaultParent()))
                //     })
                // )



                //定义布局
                // var layout = new mxHierarchicalLayout(graph);
                // layout.execute(parent)



            }
        },
        // 配置鼠标在画布中的事件
        configMouseEvent() {
            this.graph.addMouseListener(
                {
                    // currentState: null,
                    // previousStyle: null,

                    mouseDown: (sender, evt) => {
                        console.log('mouseDown:', evt)
                        if (!evt.state) {
                            console.log('点击了画布')
                        } else if (evt.state.cell.type == 'edge') {
                            console.log('点击了连线', evt.state.cell)
                        } else if (evt.state.cell.type == 'node') {
                            console.log('点击了节点', evt.state.cell)
                        }
                    },

                    mouseMove: (sender, me) => {
                        // if (this.drag) {
                        //     console.log('有东西',Math.ceil(me.graphX), Math.ceil(me.graphY))
                        // } else {
                        //     console.log('无东西')
                        // }
                        // this.graphX = Math.ceil(me.graphX)
                        // this.graphY = Math.ceil(me.graphY)
                        // console.log(Math.ceil(me.graphX), Math.ceil(me.graphY))
                    },

                    mouseUp: (sender, evt) => {
                        let { graphX, graphY } = evt;
                        console.log('落点坐标：', graphX, graphY)
                        // if (evt.sourceState === undefined) {
                        //     return false
                        // } else {
                        //     var cell = evt.sourceState.cell
                        //     if (cell) {
                        //         if (cell.edge && cell.edge === true) {
                        //             // 点击的是连线
                        //             localStorage.setItem('currOptEdgeId', cell.id)
                        //         } else if (cell.vertex && cell.vertex === true) {
                        //             // 点击的是节点
                        //             localStorage.setItem('currOptInstId', cell.id)
                        //         } else {
                        //             // 点击的是其他元素
                        //             console.log('点击了其他元素')
                        //         }
                        //     } else {
                        //         this.$message.error('请选择节点或者连线')
                        //     }
                        // }
                    }
                })
        },
        addFlowCell(data) {
            console.log('addFlowCell:', this.graph,this.graph.lastEvent?.clientX,this.graph.lastEvent?.clientY)
        }
    }
}
</script>

<style lang="less" scoped>
.mxgraph__wraper {
    height: 100%;

    .graphContainer {
        width: 100%;
        height: 100%;
        background-image: url('../../../../../assets/icons/grid.gif');
    }
}
</style>