<template>
    <div class="breadcrumb__wrapper">
        <el-page-header v-if="showBack" @back="goBack"></el-page-header>
        <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,i) in breadcrumbList" :key="item.path + i">
            <span @click="goPage(item, i)">{{ item.title }}</span>
        </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumb',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    computed: {
        showBack() {
            return !(this.$attrs.showBack === false)
        }
    },
    data() {
        return {
            breadcrumbList: []
        }
    },
    mounted() {
        
        // 初始化面包屑数据
        this.breadcrumbList = this.initBreadcrumbList();
    },
    methods: {
        initBreadcrumbList () {
            let matched = this.$route.matched;
            let list = [];

            matched.forEach(item => {
                if (['/design','/admin','/runtime'].includes(item.path)) {
                    list.push(
                        {
                            title: '首页',
                            name: 'Dashboard',
                            path: `${item.path}/Dashboard`,
                            redirect: item.redirect
                        }
                    )
                } else if (item.path !== '/design/Dashboard') {
                    list.push(
                        {
                            title: item.meta?.title,
                            name: item.name,
                            path: item.path
                        }
                    )
                }
            });
            return list;
        },
        goBack () {
            this.$router.back();
        },
        goPage (data, i) {
            if (i==this.breadcrumbList.length-1) return;
            let { name, path, redirect } = data;
            if (redirect) {
                this.$router.push({
                    path: redirect
                })
            } else if (name){
                this.$router.push({
                    name: name
                })
            } else {
                this.$router.push({
                    path
                })
            }
            
        }
    }
}
</script>
<style lang="less" scoped>
.breadcrumb__wrapper {
    display: flex;
    height: 44px;
    border-bottom: 1px solid #eee;
    padding: 0 10px;
    background: #fff;
    box-shadow: 0 0 6px 3px rgba(0,0,0,.08);
    /deep/.el-page-header {
        .el-page-header__title {
            line-height: 44px;
        }
    }
    .breadcrumb {
        display: flex;
        align-items: center;
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                cursor: pointer;
            }
            &:last-child{
                .el-breadcrumb__inner {
                    cursor: auto;
                }
            }
        }
    }
}
</style>

