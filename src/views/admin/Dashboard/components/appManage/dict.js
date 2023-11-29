export const config = [
    {
        label: '名称',
        type: 'input',
        prop: 'name'
    },
    {
        label: '分类',
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
export const rules = {
    name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
    ]

}
export const defaultData = {
    status: 1
}