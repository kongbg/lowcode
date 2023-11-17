<template>
    <div class="change-theme__wrapper">
        <el-select v-model="themeMode" placeholder="请选择主题" size="small" @change="themeChange">
            <el-option v-for="item in themeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
import { setTheme } from "@/assets/styles/theme/theme"; // 引入切换主题方法

// 定义主题模式常量
const ThemeMode = {
    Default: 'default',
    Dark: 'dark'
};

// 定义主题选项常量
const ThemeOptions = [
    {
        label: '默认',
        value: ThemeMode.Default
    },
    {
        label: '暗黑',
        value: ThemeMode.Dark
    }
];

export default {
    name: "ChangeTheme",
    data() {
        return {
            themeMode: ThemeMode.Default, // 默认主题模式
            themeOptions: ThemeOptions // 主题选项
        }
    },
    mounted() {
        this.themeChange(ThemeMode.Default); // 进入页面默认渲染默认主题方案
    },
    methods: {
        // 切换主题方法
        themeChange: (value) => {
            document.documentElement.setAttribute('theme-mode', value); // 主题样式
            setTheme(value); // 设置新主题样式
        },
    }
}
</script>