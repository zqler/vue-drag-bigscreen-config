import { forEach, hasOneOf, objEqual } from "@libs/tools";
/**
 * @Description:
 * - 处理请求头，
 * - apitoken、针对一般的post和文件上传，设置不同的headers
 * - 根据环境获取不同的baseUrl
 */

const getApitoken = () => {
  return localStorage.getItem("apiToken") || ""; //在登录时得到后存储起来
};

const commmonHeader = {
  Accept: "application/json",
  Authorization: `Bearer ${getApitoken()}`
};

/* 常规的 */
export const featchApiHeader = {
  ...commmonHeader,
  "Content-Type": "application/x-www-form-urlencoded"
};

/* 文件的 */
export const formApiHeader = {
  ...commmonHeader,
  "Content-Type": "multipart/form-data"
};

export const hasChild = item => {
  return item.children && item.children.length !== 0;
};

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true;
    else return false;
  } else return true;
};
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = [];
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || "",
        name: item.name,
        meta: item.meta,
        path: item.path
      };
      if (
        (hasChild(item) || (item.meta && item.meta.showAlways)) &&
        showThisMenuEle(item, access)
      ) {
        obj.children = getMenuByRouter(item.children, access);
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href;
      if (showThisMenuEle(item, access)) res.push(obj);
    }
  });
  return res;
};
export const showTitle = (item, vm) => {
  const { meta = {} } = item;
  let { title } = meta;
  title = (item.meta && item.meta.title) || item.name;
  return title;
};
export const baseApiUrl = process.env.VUE_APP_API_BASEURL;
