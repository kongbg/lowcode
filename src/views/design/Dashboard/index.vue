<template>
    <PageWrapper class="dashboard__wrapper" :showBread="true" :showBack="false">
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
        <ItemCard class="item-card" title="常用应用2">
            <div class="items">
                <div class="app-item" v-for="item in 10" @click="toView()">
                    <div class="icon">
                        <img src="@/assets/icons/logo.png" alt="">
                    </div>
                    <div class="name">日报</div>
                </div>
            </div>
        </ItemCard>
        <ItemCard class="item-card" title="常用应用3">
            <div class="items">
                <div class="app-item" v-for="item in 10" @click="toView()">
                    <div class="icon">
                        <img src="@/assets/icons/logo.png" alt="">
                    </div>
                    <div class="name">日报</div>
                </div>
            </div>
        </ItemCard>
        <ItemCard class="item-card" title="常用应用4">
            <div class="items">
                <div class="app-item" v-for="item in 10" @click="toView()">
                    <div class="icon">
                        <img src="@/assets/icons/logo.png" alt="">
                    </div>
                    <div class="name">日报</div>
                </div>
            </div>
        </ItemCard>
    </PageWrapper>
</template>
<script>
export default {
    name: 'Dashboard',
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
}
</style>