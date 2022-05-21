<template>
  <div class="info-box">
    <div class="left-title box-common">abc</div>
    <div class="right-title box-common">ect</div>
  </div>
</template>

<script>
export default {
  name: "InfoBox",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.info-box {
  position: relative;
  .left-title {
    position: absolute;
    top: 10px;
    left: 30px;
    width: 120px;
    height: 32px;
  }
  .box-common {
    background: linear-gradient(
      90deg,
      rgba(9, 76, 143, 0.6) 0%,
      rgba(76, 174, 255, 0.4) 100%
    );
    border-radius: 2px;
    border: 4px solid;
    border-image: linear-gradient(
        270deg,
        rgba(175, 211, 255, 0.16),
        rgba(97, 153, 212, 0.31)
      )
      4 4;
    color: #fff;
    text-align: center;
  }
  .right-title {
    position: absolute;
    top: 10px;
    left: 630px;
    width: 120px;
    height: 32px;
  }
}
</style>
