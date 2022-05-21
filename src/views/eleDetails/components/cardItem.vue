<template>
  <div class="card-item-box">
    <div class="content">
      <div class="top">
        <div class="left">
          <img
            class="icon-switch"
            :src="cardData.cbOpen === 1 ? switchGreen : switchRed"
            alt=""
            srcset=""
          />
          <img class="icon-g" :src="g" />
          <img
            class="icon-light"
            :src="cardData.cbOpen === 1 ? greenlight : redlight"
          />
        </div>
        <div class="right">
          <GaugeEchart :echartsData="cardData.totalPower"></GaugeEchart>
        </div>
      </div>
      <div class="bottom">
        <a-row>
          <a-col :span="12">
            <div class="name">发动机转速</div>
            <span class="num">{{ cardData.engineRpm }}</span>
            <span class="unit">rpm</span>
          </a-col>
          <a-col :span="12">
            <div class="name">功率</div>
            <span class="num">{{ cardData.totalPower }}</span>
            <span class="unit">Kw</span></a-col
          >
          <a-col :span="12">
            <div class="name">平均电压</div>
            <span class="num">{{ cardData.voltage }}</span>
            <span class="unit">V</span></a-col
          >
          <a-col :span="12">
            <div class="name">平均电流</div>
            <span class="num">{{ cardData.avgElectric }}</span>
            <span class="unit">A</span></a-col
          >
          <a-col :span="12">
            <div class="name">频率</div>
            <span class="num">{{ cardData.frequency }}</span>
            <span class="unit">HZ</span></a-col
          >
          <a-col :span="12">
            <div class="name">功率因数</div>
            <span class="num">{{ cardData.powerFactor }}</span>
            <span class="unit">Kw</span></a-col
          >
          <a-col :span="12">
            <div class="name">控制模式</div>
            <span class="num">{{ manualStatus[cardData.manual] }}</span>
            <span class="unit"></span
          ></a-col>
          <a-col :span="12">
            <div class="name">机组状态</div>
            <span class="num">{{ cardData.unitStatus }}</span>
            <span class="unit"></span
          ></a-col>
        </a-row>
      </div>
    </div>
    <div class="footer">
      DG-01
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Row, Col } from "ant-design-vue";
import GaugeEchart from "./gaugeEchart";
import icon_g from "@images/icon_g.svg";
import switch_green from "@images/switch_green.svg";
import switch_red from "@images/switch_red.svg";
import icon_greenlight from "@images/icon_greenlight.svg";
import icon_redlight from "@images/icon_redlight.svg";

Vue.use(Row).use(Col);
export default {
  name: "CardItem",
  components: {
    GaugeEchart
  },
  props: {
    cardData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      g: icon_g, //图标
      switchGreen: switch_green,
      switchRed: switch_red,
      greenlight: icon_greenlight,
      redlight: icon_redlight,
      manualStatus: {
        "1": "手动位",
        "2": "自动位",
        "0": "停止模式"
      }
    };
  }
};
</script>

<style lang="less" scoped>
.card-item-box {
  display: inline-block;
  margin-right: 20px;
  width: 309px;
  height: 420px;
  .content {
    width: 309px;
    height: 367px;
    background: linear-gradient(
      90deg,
      rgba(9, 76, 143, 0.2) 0%,
      rgba(76, 174, 255, 0.12) 100%
    );
    border-radius: 2px;
    border: 2px solid;
    border-image: linear-gradient(
        270deg,
        rgba(175, 211, 255, 0.1),
        rgba(97, 153, 212, 0.31)
      )
      2 2;
    .top {
      width: 100%;
      height: 169px;
      display: flex;
      border-bottom: 1px solid #2678aaff;
      .left {
        flex: 1;
        position: relative;
        width: 154px;
        height: 169px;
        border-radius: 0px 2px 0px 0px;
        text-align: center;
        .icon-g {
          position: absolute;
          margin-top: 70px;
          left: 25%;
        }
        .icon-switch {
          position: absolute;
          margin-top: 10px;
          left: 20%;
        }
        .icon-light {
          position: absolute;
          margin-top: 10px;
          left: 60%;
        }
      }
      .right {
        flex: 1;
        width: 154px;
        height: 169px;
        border-left: 1px solid rgba(120, 170, 255, 0.15);
        border-radius: 0px 2px 0px 0px;
      }
    }
    .bottom {
      color: #fff;
      .ant-col {
        padding: 2px 20px;
        height: 49px;
        border-bottom: 1px solid rgba(120, 170, 255, 0.15);
        &:nth-child(odd) {
          border-right: 1px solid rgba(120, 170, 255, 0.15);
        }
        .name {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }
        .num {
          font-size: 18px;
        }
        .unit {
          margin-left: 10px;
          font-size: 18px;
        }
      }
    }
  }
  .footer {
    margin-top: 10px;
    width: 309px;
    height: 40px;
    text-align: center;
    line-height: 30px;
    color: #fff;
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
  }
}
</style>
