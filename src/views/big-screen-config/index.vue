<template>
  <div class="big-screen-config">
    <div class="left">
      <leftComponentVue @on-drag="onDragCb"></leftComponentVue>
    </div>
    <div class="box">
      <vue-ruler-tool
        :content-layout="{ left: 0, top: 0 }"
        :is-scale-revise="true"
        :v-model="presetLine"
      >
        <div
          style="height: 800px; width: 1750px;position: relative;margin: 0 auto"
          class="grid"
          ref="draggableBox"
        >
          <vue-draggable-resizable
            v-for="item in components"
            :key="item.id"
            :grid="[10, 10]"
            :x="item.x"
            :y="item.y"
            :w="200"
            :h="200"
            :parent="true"
            :debug="true"
            :min-width="200"
            :min-height="200"
            :isConflictCheck="true"
            :snap="true"
            :snapTolerance="20"
            @refLineParams="getRefLineParams"
            class="test1"
            @dragstop="onDrag"
            @resizing="onResize"
            @activated="onActivated(item)"
          >
            <component
              :is="componentConfig[item.componentId]"
              :option="item"
              @on-update="updateLayer"
            >
            </component>
            <div>组件：{{ item.name }}</div>
          </vue-draggable-resizable>
          <!--辅助线-->
          <span
            class="ref-line v-line"
            v-for="item in vLine"
            :key="item.id"
            v-show="item.display"
            :style="{
              left: item.position,
              top: item.origin,
              height: item.lineLength
            }"
          />
          <span
            class="ref-line h-line"
            v-for="item in hLine"
            :key="item.id"
            v-show="item.display"
            :style="{
              top: item.position,
              left: item.origin,
              width: item.lineLength
            }"
          />
          <!--辅助线END-->
        </div>
      </vue-ruler-tool>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import VueRulerTool from "vue-ruler-tool";
import leftComponentVue from "./component/left-component.vue";
export default {
  name: "app",
  components: {
    VueDraggableResizable,
    VueRulerTool,
    leftComponentVue
  },
  data() {
    return {
      vLine: [],
      hLine: [],
      presetLine: [
        { type: "l", site: 100 },
        { type: "v", site: 200 }
      ],
      //要显示的组件
      components: [
        {
          id: 101,
          name: "我是一个默认的组件",
          x: 10,
          y: 10
        }
      ],
      componentConfig: [104, 105],
      activeData: null
    };
  },
  mounted() {
    console.log(this.$refs.draggableBox.offsetTop);
  },
  methods: {
    //拖拽组件结束获取当前组件的相关信息
    onDragCb(component) {
      const { x, y } = component;
      this.components.push({ ...component });
      console.log(component);
    },
    updateLayer() {},
    onResize: function(x, y, width, height) {
      console.log(x, y, width, height);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
      console.log(x, y, 1111111);
    },
    onActivated(currentItem) {
      console.log(currentItem);
      this.activeData = currentItem; //更新数据
      // this.$refs.layer.currentLayerIdx = currentItem.__config__.layId; //同步图层区域的选中
    },
    // 辅助线回调事件
    getRefLineParams(params) {
      const { vLine, hLine } = params;
      console.log(vLine, hLine);
      let id = 0;
      this.vLine = vLine.map(item => {
        item["id"] = ++id;
        return item;
      });
      this.hLine = hLine.map(item => {
        item["id"] = ++id;
        return item;
      });
    }
  }
};
</script>
<style>
.grid {
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
      10px 20px / 20px 40px,
    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 40px;
}
</style>
<style lang="less" scoped>
.big-screen-config {
  position: relative;
  .left {
    position: absolute;
  }
  .box {
    position: absolute;
    left: 220px;
  }
}

.test1 {
  background-color: rgb(239, 154, 154);
}
.test2 {
  background-color: rgb(129, 212, 250);
}
.test3 {
  background-color: rgb(174, 213, 129);
}
</style>
