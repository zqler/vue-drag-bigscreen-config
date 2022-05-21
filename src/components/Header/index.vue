<template>
  <div class="laout-header">
    <div class="left">
      <slot name="headerLeft"></slot>
    </div>
    <div class="center"></div>
    <div class="right">
      <slot name="user"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {}
};
</script>

<style lang="less">
.laout-header {
  width: 100%;
  display: flex;
  .left {
    flex: 1;
  }
  .center {
    flex: 3;
  }
  .right {
    flex: 1;
    text-align: right;
  }
}
</style>
