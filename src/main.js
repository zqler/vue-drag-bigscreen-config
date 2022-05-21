import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import config from "@/config";
import Http from "@libs/http";
import VueKonva from "vue-konva";
import "./styles/color.less";
import "./styles/global.less";
// 中文
import { ConfigProvider } from "ant-design-vue";
Vue.config.productionTip = false;
// 全局注册http 请求
Vue.prototype.http = Http;
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
//防止手动修改localstorage
window.addEventListener("storage", e => {
  sessionStorage.setItem(e.key, e.oldValue); //重新赋值修改前的值
});
// 中文
Vue.use(ConfigProvider);

Vue.use(VueKonva);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
