<template>
    <div class="dynamic-forms__wrapper" :class="mode">
        <el-form ref="dynamicFrom"  v-bind="$attrs" >
            <el-form-item v-for="item in config" :key="item.prop" :label="item.label" :prop="item.prop">
                <!-- 文本框 -->
                <template v-if="item.type === 'input'">
                    <el-input
                        v-model="formData[item.prop]"
                        :placeholder="item.placeholder"
                        :disabled="item.disabled"
                        :clearable="item.clearable"
                    ></el-input>
                </template>
                <!-- 下拉框 -->
                <template v-if="item.type === 'select'">
                    <el-select
                        v-model="formData[item.prop]"
                        :placeholder="item.placeholder"
                        :disabled="item.disabled"
                        :clearable="item.clearable"
                        :multiple="item.multiple"
                    >
                        <el-option
                            v-for="op in item.options"
                            :label="op.label"
                            :value="op.value"
                            :key="op.value"
                        ></el-option>
                    </el-select>
                </template>
                <!-- 单个日期 带快捷选项 -->
                <template v-if="item.type === 'date'">
                    <el-date-picker
                        v-model="formData[item.prop]"
                        :type="item.type"
                        :placeholder="item.placeholder"
                        :disabled="item.disabled"
                        :clearable="item.clearable"
                        :picker-options="item.pickerOptions"
                    ></el-date-picker>
                </template>
                <!-- 开关 -->
                <template v-if="item.type === 'switch'">
                    <el-switch
                        v-model="formData[item.prop]"
                        :disabled="item.disabled"
                    ></el-switch>
                </template>
                <!-- 多选 -->
                <template v-if="item.type === 'checkbox'">
                    <el-checkbox-group v-model="formData[item.prop]">
                        <el-checkbox v-for="(op,i) in item.options" :key="i" :label="op.label" :name="item.prop"></el-checkbox>
                    </el-checkbox-group>
                </template>
                <!-- 单选 -->
                <template v-if="item.type === 'radio'">
                    <el-radio-group v-model="formData[item.prop]">
                        <el-radio v-for="(op,i) in item.options" :key="i" :label="op.label" ></el-radio>
                    </el-radio-group>
                </template>
                <!-- 文本域 -->
                <template v-if="item.type === 'textarea'">
                    <el-input
                        v-model="formData[item.prop]"
                        type="textarea"
                        :placeholder="item.placeholder"
                        :disabled="item.disabled"
                        :clearable="item.clearable"
                    ></el-input>
                </template>
            </el-form-item>
            
            <!-- 空item占位，使按钮排最后 -->
            <el-form-item v-for="(item,i) in emptyNum" :key="i"></el-form-item>
            <!-- table 上方filter -->
            <el-form-item v-if="mode === 'filter'" lable-width="0px" class="actions">
                <el-button size="small" @click="reset">重置</el-button>
                <el-button size="small" type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>

        <div v-if="mode === 'submit-inline' && ['add','edit'].includes(action)" lable-width="0px" class="actions">
            <el-button size="small" @click="reset">重置</el-button>
            <el-button size="small" type="primary" @click="submit">保存</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DynamicForms',
    props: {},
    computed: {
        config() {
            return this.$attrs.config || [];
        },
        mode () {
            return this.$attrs.mode || '';
        },
        action () {
            return this.$attrs.action;
        },
        formData () {
            let data = this.$attrs.model;
            // 补全formData未定义的默认值
            this.config.forEach(item => {
                let { prop, type } = item;
                if (!(prop in data)) {
                    this.$set(data, prop, this.defaultMap[type])
                }
            })
            return data || {};
        },
        // 占位元素
        emptyNum () {
            let num = 0;
            if (this.mode === 'filter') {
                num = 4 - this.config.length % 4 -1;
            }
            return num;
        }
    },
    data () {
        return {
            // 各个类型表单的默认值
            defaultMap: {
                input: '',
                select: '',
                date: '',
                switch: false,
                checkbox: [],
                radio: '',
                textarea: ''
            }
        }
    },
    mounted () {},
    methods: {
        reset () {
            this.$refs.dynamicFrom.resetFields();
            this.emitSearch(this.formData);
        },
        search () {
            this.$refs.dynamicFrom.validate((valid) => {
                if (valid) {
                    this.emitSearch(this.formData);
                } else {
                    console.warn('表单检验不通过')
                    return false;
                }
            });
        },
        emitSearch (formData) {
            this.$emit('search', formData);
        },
        cancel () {
            this.$emit('cancel')
        },
        submit () {
            this.$refs.dynamicFrom.validate((valid) => {
                if (valid) {
                    this.$emit('submit', this.formData)
                } else {
                    console.warn('表单检验不通过')
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
.dynamic-forms__wrapper {
    background: #fff;
    margin-bottom: 15px;
    padding: 15px 15px 0;
    border-radius: 4px;

    /deep/.el-form {
        
        // 部分组件宽度撑开
        .el-date-editor,.el-select {
            width: 100%;
        }
    }

    &.filter {
        /deep/.el-form {
            display: flex;
            flex-wrap: wrap;
            .el-form-item {
                width: 25%;
                .el-form-item__label::before {
                    display: none;
                }
                &.actions {
                    text-align: right;
                    .el-form-item__content {
                        margin-left: 0!important;
                    }
                }
            }
        }
    }
    
        
    &.submit-inline {
        /deep/.el-form {
            display: flex;
            flex-wrap: wrap;
            .el-form-item {
                width: 25%;
            }
        }
        .actions {
            text-align: center;
            padding: 30px 0 15px;
        }
    }

}
</style>