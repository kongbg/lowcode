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
const {mxGraph, mxClient, mxCodec, mxUtils, mxConstants, mxPerimeter, mxHierarchicalLayout} = mxgraph;

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
    data () {
        return {
            graph: null, // graph实例
        }
    },
    mounted() {
        this.initGraph()
    },
    methods: {
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
                // 生成 Hello world!
                var parent = graph.getDefaultParent();
                // 表示mxgraph图准备更新前的状态
                graph.getModel().beginUpdate();
                try {
                    let nodeList = this.nodeInfo.nodeList || [];
                    let cellList = nodeList.filter(item => item.type == 1);
                    let edgesList = nodeList.filter(item => item.type == 2);
                    let insertNodes = {};
                    cellList.forEach(item => {
                        let { id, x, y, w, h, content, style } = item;
                        let node = graph.insertVertex(parent, id, content, x, y, w, h, `nodeStyle_${id}`);

                        // todo style=null是设置默认样式
                        graph.getStylesheet().putCellStyle(`nodeStyle_${id}`, style);

                        insertNodes[id] = node;
                    });

                    // todo 连线的样式修改
                    edgesList.forEach(item => {
                        let { id, source, target, content} = item;
                        graph.insertEdge(parent, id, content, insertNodes[source], insertNodes[target]);
                    })

                } finally {
                    // Updates the display
                    // 表示mxgraph图更新后的状态
                    graph.getModel().endUpdate();
                }


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
        initGraph2() {
            if (!mxClient.isBrowserSupported()) {
               // 判断是否支持mxgraph
               mxUtils.error('Browser is not supported!', 200, false);
           } else {
                // 在容器中创建图表
                let container = this.$refs.graphContainer;
                let MxGraph = mxGraph;
                let MxCodec = mxCodec;
                var graph = this.graph = new MxGraph(container);
                // 生成 Hello world!
                var parent = graph.getDefaultParent();
                // 表示mxgraph图准备更新前的状态
                graph.getModel().beginUpdate();
                try {
                    /**
                     *  生成节点
                     *  insertVertex
                     *  参数1：parents 生成节点要插入的父级容器
                     *  参数2：null 此处可以设置节点的id，便于识别节点，null为默认id
                     *  参数3：label 此处设置节点的内容
                     *  参数4：设置节点大小及节点在父级容器中的相对位置
                     */
                    // var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 200, 80, 30, "fillColor=#3CAEA3;strokeColor=white;fontStyle=1;fontColor=white;rounded=1;fontSize=8;");
                    var v2 = graph.insertVertex(parent, null, 'World', 200, 150, 80, 30, 'nodeStyle');
                    //定义节点样式
                    var nodeStyle = {};
                    nodeStyle[mxConstants.STYLE_FILLCOLOR] = "#3CAEA3";
                    nodeStyle[mxConstants.STYLE_FONTSIZE] = 15;
                    // nodeStyle[mxConstants.STYLE_STROKE_COLOR] = "white";
                    nodeStyle[mxConstants.STYLE_FONTCOLOR] = "white";
                    nodeStyle[mxConstants.STYLE_ROUNDED] = 1;

                    // console.log('nodeStyle:', mxConstants, nodeStyle)

                    // 把定义好的样式object push到stylesheet
                    graph.getStylesheet().putCellStyle("nodeStyle", nodeStyle)

                    // var v3 = graph.insertVertex(parent, null, 'everyBody!', 300, 350, 60, 30);
                    /**
                    *  生成边（连线）
                    *  insertEdge
                    *  参数1：parents 生成边要插入的父级容器
                    *  参数2：null 此处可以设置节点的id，便于识别边，null为默认id
                    *  参数3：label 此处设置节点的内容
                    *  参数4：边的起始节点和终止节点
                    */
                    // graph.insertEdge(parent, null, '', v1, v2);
                    // graph.insertEdge(parent, null, '', v2, v3);
                    // graph.insertEdge(parent, null, '', v1, v3);
                } finally {
                    // Updates the display
                    // 表示mxgraph图更新后的状态
                    graph.getModel().endUpdate();
                }


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