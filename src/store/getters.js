import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead
} from "@libs/utils";
import { routes } from "@/router/routers";
export default {
  menuList: (state, getters, rootState) =>
    getMenuByRouter(routes, rootState.roleType)
};
