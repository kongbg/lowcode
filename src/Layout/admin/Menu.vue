<template>
    <div class="menus">
      <el-menu
        class="menubar"
        @open="handleOpen"
        @close="handleClose"
      >
        <menu-item v-for="item in menus" :menu="item" :key="item.id"></menu-item>
      </el-menu>
    </div>
</template>
<script>
import MenuItem from '../components/menuItem.vue';
export default {
    name: "Menu",
    components: {
      MenuItem
    },
    data () {
      return {
        menus: [
          {
            id: '1',
            name: '首页',
            icon: 'el-icon-menu',
            routeName: 'AdminDashboard',
            path: '/admin/dashboard'
          },
          {
            id: '2',
            name: '组织管理',
            icon: 'el-icon-location',
            children: [
              {
                id: '2001',
                name: '组织管理',
                // icon: 'el-icon-menu',
                routeName: 'OrganizeManageOrganize',
                path: '/admin/organizeManage/organize'
              },
              {
                id: '2002',
                name: '员工管理',
                routeName: 'OrganizeManageMember',
                path: '/admin/organizeManage/member'
              },
            ]
          },
          {
            id: '3',
            name: '应用管理',
            icon: 'el-icon-location',
            children: [
              {
                id: '3001',
                name: '本组织应用',
                routeName: 'AppManageMyapp',
                path: '/admin/appManage/myapp'
              },
              {
                id: '3002',
                name: '下级组织应用',
                routeName: 'AppManageMyapp',
                path: '/admin/AppManageMyapp'
              },
            ]
          },
          {
            id: '4',
            name: 'demo管理',
            icon: 'el-icon-location',
            children: [
              {
                id: '4001',
                name: '动态表格-1',
                routeName: 'OrganizeManageOrganize',
                path: '/admin/organizeManage/organize',
                // children: [
                //   {
                //     id: '4001001',
                //     name: '动态表格-1-1',
                //     routeName: 'OrganizeManageOrganize',
                //     path: '/admin/organizeManage/organize',
                //   }
                // ]
              },
              {
                id: '4002',
                name: '动态表格-2',
                routeName: 'OrganizeManageOrganize',
                path: '/admin/organizeManage/organize'
              },
            ]
          },
        ]
      }
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
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