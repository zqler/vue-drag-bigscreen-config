<template>
  <div class="bigScreen">
    <div class="left-main" v-show="isNav">
      <div class="nav">
        <!-- <NavMenu /> -->
      </div>
    </div>
    <div class="rigth-main">
      <div class="col">jfdlkjfakl</div>
      <div class="col">jlkjlkj</div>
      <div class="col">jlkjlkj</div>
      <div class="col">jkljlkj</div>
      <div class="col">kjlkjklj</div>
      <div class="col">jkljklj</div>
      <div class="opt">
        <a-button type="primary" @click="onShow"
          >点击导航栏显示隐藏ffdfd
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "ant-design-vue";
// import NavMenu from "../../components/navmenu/index";
Vue.use(Button);

export default {
  name: "BigScreen",
  components: {
    // NavMenu
  },
  data() {
    return {
      num: 0,
      isNav: true
    };
  },
  mounted() {
    window.onresize = () => {
      this.num = this.num + 1;
      console.log("浏览器窗口变化", this.num);
    };
  },
  methods: {
    onShow() {
      this.isNav = !this.isNav;
    }
  }
};
</script>

<style lang="less" scoped>
.bigScreen {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .left-main {
    float: left;
    width: 200px;
    height: 800px;
  }
  .rigth-main {
    height: 800px;
    margin-left: 200px;
    .col {
      float: left;
      margin: 15px 10px;
      width: 32%;
      height: 300px;
      background: blue;
    }
  }
}
</style>
