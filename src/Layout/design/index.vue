<template>
    <div class="page-content__wrapper">
        <div class="header__wrapper">
            <Header></Header>
        </div>
        <div class="content__wrapper">
            <div class="menu__wrapper">
                <Menu></Menu>
            </div>
            <div class="main__wrapper">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "../Header"
import Menu from "./Menu"
export default {
    name: "pageContentWrapper",
    components: {
        Header,
        Menu,
    },
}
</script>
<style lang="less" scoped>
.page-content__wrapper {
    .content__wrapper {
        display: flex;
        .menu__wrapper {}
        .main__wrapper {
            // padding: 10px 0;
            flex: 1;

            .fade-enter-active, .fade-leave-active {
                transition: opacity 0.5s ease;
            }

            .fade-enter-from, .fade-leave-to {
                opacity: 0;
            }
        }
    }
}
</style>