<template>
    <div class="user-info-action__wrapper">
        <div class="user-face">
            <img class="icon" src="https://vueschool.io/images/banners/assets/CERTIFICATES/mark.svg" alt="">
            <p class="nike-name">
                一只大提莫
            </p>
        </div>
    </div>
</template>
<script>

export default {
    name: "ChangeTheme",
    data() {
        return {
            
        }
    },
    mounted: () => {
       
    },
    methods: {
       
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