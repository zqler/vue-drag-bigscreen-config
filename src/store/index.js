import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger"; // 修改日志
import state from "./state";
import actions from "./actions.js";
import getters from "./getters.js";
import mutations from "./mutations";
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {},
  plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态
});
