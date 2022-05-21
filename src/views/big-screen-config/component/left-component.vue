<template>
  <Draggable
    v-model="componentList"
    group="people"
    :clone="cloneComponent"
    @choose="choose($event)"
    @start="drag = true"
    @end="onEnd($event)"
  >
    <div
      v-for="element in componentList"
      :key="element.id"
      class="component-box"
    >
      {{ element.name }}
    </div>
  </Draggable>
</template>

<script>
import { template } from "@babel/core";
import { thisTypeAnnotation } from "@babel/types";
import Draggable from "vuedraggable";
export default {
  name: "LeftComponent",
  components: {
    Draggable
  },
  data() {
    return {
      componentList: [
        {
          id: 1,
          name: "组件一",
          componentId: 101
        },
        {
          id: 2,
          name: "组件二",
          componentId: 102
        },
        {
          id: 3,
          name: "组件三",
          componentId: 103
        },
        {
          id: 4,
          name: "组件四",
          componentId: 104
        }
      ], //定义组件列表
      tempActiveData: null,
      startChooseEvt: null
    };
  },
  methods: {
    choose(event) {
      this.startChooseEvt = event;
    },
    cloneComponent(origin) {
      this.tempActiveData = null;
      console.log(origin);
      const _clone = { ...origin };
      const config = _clone.__config__;
      // this.createIdAndKey(_clone);
      this.tempActiveData = _clone;
      return _clone;
    },
    onEnd(event) {
      const { offsetX, offsetY } = this.startChooseEvt.originalEvent;
      console.log(offsetX, offsetY, event.originalEvent);
      this.tempActiveData.x = parseInt(event.originalEvent.x - offsetX, 10);
      this.tempActiveData.y = parseInt(event.originalEvent.y - offsetY, 10);
      console.log(this.tempActiveData);
      // this.activeData = this.tempActiveData;
      // this.creatLayere(); //创建图层
      // this.$setWidegetActived();
      this.$emit("on-drag", this.tempActiveData);
    }
  }
};
</script>

<style lang="less" scoped>
.component-box {
  width: 200px;
  height: 200px;
  margin: 10px;
  background: #ff5100;
  font-size: 20px;
  color: #fff;
  text-align: center;
}
</style>
