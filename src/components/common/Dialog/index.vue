<template>
    <div class="dialog__wrapper">
        <el-dialog
            ref="dialog"
            :title="title"
            :visible="dialogVisible"
            v-bind="$attrs"
            @close="close"
        >
            <slot></slot>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="cancel">取 消</el-button>
                <el-button size="small" type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Dialog',
    props: {
        title: {
            type: String,
            default: '提示'
        },
        tabList: {
            type: Array,
            default: () => []
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible;
            },
            set(val) {
                this.$emit('update:visible', val)
            }
        }
    },
    methods: {
        cancel () {
            this.dialogVisible = false;
            this.$emit('cancel')
        },
        confirm () {
            let slotComps = this.$refs.dialog.$slots;
            this.$emit('confirm', slotComps, this.$refs.dialog)
        },
        close() {
            this.dialogVisible = false;
            this.$emit('close')
        }
    }
}
</script>
<style lang="less" scoped>
.dialog__wrapper {
    /deep/.el-dialog {
        .el-dialog__header{
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
        }
        .el-dialog__body {
            padding: 20px ;
        }
        .el-dialog__footer {
            padding: 15px 20px;
            border-top: 1px solid #eee;
        }
        
    }
    
}
</style>

