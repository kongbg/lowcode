<template>
    <PageWrapper>
        <tabs :tabList="tabList" :active.sync="active">
            <Ui v-show="active == 1"></Ui>
            <Model v-show="active == 2"></Model>
            <Flow v-show="active == 3"></Flow>
        </tabs>
    </PageWrapper>
</template>
<script>
import Ui from './components/ui'
import Model from './components/model'
import Flow from './components/flow'
export default {
    name: 'Application',
    components: {
        Ui,
        Model,
        Flow
    },
    data () {
        return {
            active: '3',
            tabList: [
                {
                    label: '页面配置',
                    value: "1"
                },
                {
                    label: '模型配置',
                    value: "2"
                },
                {
                    label: '流程配置',
                    value: "3"
                }
            ]
        }
    }
}
</script>