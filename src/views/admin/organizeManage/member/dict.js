// 列表列配置
export const columns = [
    {
        type: 'selection',
    },
    {
        type: 'index',
    },
    {
        label: '日期',
        prop: 'date',
        // width: '180',
    },
    {
        label: '姓名',
        prop: 'name',
        // width: '180',
    },
    {
        label: '状态',
        slot: 'status',
        // width: '180',
    },
    {
        label: '操作',
        slot: 'action',
        // width: '180',
    },
]
// 列表分页配置
export const pagination = {
    currentPage: 1,
    pageSizes: [10, 20, 50, 100],
    pageSize: 10,
    layout: "total, sizes, prev, pager, next, jumper",
    total: 0
}

// 列表mock数据
export const mockTableData = [
    {
        id: 1,
        date: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄',
        status: '1'
    },
    {
        id: 2,
        date: '2016-05-04',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1517 弄',
        status: '1'
    },
    {
        id: 3,
        date: '2016-05-01',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1519 弄',
        status: '0'
    },
    {
        id: 4,
        date: '2016-05-03',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1516 弄',
        status: '0'
    }
]

// 搜索组件配置
export const filterConfig = [
    {
        label: '应用名称',
        type: 'input',
        prop: 'name'
    },
    {
        label: '应用名称',
        type: 'input',
        prop: 'name2'
    },
    {
        label: '应用名称',
        type: 'input',
        prop: 'name3'
    },
    {
        label: '应用名称',
        type: 'input',
        prop: 'name4'
    },
    {
        label: '应用名称',
        type: 'input',
        prop: 'name5'
    },
    {
        label: '应用名称',
        type: 'input',
        prop: 'name6'
    },
    {
        label: '应用名称',
        type: 'input',
        prop: 'name7'
    },
    {
        label: '应用名称',
        type: 'input',
        prop: 'name8'
    },
    {
        label: '应用名称',
        type: 'input',
        prop: 'name9'
    },
    // {
    //     label: '选择框',
    //     type: 'select',
    //     prop: 'name2',
    //     disabled: true,
    //     options: [
    //         {
    //             value: '1',
    //             label: '开启'
    //         },
    //         {
    //             value: '0',
    //             label: '关闭'
    //         }
    //     ]
    // },
    // {
    //     label: '应用名称',
    //     type: 'date',
    //     prop: 'name3'
    // },
    // {
    //     label: '应用名称',
    //     type: 'switch',
    //     prop: 'name4'
    // },
    // {
    //     label: '多选',
    //     type: 'checkbox',
    //     prop: 'name5',
    //     options: [
    //         {
    //             value: '1',
    //             label: '开启'
    //         },
    //         {
    //             value: '0',
    //             label: '关闭'
    //         }
    //     ]
    // },
    // {
    //     label: '单选',
    //     type: 'radio',
    //     prop: 'name6',
    //     options: [
    //         {
    //             value: '1',
    //             label: '开启'
    //         },
    //         {
    //             value: '0',
    //             label: '关闭'
    //         }
    //     ]
    // },
    // {
    //     label: '应用名称',
    //     type: 'textarea',
    //     prop: 'name7'
    // },
]
export const filterRules = {
    name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]

}
export const filterData = {
    name: '123',
    name5: ''
}