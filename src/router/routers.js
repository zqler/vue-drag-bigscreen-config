import Layout from "@components/layout";
import storage from "store";
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "about" */ "../views/login"),
    meta: {
      title: "登录",
      hideInMenu: true
    }
  },
  // 其他路由都在Main 模板下
  {
    path: "/",
    name: "home",
    redirect: "/user",
    component: Layout,
    meta: {
      title: "首页",
      hideInTopMenu: true,
      auth: true
    },
    children: [
      {
        path: "/power-flow",
        name: "powerFlow",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/eleDetails/index.vue"
          ),
        meta: {
          title: "电力详情页面",
          hideInMenu: false,
          auth: true,
          notCache: true,
          icon: "mail"
        }
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "用户管理",
          auth: true,
          roleType: [1],
          notCache: true,
          icon: "user",
          access: [1]
        },
        component: () => import("../views/home/index"),
        children: [
          {
            path: "/about",
            name: "About",
            auth: true,

            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
              import(/* webpackChunkName: "about" */ "../views/About.vue")
          }
        ]
      },
      {
        path: "/plc",
        name: "plc",
        meta: {
          title: "站点管理",
          auth: true,
          roleType: [1],
          notCache: true,
          icon: "mail",
          access: [1]
        },
        component: () => import("../views/plc/index")
      },
      {
        path: "/device",
        name: "device",
        meta: {
          title: "设备管理",
          auth: true,
          roleType: [1],
          notCache: true,
          icon: "mail",
          access: [1]
        },
        component: () => import("../views/device/index")
      },
      {
        path: "/bigScreen",
        name: "BigScreen",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/bigScreen/index.vue"
          ),
        meta: {
          title: "大屏",
          auth: true,
          hideInMenu: false,
          notCache: true,
          icon: "mail"
        }
      },
      {
        path: "/test",
        name: "Test",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/about/index.vue"),
        meta: {
          title: "测试中断",
          auth: true,
          hideInMenu: false,
          notCache: true,
          icon: "mail"
        }
      }
    ]
  },
  // {
  //   path: "/",
  //   name: "home",
  //   component: Layout,
  //   meta: {
  //     title: "首页",
  //     hideInTopMenu: true,
  //     auth: true
  //   },
  //   children: [
  //     {
  //       path: "/plc",
  //       name: "plc",
  //       meta: {
  //         title: "plc页面",
  //         auth: true,
  //         notCache: true,
  //         icon: "mail"
  //       },
  //       component: () => import("../views/plc/index")
  //     }
  //   ]
  // },
  {
    path: "*",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/views/error-page/404.vue")
  }
];
const roleType = storage.get("roleType");
// if (roleType === 1) {
//   routes.map(item => {
//     if (item.children) {
//     } else {
//       return item;
//     }
//   });
// }
export { routes };
