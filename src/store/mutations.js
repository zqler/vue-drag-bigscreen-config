import storage from "store";
export default {
  handleUserName: (state, { userName, token, roleType }) => {
    state.userName = userName;
    state.token = token;
    state.roleType = [roleType];
    // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
    // storage.setItem("userName", userName);
    // storage.set("token", token);
    // storage.set("roleType", roleType);
  },
  setToken: (state, token) => {
    state.user_name = token;
    // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
    localStorage.setItem("token", token);
  },
  setMenu(state, val) {
    state.menu = val;
  }
};
