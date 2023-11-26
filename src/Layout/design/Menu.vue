<template>
    <div class="flow-sidebar__wrapper scrollbar">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item title="所有流程" name="1">
          <div class="flow-list scrollbar">
            <div class="flows">
              <div class="flow" v-for="item in flowList" :key="item.id">
                请假流程
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="发起节点" name="2">
          <CellPanel class="panel" :cells="startCells"></CellPanel>
        </el-collapse-item>
        <el-collapse-item title="流程节点" name="3">
          <CellPanel class="panel" :cells="normalCells"></CellPanel>
        </el-collapse-item>
        <el-collapse-item title="判断节点" name="4">
          <CellPanel class="panel" :cells="judgeCells"></CellPanel>
        </el-collapse-item>
        <el-collapse-item title="子流程节点" name="5">
          <CellPanel class="panel" :cells="subCells"></CellPanel>
        </el-collapse-item>
        <el-collapse-item title="结束节点" name="6">
          <CellPanel class="panel" :cells="endCells"></CellPanel>
        </el-collapse-item>
      </el-collapse>
      
    </div>
</template>
<script>
import CellPanel from '@/components/flow/sidebar/cellPanel.vue'
import mxgraph from '@/assets/js/mxgraph';
const { mxUtils } = mxgraph;

import Bus from '@/bus/index.js'
export default {
    name: "FlowSidebar",
    components: {
      CellPanel,
    },
    data () {
      return {
        activeCollapse: ['1','2','3','4','5','6'],
        flowList: [
          {
            id: 1,
            name: '请假流程'
          },
          {
            id: 2,
            name: '用章流程'
          },
          {
            id: 3,
            name: '财务流程'
          }
        ],
        startCells: [
          {
            type: 'start',
            name: '开始'
          }
        ],
        endCells: [
          {
            type: 'end',
            name: '结束'
          }
        ],
        subCells: [
          {
            type: 'sub',
            name: '子流程'
          }
        ],
        normalCells: [
          {
            type: 'normal',
            name: '普通节点'
          }
        ],
        judgeCells: [
          {
            type: 'judge',
            name: '判断节点'
          }
        ]
      }
    },
    created () {
      Bus.$on('graphInited', this.initFlowItem)
    },

    methods: {
      initFlowItem (graph) {
        const cells = document.querySelectorAll('.panel .flow-cell');
        cells.forEach(dom => {
          let { width, height, classList} = dom;
          function generalDropHandler(graph, evt, dropCell, x, y) {
            console.log(graph, evt, dropCell, x, y)
          };
          // 设置节点被拖拽时的样式(预览)
          function generalcreateDragPreview()  {
            console.log('generalcreateDragPreview')
            var elt = document.createElement('div');
            elt.style.width = `${width}px`;
            elt.style.height = `${height}px`;
            elt.style.transform = 'translate(-50%,-50%)';
            elt.classList = classList;
            return elt;
          }; 
        
          // 允许拖拽
          let ds = mxUtils.makeDraggable(dom, graph, generalDropHandler, generalcreateDragPreview(), 0, 0, true, true);
          ds.setGuidesEnabled(true);
        })
      }
    }
}
</script>
<style lang="less" scoped>
.flow-sidebar__wrapper {
  width: 220px;
  height: 100%;
  background: #fff;
  overflow-y: auto;
  /deep/.el-collapse {
    .el-collapse-item__header {
      padding-left: 15px;
      height: 42px;
      line-height: 42px;
    }
    .el-collapse-item__content {
      padding-bottom: 5px;
      .flow-list {
        height: 100%;
        max-height: 200px;
        overflow-y: auto;
        border-top: 1px solid #EBEEF5;
        .flows {
          .flow {
            padding-left: 15px;
            font-size: 14px;
            height: 34px;
            line-height: 34px;
            cursor: pointer;
            &:hover {
              color: #409eff;
              background-color: #f5f7fa;
            }
          }
        }
      }
    }
  }
  
  
}
</style>