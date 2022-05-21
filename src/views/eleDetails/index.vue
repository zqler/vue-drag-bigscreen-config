<template>
  <div class="eleDetails">
    <a-select :value="plcId" style="width: 200px" @change="handleChange">
      <a-select-option v-for="item in plcList" :value="item.id" :key="item.id">
        {{ item.name }}
      </a-select-option>
    </a-select>
    <div class="ele-top">
      <div class="list-con">
        <infoBox></infoBox>
      </div>
      <div class="left-build">
        <div class="stage">
          <v-stage ref="stage" :config="stageSize" :y="10">
            <v-layer ref="layer">
              <v-image
                v-for="item in imageBuild"
                :key="`${item.x}${item.y}`"
                :x="item.x + 30"
                :y="item.y"
                :config="{
                  image: item.image
                }"
              />
              <v-image
                v-for="item in image"
                :key="`${item.x}${item.y}`"
                :x="item.x + 30"
                :y="item.y"
                :config="{
                  image: item.image
                }"
              />
              <v-line
                v-for="item in topLine"
                :x="item.x + 30"
                :y="item.y"
                :key="`${item.x}+${item.y}`"
                :points="item.points"
                :stroke="item.stroke"
                :strokeWidth="4"
                :tension="item.tension"
              ></v-line>
              <!-- 开关状态 -->
              <v-image
                v-for="item in image"
                :key="`${item.x}${item.y}-100`"
                :x="item.x - 20"
                :y="item.y"
                :config="{
                  image: switchRed
                }"
              />
            </v-layer>
          </v-stage>
        </div>
      </div>
      <div class="right-build"></div>
    </div>
    <div class="ele-bottom">
      <div class="canvas-line">
        <v-stage ref="stage" :config="bottomstageSize">
          <v-layer ref="layer">
            <v-image
              v-for="item in bottomImages"
              :key="`${item.x}${item.y}`"
              :x="item.x"
              :y="item.y"
              :config="{
                image: item.isOpen ? imageOpen : imageClose
              }"
            />
            <template v-for="(item, index) in list">
              <v-line
                :x="80 + index * 330"
                :y="1"
                :key="index + 'h1'"
                :points="[0, 0, 0, 50]"
                stroke="#76E07C"
                :strokeWidth="4"
              ></v-line>
              <v-line
                :x="80 + index * 330"
                :y="1"
                :key="index + 'h2'"
                :points="[0, 80, 0, 100]"
                stroke="#76E07C"
                :strokeWidth="4"
              ></v-line>
            </template>
            <v-line
              :x="58"
              :y="2"
              :points="bottomHLinePoints"
              stroke="#76E07C"
              :strokeWidth="4"
              :tension="2"
            ></v-line>
          </v-layer>
        </v-stage>
      </div>
      <div class="card-list" :style="{ width: cardWidth }">
        <CardItem
          v-for="(item, index) in list"
          :key="index"
          :cardData="item"
        ></CardItem>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Table,
  Tag,
  Divider,
  Icon,
  Button,
  Pagination,
  Select
} from "ant-design-vue";
import { getDeviceDataByPlcId, getPlc } from "@apis";
import infoBox from "./components/infoBox.vue";
import factory from "@images/factory.svg";
import powerstation from "@images/powerstation.svg";
import CardItem from "./components/cardItem.vue";
import icon_open from "@images/icon_open.svg";
import icon_close from "@images/icon_close.svg";
import switch_green from "@images/switch_green.svg";
import switch_red from "@images/switch_red.svg";
Vue.use(Table)
  .use(Tag)
  .use(Divider)
  .use(Icon)
  .use(Button)
  .use(Pagination)
  .use(Select);
export default {
  components: {
    CardItem,
    infoBox
  },
  data() {
    return {
      visible: false,
      stageSize: {
        width: 1000,
        height: 360
      },
      bottomstageSize: {
        width: 1920,
        height: 550
      },
      bottomHLinePoints: [0, 0], //电路顶部横着总线
      imageOpen: null,
      imageClose: null,
      switchGreen: null,
      switchRed: null,
      imageBuild: [], //建筑数据
      image: [],
      topLine: [],
      bottomLine: [],
      bottomImages: [],
      list: [],
      plcList: [],
      cardWidth: "100%",
      plcId: "" //选中plc
    };
  },
  created() {
    const imagePowers = new window.Image();
    imagePowers.src = powerstation;
    imagePowers.onload = () => {
      // set image only when it is loaded
      this.imageBuild.push({
        x: 0,
        y: 30,
        image: imagePowers
      });
    };
    const imageFactory = new window.Image();
    imageFactory.src = factory;
    imageFactory.onload = () => {
      // set image only when it is loaded
      this.imageBuild.push({
        x: 600,
        y: 30,
        image: imageFactory
      });
    };
    this.imageOpen = new window.Image();
    this.imageOpen.src = icon_open;
    this.imageClose = new window.Image();
    this.imageClose.src = icon_close;
    this.switchGreen = new window.Image();
    this.switchGreen.src = switch_green;
    this.switchRed = new window.Image();
    this.switchRed.src = switch_red;
    this.imageOpen.onload = () => {
      // set image only when it is loaded
      this.image.push(
        {
          x: 26,
          y: 150,
          image: this.imageOpen
        },
        {
          x: 26,
          y: 300,
          image: this.imageOpen
        }
      );
      // this.bottomImages.push({ x: 26, y: 0, image: imageOpen });
    };

    this.topLine.push(
      {
        x: 0,
        y: 0,
        points: [30, 100, 30, 150],
        stroke: "#76E07C",
        strokeWidth: 4,
        tension: 2
      },
      {
        x: 0,
        y: 100,
        points: [30, 80, 30, 200],
        stroke: "#76E07C",
        strokeWidth: 4,
        tension: 2
      },
      {
        x: 0,
        y: 330,
        points: [30, 0, 30, 100],
        stroke: "#76E07C",
        strokeWidth: 4,
        tension: 2
      },
      {
        x: 0,
        y: 270,
        points: [30, 0, 650, 0],
        stroke: "#76E07C",
        strokeWidth: 4,
        tension: 2
      },
      {
        x: 600,
        y: 0,
        points: [50, 100, 50, 272],
        stroke: "#76E07C",
        strokeWidth: 4,
        tension: 2
      }
    );
  },
  mounted() {
    this.getPlc();
    // this.getDeviceDataByPlcId();
  },
  methods: {
    async getPlc() {
      this.loading = true;
      const { data, error } = await getPlc(this.filter);
      this.loading = false;
      if (data) {
        this.plcList = [...data];
        this.plcId = this.plcList.length > 0 ? this.plcList[0].id : "";
        this.handleChange(this.plcId);
      }
    },
    handleChange(value) {
      this.plcId = value;
      this.getDeviceDataByPlcId();
    },
    canvas() {},
    async getDeviceDataByPlcId() {
      const { data, error } = await getDeviceDataByPlcId({ plcId: this.plcId });
      this.list = data;
      const len = this.list.length;
      if (len > 0) {
        const x = 30 + 330 * (len - 1);
        this.bottomHLinePoints.push(x, 0); //x轴加长
      }
      console.log(this.bottomHLinePoints);
      this.cardWidth = 30 + 330 * len + "px";
      this.bottomstageSize.width = 30 + 330 * len;
      this.getOpenStatus(this.list);
    },
    getOpenStatus(list = []) {
      this.bottomImages = [];
      list.map((item, index) => {
        let x = 76,
          y = 50; //默认值
        x = x + 330 * index;
        this.bottomImages.push({ x, y, isOpen: true });
      });
    }
  }
};
</script>
<style lang="less">
.eleDetails {
  width: 100%;
  height: 100%;
  .ant-select-selection {
    background-color: rgba(9, 76, 143, 0.2);
    border: 1px solid rgba(9, 76, 143, 0.8);
    color: #fff;
    .ant-select-arrow {
      color: #fff;
    }
  }
  .ele-top {
    position: relative;
    width: 100%;
    height: 360px;
    .list-con {
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
    }
    .left-build {
      position: absolute;
      width: 1200px;
    }
    .right-build {
      position: absolute;
      width: 600px;
    }
  }
  .ele-bottom {
    width: 100%;
    position: relative;
    height: 470px;
    overflow-y: hidden;
    overflow-x: auto;
  }
  .canvas-line {
    position: absolute;
    z-index: 10;
  }
  .card-list {
    position: absolute;
    top: 20px;
    height: 430px;
  }
}
</style>
