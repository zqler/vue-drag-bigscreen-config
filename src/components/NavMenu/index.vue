<template>
  <div style="width: 100%;height: 100%">
    <a-menu
      :selectedKeys="[$route.path]"
      :default-open-keys="['/home']"
      :openKeys="openKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @select="onSelectMenu"
      @openChange="onOpenChange"
    >
      <!-- 只需要main 模板下面的 chilren 下面的路由 -->
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length > 0">
          <template v-if="item.meta && item.meta.hideInTopMenu">
            <a-menu-item :key="i.path" v-for="i in item.children">
              <a-icon :type="i.meta.icon" i v-if="i.meta && i.meta.icon" />
              {{ showTitle(i) }}
            </a-menu-item>
          </template>
          <a-sub-menu :key="item.path" v-else>
            <span slot="title">
              <a-icon :type="i.meta.icon" /><span>{{ showTitle(item) }} </span>
            </span>
            <a-menu-item :key="i.path" v-for="i in item.children">
              <a-icon :type="i.meta.icon" i v-if="i.meta && i.meta.icon" />
              {{ showTitle(i) }}
            </a-menu-item>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="item.path">
            <a-icon :type="item.meta.icon" v-if="item.meta && item.meta.icon" />
            <span>{{ showTitle(item) }}</span>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import Vue from "vue";
import { Menu, Divider, Icon, Button, Pagination } from "ant-design-vue";
import { showTitle } from "@libs/utils";
Vue.use(Menu)
  .use(Divider)
  .use(Icon)
  .use(Button)
  .use(Pagination);
export default {
  name: "NavMenu",
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      }
    },
    // openKeys: {
    //   type: Array,
    //   default() {
    //     return [];
    //   }
    // },
    selectKeys: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      collapsed: false,
      activeKey: [],
      openKeys: []
    };
  },
  mounted() {
    // 循环渲染菜单
  },
  methods: {
    getIcon(item) {
      if (item.meta && item.meta.icon) {
        return item.meta.icon;
      } else {
        return "";
      }
    },
    showTitle(item) {
      return showTitle(item, this);
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.menuList.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    onSelectMenu({ item, key, selectedKeys }) {
      this.$router.push({
        path: key
      });
      this.activeKey = selectedKeys;
    }
  },
  watch: {
    selectKeys: {
      handler(newValue = []) {
        if (this.menuList.length > 0) {
          this.activeKey = newValue || [this.menuList[0].path];
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less">
.ant-menu {
  text-align: left;
}
</style>
