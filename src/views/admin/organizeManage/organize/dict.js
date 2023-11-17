





// 字典
export let Enum = {
    status : [
        {
            value: '1',
            label: '开启'
        },
        {
            value: '0',
            label: '停用'
        }
    ]
}

// 列表列配置
export const columns = [
    // {
    //     type: 'selection',
    // },
    // {
    //     type: 'index',
    // },
    {
        label: '组织名称',
        prop: 'name',
        // width: '180',
    },
    {
        label: '组织类型',
        prop: 'type',
        // width: '180',
    },
    {
        label: '负责人',
        prop: 'leader',
        // width: '180',
    },
    {
        label: '组织成员',
        prop: 'member',
        // width: '180',
    },
    {
        label: '创建人',
        prop: 'creator',
        // width: '180',
    },
    {
        label: '创建时间',
        prop: 'createTime',
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
        name: '王小虎1',
        type: '1',
        leader: '负责人',
        member: 5,
        creator: 'admin',
        createTime: '2023-11-05',
        status: '1',
        children: [
            {
                id: 11,
                name: '王小虎11',
                type: '1',
                leader: '负责人',
                member: 5,
                creator: 'admin',
                createTime: '2023-11-05',
                status: '1',
                children: [
                    {
                        id: 111,
                        name: '王小虎111',
                        type: '1',
                        leader: '负责人',
                        member: 5,
                        creator: 'admin',
                        createTime: '2023-11-05',
                        status: '1',
                    },
                ]
            },
        ]
    }
]

// 搜索组件表单配置
export const filterConfig = [
    {
        label: '组织名称',
        type: 'input',
        prop: 'name'
    },
    {
        label: '组织类型',
        type: 'input',
        prop: 'type'
    },
    {
        label: '负责人',
        type: 'input',
        prop: 'leader'
    },
    {
        label: '创建人',
        type: 'input',
        prop: 'creator'
    },
    {
        label: '创建时间',
        type: 'date',
        prop: 'createTime'
    },
    {
        label: '状态',
        type: 'select',
        prop: 'status',
        options: Enum.status
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
// 搜索组件表单校验配置
export const filterRules = {
    name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]

}
// 搜索组件表单校默认值
export const filterData = {}


// 新增组织表单配置
export const addItemConfig = [
    {
        label: '组织名称',
        type: 'input',
        prop: 'name',
    },
    {
        label: '组织类型',
        type: 'select',
        prop: 'type',
    },
    {
        label: '状态',
        type: 'select',
        prop: 'status',
        options: Enum.status
    }
]
// 新增组织表单校验配置
export const addItemRules = {}
// 新增组织表单默认值
export const addItemData = {}