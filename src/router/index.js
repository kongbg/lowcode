import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/Layout/design/index.vue";
import adminLayout from "@/Layout/admin/index.vue";
Vue.use(VueRouter);

//重写路由的push方法
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

const routes = [
  // {
  //     path: '/',
  //     redirect: '/design'
  // },
  {
    // 超级管理员后台
    path: "/admin",
    component: adminLayout,
    redirect: "/admin/Dashboard",
    children: [
      // 首页
      {
        path: "Dashboard",
        name: "AdminDashboard",
        meta: {
          title: "首页",
        },
        component: () => import("@/views/admin/Dashboard/index.vue"),
      },
      // 组织管理
      {
        path: "organizeManage/organize",
        name: "OrganizeManageOrganize",
        meta: {
          title: "组织管理",
        },
        component: () => import("@/views/admin/organizeManage/organize/index.vue"),
      },
      // 组织管理-详情
      {
        path: "organizeManage/organize/viewDetails",
        name: "OrganizeManageOrganizeDetails",
        meta: {
          title: "详情",
        },
        component: () => import("@/views/admin/organizeManage/organize/details/index.vue"),
      },
      // 应用管理
      {
        path: "appManage/myapp",
        name: "AppManageMyapp",
        meta: {
          title: "应用管理",
        },
        component: () => import("@/views/admin/appManage/myapp/index.vue"),
      },
      // 应用管理-详情
      {
        path: "appManage/myapp/viewDetails",
        name: "AppManageMyappDetails",
        meta: {
          title: "详情",
        },
        component: () => import("@/views/admin/appManage/myapp/details/index.vue"),
      },
      // 员工管理
      {
        path: "organizeManage/member",
        name: "OrganizeManageMember",
        meta: {
          title: "员工管理",
        },
        component: () => import("@/views/admin/organizeManage/member/index.vue"),
      },
      // demo管理
      {
        path: "demoManage/table-1",
        name: "DemoManageTable-1",
        meta: {
          title: "动态表格1",
        },
        component: () => import("@/views/admin/demoManage/table-1/index.vue"),
      },
      {
        path: "demoManage/table-2",
        name: "DemoManageTable-2",
        meta: {
          title: "动态表格2",
        },
        component: () => import("@/views/admin/demoManage/table-2/index.vue"),
      },
    ],
  },
  // 登录
  {
    path: "/admin/login",
    name: 'Adminlogin',
    component: () => import("@/views/admin/login/index.vue")
  },
  // 注册
  {
    path: "/admin/register",
    name: 'AdminRegister',
    component: () => import("@/views/admin/register/index.vue")
  },
  {
    path: "/design",
    component: Layout,
    redirect: "/design/Dashboard",
    children: [
      {
        path: "Dashboard",
        name: "DesignDashboard",
        meta: {
          title: "首页",
        },
        component: () => import("@/views/design/Dashboard/index.vue"),
      },
      {
        path: "app/:id",
        name: "Application",
        meta: {
          title: "应用详情",
        },
        component: () => import("@/views/design/app/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, form, next) => {
  let token = localStorage.getItem('Platform-token')||'';
  let service = to.path.split('/')[1];
  let loginPath = `/${service}/login`;
  let registerPath = `/${service}/register`;
  let whites = [loginPath, registerPath]
  let dashboardPath = `/${service}/Dashboard`;

  if (!token) {
    if (whites.includes(to.path)) {
      next();
    } else {
      next(loginPath);
    }
  } else {
    if (to.path == loginPath) {
      next(dashboardPath);
    } else {
      next();
    }
  }
})

export default router;
