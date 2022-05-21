<template>
  <div class="container">
    <a-config-provider :locale="locale">
      <div id="app">
        <!-- <div id="nav" class="nav" v-if="!$route.meta.showNav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>|
          <router-link to="/list">table列表页</router-link>|
          <router-link to="/bigScreen">大屏</router-link>
        </div> -->
        <router-view />
      </div>
    </a-config-provider>
  </div>
</template>

<script>
// 中文
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  name: "App",
  data() {
    return {
      locale: zhCN
    };
  }
};
</script>
<style>
.container {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
