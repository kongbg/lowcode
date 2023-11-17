<template>
    <div class="menus">
      <el-menu
        default-active="2"
        class="menubar"
        @open="handleOpen"
        @close="handleClose">
        
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- <el-menu-item index="5">
          <i class="el-icon-menu"></i>
          <span slot="title">组织管理</span>
        </el-menu-item> -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>组织管理</span>
          </template>
          <el-menu-item @click="goToView({name: 'OrganizeManageOrganize'})" index="1-1">组织管理</el-menu-item>
          <el-menu-item @click="goToView({name: 'OrganizeManageMember'})" index="1-2">员工管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>demo管理</span>
          </template>
          <el-menu-item @click="goToView({name: 'DemoManageTable-1'})" index="1-1">动态表格-1</el-menu-item>
          <el-menu-item @click="goToView({name: 'DemoManageTable-2'})" index="1-2">动态表格-2</el-menu-item>
        </el-submenu>
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
        },
        goToView (data) {
          this.$router.push(
            {
              name: data.name
            }
          )
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