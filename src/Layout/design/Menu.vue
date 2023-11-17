<template>
    <div class="menus">
      <el-menu
        default-active="2"
        class="menubar"
        @open="handleOpen"
        @close="handleClose">
        
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">menu首页</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-menu"></i>
          <span slot="title">组织管理</span>
        </el-menu-item>
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>组织管理</span>
          </template>
          <el-menu-item index="1-1">所有组织</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-submenu> -->
        <!-- <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item> -->
      </el-menu>
    </div>
</template>
<script>
export default {
    name: "Menu",
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style lang="less" scoped>
.menus {
  width: 220px;
  height: 100%;
  .menubar {
    height: 100%;
  }
}
</style>