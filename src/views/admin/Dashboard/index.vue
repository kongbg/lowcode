<template>
    <PageWrapper class="dashboard__wrapper" :showBread="true" :showBack="false">
        <div class="base-info">
            <el-row class="info-row">
                <el-col class="info-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-card class="card">
                        <div v-for="o in 4" :key="o" class="text item">
                            {{ '列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col class="info-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-card class="card">
                        <div v-for="o in 4" :key="o" class="text item">
                            {{ '列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <ItemCard class="item-card" title="常用应用">
            <div class="items">
                <div class="app-item" v-for="item in 10" @click="toView()">

                    <div class="icon">
                        <img src="@/assets/icons/logo.png" alt="">
                    </div>
                    <div class="name">日报</div>
                </div>
            </div>
        </ItemCard>
        <ItemCard class="item-card" title="本组织应用管理">
            <tabs :tabList="tabList" :active.sync="active">
                <AppManage :type="active" :canAdd="canAdd"></AppManage>
            </tabs>
        </ItemCard>

        <ItemCard class="item-card" title="下级组织应用管理">
            <tabs :tabList="tabList" :active.sync="active">
                <AppManage :type="active"></AppManage>
            </tabs>
        </ItemCard>
    </PageWrapper>
</template>
<script>
import AppManage from './components/appManage'
export default {
    name: 'AdminDashboard',
    components: {
        AppManage
    },
    data() {
        return {
            canAdd: true,
            active: '2',
            tabList: [
                {
                    label: 'HR管理',
                    value: "2"
                },
                {
                    label: '财务管理',
                    value: "3"
                }
            ]
        }
    },
    methods: {
        toView() {
            this.$router.push({
                path: `/design/app/123`
            })
        }
    }
}
</script>
<style lang="less" scoped>
.dashboard__wrapper {
    .base-info {
        // padding: 10px;

        .info-row {
            .info-col {
                margin-bottom: 10px;

                .card {
                    margin-right: 10px;

                }

                &:last-child {
                    .card {
                        // margin-right: 0px;

                    }
                }
            }
        }
    }
}
</style>