import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import storage from "store";
// import Main from "@components/main";
import NProgress from "nprogress";
import { routes } from "./routers";
Vue.use(VueRouter);
const loginRoutePath = "/login";
const defaultRoutePath = "/";
const whiteList = ["About"]; //定义白名单
console.log(routes);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});
// router.onError(error => {
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern);
//   const targetPath = router.history.pending.fullPath;
//   if (isChunkLoadFailed) {
//     router.replace(targetPath);
//   }
// });
//动态路由生成
// router.beforeEach((to, from, next) => {
//   // 进度条
//   NProgress.start();
//   document.title = to.meta.title ? to.meta.title : "";
//   // 验证当前路由所有的匹配中是否需要有登录验证的
//   if (to.matched.some(r => r.meta.auth)) {
//     // 是否存有token作为验证是否登录的条件
//     const token = storage.get("token");
//     if (token && token !== "undefined") {
//       // 是否处于登录页面
//       if (to.path === loginRoutePath) {
//         next({ path: defaultRoutePath });
//         // 查询是否储存用户信息
//       } else {
//         const roleType = storage.get("roleType");
//         if (roleType == 1) {
//           //所有权限都有
//           next();
//         } else {
//           if (to.meta.access) {
//             if (to.meta.access.includes(roleType)) {
//               next();
//             } else {
//               next({ path: "/power-flow", replace: true });
//             }
//           } else {
//             next();
//           }
//           next();
//         }
//         next();
//       }
//     } else {
//       // 没有登录的时候跳转到登录界面
//       // 携带上登陆成功之后需要跳转的页面完整路径
//       next({
//         name: "login",
//         query: {
//           redirect: to.fullPath
//         }
//       });
//       NProgress.done();
//     }
//   } else {
//     // 不需要身份校验 直接通过
//     next();
//   }
// });

// router.afterEach(() => {
//   NProgress.done();
// });

export default router;
