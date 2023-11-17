<template>
    <div class="header">
        <div class="logo__warpper">
            <img class="logo" src="https://vueschool.io/images/banners/assets/CERTIFICATES/mark.svg" alt="">
            <div class="system-name">低代码平台</div>
            <changeOrganize></changeOrganize>
        </div>
        <div class="right-menus">
            <changeTheme class="change-theme"></changeTheme>
            <userInfoAction></userInfoAction>
        </div>
    </div>
</template>
<script>
import changeTheme from '@/components/theme/changeTheme.vue';
import userInfoAction from '@/components/userInfoAction'
import changeOrganize from '@/components/changeOrganize';
export default {
    name: 'Header',
    components: {
        changeTheme,
        userInfoAction,
        changeOrganize
    }
}
</script>
<style lang="less" scoped>
.header {
    background:  @baseColor;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;

    .logo__warpper {
        display: flex;
        .logo {
            margin-right: 20px;
        }
        .system-name {
            margin-right: 10px;
        }
    }
    .right-menus {
        display: flex;
        align-items: center;
        .change-theme {
            margin-right: 20px;
            width: 85px;
        }
    }
}
</style>