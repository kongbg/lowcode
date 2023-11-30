// 字典
export let Enum = {
    status: [
        {
            value: '1',
            label: '开启'
        },
        {
            value: '0',
            label: '停用'
        }
    ],
    types: [
        {
            value: 1,
            label: '集团'
        },
        {
            value: 2,
            label: '公司'
        },
        {
            value: 3,
            label: '部门'
        },
        {
            value: 4,
            label: '团队'
        }
    ]
}
/////////////////////列表配置///////////////////////
// 列表列配置
export const columns = [
    {
        label: '应用名称',
        prop: 'name',
    },
    {
        label: '应用类型',
        prop: 'type'
    },
    {
        label: '所属组织',
        prop: 'organize_id',
    }
    ,
    {
        label: '图标',
        prop: 'icon',
    },
    {
        label: '状态',
        prop: 'status',
        options: Enum.status,
        formatProp: (config, row) => {
            let { prop, options } = config;
            return options[row[prop]].label;
        }
    },
    {
        label: '创建时间',
        prop: 'createTime',
    },
    {
        label: '操作',
        slot: 'action',
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

/////////////////////搜索组件///////////////////////
// 搜索组件表单配置
export const filterConfig = [
    {
        label: '应用名称',
        type: 'input',
        prop: 'name'
    },
    {
        label: '应用类型',
        type: 'select',
        prop: 'type',
        options: []
    },
    {
        label: '所属组织',
        type: 'select',
        prop: 'organize_id',
        options: []
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
    }
]
// 搜索组件表单校验配置
export const filterRules = {
    username: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]

}
// 搜索组件表单校默认值
export const filterData = {}


/////////////////////新增应用///////////////////////
// 新增应用表单配置
export const addItemConfig = [
    {
        label: '应用名称',
        type: 'input',
        prop: 'name'
    },
    {
        label: '应用分类',
        type: 'select',
        prop: 'type',
        allowCreate: true,
        filterable: true,
        options: []
    },
    {
        label: '图标',
        type: 'input',
        prop: 'icon'
    },
    {
        label: '状态',
        type: 'radio',
        prop: 'status',
        options: [
            {
                value: 1,
                label: '开启'
            },
            {
                value: 0,
                label: '关闭'
            }
        ]
    }
]
// 新增应用表单校验配置
export const addItemRules = {}
// 新增应用表单默认值
export const addItemData = {}

/////////////////////应用详情///////////////////////
// 应用详情表单配置
export const detailConfig = [
    {
        label: '应用名称',
        type: 'input',
        prop: 'name'
    },
    {
        label: '应用分类',
        type: 'select',
        prop: 'type',
        allowCreate: true,
        filterable: true,
        options: []
    },
    {
        label: '所属组织',
        type: 'input',
        prop: 'organize_id'
    },
    {
        label: '图标',
        type: 'input',
        prop: 'icon'
    },
    {
        label: '创建人',
        type: 'input',
        prop: 'organize_id'
    },
    {
        label: '创建时间',
        type: 'input',
        prop: 'createdAt'
    },
    {
        label: '状态',
        type: 'radio',
        prop: 'status',
        options: [
            {
                value: 1,
                label: '开启'
            },
            {
                value: 0,
                label: '关闭'
            }
        ]
    }
]