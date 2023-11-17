export const config = [
    {
        label: '应用名称',
        type: 'input',
        prop: 'name'
    },
    {
        label: '选择框',
        type: 'select',
        prop: 'name2',
        disabled: true,
        options: [
            {
                value: '1',
                label: '开启'
            },
            {
                value: '0',
                label: '关闭'
            }
        ]
    },
    {
        label: '应用名称',
        type: 'date',
        prop: 'name3'
    },
    {
        label: '应用名称',
        type: 'switch',
        prop: 'name4'
    },
    {
        label: '多选',
        type: 'checkbox',
        prop: 'name5',
        options: [
            {
                value: '1',
                label: '开启'
            },
            {
                value: '0',
                label: '关闭'
            }
        ]
    },
    {
        label: '单选',
        type: 'radio',
        prop: 'name6',
        options: [
            {
                value: '1',
                label: '开启'
            },
            {
                value: '0',
                label: '关闭'
            }
        ]
    },
    {
        label: '应用名称',
        type: 'textarea',
        prop: 'name7'
    },
    
]
export const rules = {
    name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]

}
export const defaultData = {
    name: '123',
    name5: []
}