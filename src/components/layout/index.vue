<template>
  <Layout id="main">
    <a-layout-header class="header">
      <div class="logo" />
      <Header>
        <template v-slot:headerLeft>
          <!-- <a-select
            default-value="lucy"
            style="width: 200px"
            @change="handleChange"
          >
            <a-select-option value="jack">
              Jack
            </a-select-option>
          </a-select> -->
        </template>
        <template v-slot:user>
          <div class="user-info">
            <span class="user" :title="`用户名:${userName}`">
              <Icon class="user-cion" type="user" />
              {{ userName }}
            </span>
            <Icon
              title="注销登录"
              class="logout"
              type="logout"
              @click="onLogout"
            />
          </div>
        </template>
      </Header>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200">
        <NavMenu
          :menuList="menuList"
          :openKeys="openKeys"
          :selectKeys="selectKeys"
        ></NavMenu>
      </a-layout-sider>
      <a-layout class="content" style="padding: 0 24px 24px">
        <Breadcrumb></Breadcrumb>
        <a-layout-content>
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </Layout>
</template>

<script>
import Vue from "vue";
import storage from "store";
// import Header from "../Header/index";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import NavMenu from "../navmenu/index";
import { Layout, Icon, Select } from "ant-design-vue";
// import { menuList } from "@/router/index";
import Header from "../Header";
import Breadcrumb from "../breadcrumb";
Vue.use(Layout).use(Breadcrumb);
export default {
  name: "Main",
  components: {
    Layout,
    NavMenu,
    Header,
    Icon,
    Breadcrumb
  },
  data() {
    return {
      openKeys: [], //默认展开菜单Id
      selectKeys: [] //默认选中菜单id
    };
  },
  computed: {
    ...mapState(["userName"]),
    menuList() {
      return this.$store.getters.menuList;
    }
  },
  mounted() {
    // this.menuList = menuList;
    console.log(this.menuList);
  },
  methods: {
    ...mapActions(["logout"]),
    async onLogout() {
      const data = await this.logout();
      if (data) {
        // storage.set("token", "");
        // storage.set("userInfo", "");
        this.$router.push({ name: "login" });
      }
    },
    handleChange() {}
  },
  watch: {}
};
</script>

<style lang="less">
.ant-layout {
  min-height: 100%;
  // background-image: url("../../assets/images/bg.png");
  overflow-y: auto;
}
.ant-layout-sider {
  min-height: 100%;
  background: #001529 !important;
}
.ant-layout-header {
  background: rgb(8, 47, 95);
}
.ant-layout-content {
  min-height: 100%;
  // background: rgb(8, 47, 95);
  padding: 24px;
  margin: 0;
  min-height: 280px;
}
.user {
  margin-right: 20px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  .user-cion {
    font-size: 18px;
    color: #fff;
  }
}
.ant-breadcrumb a {
  color: #fff;
}
.ant-breadcrumb-separator {
  color: #fff;
}
.ant-breadcrumb {
  color: #fff;
}
.ant-breadcrumb > span:last-child {
  color: rgba(255, 255, 255, 0.5);
}
.logout {
  font-size: 18px;
  color: #fff;
  cursor: pointer;
}
</style>
