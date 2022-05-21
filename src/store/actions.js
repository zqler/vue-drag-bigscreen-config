import { login, logout } from "@apis/index";
export default {
  async logout({ commit, state }, params) {
    const { data, error } = await logout(params);
    if (data) {
      commit("handleUserName", "");
      return Promise.resolve(data);
    }
    if (error) {
      return Promise.reject(error);
    }
  }
};
