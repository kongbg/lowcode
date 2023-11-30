<template>
    <div>
        <el-menu-item v-if="!hasChildren" :index="menu.id" @click="goToView(menu)">
          <i :class="menu.icon"></i>
          <span slot="title"> {{ menu.name }}</span>
        </el-menu-item>
        <el-submenu v-if="hasChildren" :index="menu.id">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span> {{ menu.name }} </span>
          </template>
          <menu-item v-for="child in menu.children" :menu="child" :key="child.id"></menu-item>
        </el-submenu>
    </div>
</template>
<script>
export default {
    name: 'MenuItem',
    props: {
        menu: {
            type: Object,
            default: ()=>{}
        }
    },
    computed: {
        hasChildren () {
            return this.menu.children && this.menu.children.length;
        }
    },
    methods: {
        goToView (data) {
            this.$router.push(
                {
                    name: data.routeName
                }
            )
        }
    }
}
</script>