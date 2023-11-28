<template>
    <PageWrapper class="dashboard__wrapper" :showBread="true" :showBack="false">
        
        <div v-if="organizetree.length" class="base-info">
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

        <ItemCard v-if="organizetree.length" class="item-card" title="常用应用">
            <div class="items">
                <div class="app-item" v-for="item in 0" @click="toView()">

                    <div class="icon">
                        <img src="@/assets/icons/logo.png" alt="">
                    </div>
                    <div class="name">日报</div>
                </div>
            </div>
        </ItemCard>
        <ItemCard v-if="organizetree.length" class="item-card" title="本组织应用管理">
            <tabs :tabList="tabList" :active.sync="active">
                <AppManage :type="active" :canAdd="canAdd"></AppManage>
            </tabs>
        </ItemCard>

        <ItemCard v-if="organizetree.length" class="item-card" title="下级组织应用管理">
            <tabs :tabList="tabList" :active.sync="active">
                <AppManage :type="active"></AppManage>
            </tabs>
        </ItemCard>
        <div v-if="!organizetree.length">
            <div>快去完善组织信息吧！</div>
        </div>
    </PageWrapper>
</template>
<script>
import AppManage from './components/appManage';
import { mapGetters } from "vuex";
export default {
    name: 'AdminDashboard',
    components: {
        AppManage
    },
    computed: {
        ...mapGetters(["userInfo", "organizetree"]),
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
    created () {
        // 获取组织树形结构
        this.$store.dispatch('getOrganizeTree')
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