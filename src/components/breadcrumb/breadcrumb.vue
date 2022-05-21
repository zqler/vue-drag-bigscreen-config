<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item v-for="(item, index) in leveList" :key="item.path">
      <span
        v-if="item.redirect === 'noRedirct' || index === leveList.length - 1"
      >
        {{ item.meta.title }}</span
      >
      <a v-else @click.prevent="handleLink(item)"> {{ item.meta.title }}</a>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import Vue from "vue";
import { Breadcrumb } from "ant-design-vue";
Vue.use(Breadcrumb);

export default {
  name: "Breadcrumb",
  data() {
    return {
      leveList: []
    };
  },
  methods: {
    getBreadcrumb() {
      console.log(match);
      let match = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
      const fisrt = match[0];
      this.leveList = match.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
      console.log(match);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(path);
    }
  },
  watch: {
    $route(route) {
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  }
};
</script>

<style></style>
