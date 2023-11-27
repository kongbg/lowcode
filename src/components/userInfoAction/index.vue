<template>
    <div class="user-info-action__wrapper">
        <div class="user-face">
            <el-popover
                placement="top-start"
                width="150"
                trigger="hover"
            >
                <div class="content">
                    <div style="cursor: pointer;" @click="logout">退出登录</div>
                </div>
                <div slot="reference">
                    <img class="icon" src="https://vueschool.io/images/banners/assets/CERTIFICATES/mark.svg" alt="">
                </div>
            </el-popover>
            
            <p class="nike-name">
                一只大提莫
            </p>
        </div>
    </div>
</template>
<script>
import { logout } from '@/api/admin/user/index.js'
import { message } from '@/components/message/index.js';
export default {
    name: "ChangeTheme",
    data() {
        return {}
    },
    mounted: () => {},
    methods: {
        async logout() {
            // 拦截 logout 的全局报错弹窗
            message.stop();
            let [err, res] = await logout();
            if (!err) {
                this.$message({
                    type: 'success',
                    message: res.message
                })
                let service = this.$route.path.split('/')[1];
                localStorage.clear();
                setTimeout(()=>{
                    this.$router.push({
                        path: `/${service}/login`
                    })
                }, 1000)
            } else {
                // 放开 logout 的全局报错弹窗
                message.start();
                message.error('在这里处理报错')
            }
        }
    }
}
</script>
<style lang="less" scoped>
.user-info-action__wrapper {
    .user-face {
        display: flex;
        .icon {
            margin-right: 10px;
            cursor: pointer;
        }
        .nike-name {
            font-size: 14px;
            line-height: 30px;
        }
    }
}
</style>