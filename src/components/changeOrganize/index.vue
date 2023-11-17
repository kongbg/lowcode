<template>
    <div class="change-theme__wrapper">
        <el-cascader
            v-model="organize"
            size="small"
            :show-all-levels="false"
            placeholder="请选择组织"
            :options="organizeOptions"
            :props="{ checkStrictly: true }"
        >
        </el-cascader>
    </div>
</template>
<script>
export default {
    name: "ChangeTheme",
    data() {
        return {
            organize: '',
            organizeOptions: []
        }
    },
    created() {
        this.organizeOptions = this.getOrganizes();
        this.organize = this.organizeOptions.length ? this.organizeOptions[0].value : '';
    },
    methods: {
        getOrganizes () {
            let list = [
                {
                    label: '总集团公司',
                    value: '1',
                    children: [
                        {
                            label: '公司1',
                            value: '1-1',
                            children: [
                                {
                                    label: '公司1-部门1',
                                    value: '1-1-1'
                                },
                                {
                                    label: '公司1-部门2',
                                    value: '1-1-2'
                                }
                            ]
                        },
                        {
                            label: '公司2',
                            value: '1-2',
                            children: [
                                {
                                    label: '公司2-部门1',
                                    value: '1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ];
            return list;
        }
    }
}
</script>