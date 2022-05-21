import Layout from "@components/layout";
import storage from "store";
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login"),
    meta: {
      title: "登录",
      hideInMenu: true
    }
  },
  // 其他路由都在Main 模板下
  {
    path: "/",
    name: "home",
    redirect: "/bigScreen",
    component: Layout,
    meta: {
      title: "首页",
      hideInTopMenu: true,
      auth: true
    },
    children: [
      {
        path: "bigScreen",
        name: "BigScreen",
        component: () => import("../views/bigScreen/index.vue"),
        meta: {
          title: "大屏",
          auth: true,
          hideInMenu: false,
          notCache: true,
          icon: "mail"
        }
      },
      {
        path: "big-screen-config",
        name: "bigScreenConfig",
        component: () => import("../views/big-screen-config/index.vue"),
        meta: {
          title: "大屏配置",
          auth: false,
          hideInMenu: false,
          notCache: true,
          icon: "mail"
        }
      },
      {
        path: "drag",
        name: "drag",
        component: () => import("../views/drag/index.vue"),
        meta: {
          title: "拖拽dom",
          auth: false,
          hideInMenu: false,
          notCache: true,
          icon: "mail"
        }
      }
    ]
  },
  {
    path: "*",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/views/error-page/404.vue")
  }
];

export { routes };
