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
            <tabs :tabList="tabList1" :active.sync="active1" @tab-click="tab1Click">
                <AppManage :type="active1" :canAdd="canAdd" :appTagList="appTagList1" :appList="appList1"></AppManage>
            </tabs>
        </ItemCard>

        <ItemCard v-if="organizetree.length" class="item-card" title="下级组织应用管理">
            <tabs :tabList="tabList2" :active.sync="active2"  @tab-click="tab2Click" :appTagList="appTagList2" :appList="appList2">
                <AppManage :type="active2"></AppManage>
            </tabs>
        </ItemCard>
        <div v-if="userInfo.company_id && !organizetree.length">
            <div>快去完善组织信息吧！<el-button type="text" @click="toOrganize">去完善～</el-button></div>
        </div>
        <div v-if="!userInfo.company_id" class="init-organize__wrapper">
            <div class="form__wrapper">
                <div class="title">请先完善公司信息</div>
                <div class="form">
                    <DynamicForms
                        ref="form"
                        :config="addItemConfig"
                        :rules="addItemRules"
                        :model="addItemData"
                        mode=""
                        label-width="120px"
                        size="small"
                    ></DynamicForms>
                    <div class="btns">
                        <el-button size="small" type="primary" @click="submit">保存</el-button>
                    </div>
                </div>
            </div>
        </div>
    </PageWrapper>
</template>
<script>
import AppManage from './components/appManage';
import { mapGetters } from "vuex";
import { getAppList } from '@/api/admin/app/index.js'
import { updateUser } from '@/api/admin/user/index.js'
export default {
    name: 'AdminDashboard',
    components: {
        AppManage
    },
    computed: {
        ...mapGetters(["userInfo", "organizetree", 'appTagList1', 'appTagList2']),
        tabList1 () {
            return this.appTagList1.map(item=>{
                return {
                    label: item.label,
                    value: item.id.toString()
                }
            })
        },
        tabList2 () {
            return this.appTagList2.map(item=>{
                return {
                    label: item.label,
                    value: item.id.toString()
                }
            })
        }
    },
    data() {
        return {
            canAdd: true,
            active1: '',
            appList1: [],
            active2: '',
            appList2: [],

            addItemConfig: [
                {
                    label: '用户名',
                    type: 'input',
                    prop: 'username',
                    disabled: true
                },
                {
                    label: '昵称',
                    type: 'input',
                    prop: 'nickname'
                },
                {
                    label: '公司名称',
                    type: 'input',
                    prop: 'company_name'
                },
                {
                    label: '社会信用代码',
                    type: 'input',
                    prop: 'credit_code'
                },
                {
                    label: '法人姓名',
                    type: 'input',
                    prop: 'legal'
                },
                {
                    label: '法人手机号',
                    type: 'input',
                    prop: 'legal_phone'
                },
                {
                    label: '手机号(可用于登录、修改密码)',
                    type: 'input',
                    prop: 'phone'
                }
            ],
            addItemRules: {
                company_name: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                legal: [
                    { required: true, message: '请输入法人姓名', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                legal_phone: [
                    { required: true, message: '请输入法人手机号', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                credit_code: [
                    { required: true, message: '请输入社会信用代码', trigger: 'blur' },
                    { min: 18, max: 18, message: '长度在 18 到 18 个字符', trigger: 'blur' }
                ],
            },
            addItemData: {}
        }
    },
    async created () {

        let { id, username, nickname, company_name, legal, legal_phone, phone, credit_code } = this.userInfo;
        this.addItemData = {
            id,
            username,
            nickname,
            company_name,
            legal,
            legal_phone,
            phone,
            credit_code
        }

        // 获取组织树形结构
        this.$store.dispatch('platform/getOrganizeTree');
        await this.$store.dispatch('appTag/getAppTagList1');
        if (this.tabList1.length) {
            this.active1 = this.tabList1[0].value;
            this.tab1Click()
        }
        await this.$store.dispatch('appTag/getAppTagList2');
        if (this.tabList2.length) {
            this.active2 = this.tabList2[0].value;
            this.tab2Click()
        }
    },
    methods: {
        async tab1Click () {
            let params = {
                type: this.active1,
                page: 1,
                pageSize: 999
            }
            let [err, res] = await getAppList(params);
            if (!err) {
                let { total, list } = res;
                this.appList1 = list;
            }
        },
        async tab2Click () {
            let params = {
                type: this.active2,
                page: 1,
                pageSize: 999
            }
            let [err, res] = await getAppList(params);
            if (!err) {
                let { total, list } = res;
                this.appList2 = list;
            }
        },
        toView() {
            this.$router.push({
                path: `/design/app/123`
            })
        },
        async submit () {
            let [err, res] = await this.$refs.form.getData();
            console.log(err, res);

            if (!err) {
                let [err2, res2] = await updateUser(this.addItemData);
                if (!err2) {
                    this.$message.success('完善成功！')
                    this.$store.dispatch('platform/getUserInfo');
                }
            }
        },
        toOrganize () {
            this.$router.push({
                name: 'OrganizeManageOrganize'
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
    .init-organize__wrapper {
        background: #fff;
        width: 100%;
        height: 100%;
        .form__wrapper {
            width: 600px;
            margin: 0 auto;
            padding: 20px 0;
            .title {
                text-align: center;
                font-size: 24px;
            }
            .btns {
                text-align: center;
            }
        }
    }
}
</style>