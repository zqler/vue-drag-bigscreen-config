<template>
  <div class="guan-components" ref="gaugeEcharts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "GaugeEchart",
  props: {
    echartsData: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      myChart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initEcharts();
    });
  },
  methods: {
    initEcharts(options) {
      const { echartsData } = this;
      const chartDom = this.$refs.gaugeEcharts;
      this.myChart = echarts.init(chartDom);
      const option = {
        backgroundColor: "",
        xAxis: {
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          // 内圆
          {
            type: "pie",
            radius: ["0", "35%"],
            center: ["50%", "50%"],
            z: 4,
            hoverAnimation: false,
            data: [
              {
                name: "积分",
                value: echartsData,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0,
                        color: "#79FF82"
                      },
                      {
                        offset: 1,
                        color: "#82F84C"
                      }
                    ])
                  }
                },
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: "#21880C",
                        align: "center",
                        fontSize: 16,
                        padding: [40, 0, 10, 0],
                        fontWeight: "bold"
                      },
                      b: {
                        color: "#fff",
                        align: "center",
                        fontSize: 16,
                        fontWeight: "bold"
                      }
                    },
                    formatter: function(params) {
                      return (
                        "{a|" + params.value + "}\n\n" + "{b|" + "kw" + "}"
                      );
                    },
                    position: "center",
                    show: true
                  }
                },
                labelLine: {
                  show: false
                }
              }
            ]
          },
          //进度图
          {
            type: "gauge",
            radius: "70%",
            center: ["50%", "50%"],
            min: 0,
            max: 1000,
            z: 5,
            splitNumber: 1, //刻度数量
            startAngle: 220,
            endAngle: -40,
            animation: true,
            animationDuration: 10000,
            itemStyle: {
              color: "#D9FFAD"
            },
            //分隔线样式。
            splitLine: {
              show: false
            },
            progress: {
              show: true,
              width: 5
            },
            axisTick: {
              show: false
            },
            title: {
              show: false
            },
            pointer: {
              show: false
            },
            anchor: {
              show: false
            },
            axisLabel: {
              color: "rgba(255,255,255,0)",
              fontSize: 12
            }, //刻度节点文字颜色
            detail: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 5,
                color: [
                  [
                    0.02,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#D9FFAD"
                      },
                      {
                        offset: 0.5,
                        color: "#D9FFAD"
                      },
                      {
                        offset: 1,
                        color: "#D9FFAD"
                      }
                    ])
                  ],
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "rgba(255,255,255, 0.3)"
                      },
                      {
                        offset: 0.5,
                        color: "rgba(255,255,255, 0.2)"
                      },
                      {
                        offset: 1,
                        color: "rgba(255,255,255, 0.1)"
                      }
                    ])
                  ]
                ]
              }
            },
            data: [
              {
                value: echartsData
              }
            ]
          },
          //刻度尺
          {
            type: "gauge",
            radius: "100%",
            startAngle: 220,
            endAngle: -40,
            z: 2,
            axisTick: {
              show: true,
              lineStyle: {
                color: "#fff",
                width: 1
              },
              length: -8
            }, //刻度样式
            splitLine: {
              show: true,
              lineStyle: {
                color: "#fff",
                width: 1
              },
              length: -8
            }, //分隔线样式
            axisLabel: {
              color: "rgba(255,255,255,0)",
              fontSize: 12
            }, //刻度节点文字颜色
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            label: {
              show: false
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [15, "95%"],
              color: "#fff",
              formatter: function(params) {
                return "kw";
              },
              textStyle: {
                fontSize: 20
              }
            }
          },
          // 外一层圈
          {
            type: "pie",
            radius: "35%",
            startAngle: 220,
            endAngle: -40,
            hoverAnimation: false,
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 1
              }
            ],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#FDE35A"
                    },
                    {
                      offset: 1,
                      color: "#F28930"
                    }
                  ]
                }
              }
            }
          },
          //外二层圈
          {
            type: "pie",
            radius: "40%",
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            z: 0,
            hoverAnimation: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 1
              }
            ],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(253, 227, 90, 0.25)"
                    },
                    {
                      offset: 1,
                      color: "rgba(253, 227, 90, 0)"
                    }
                  ]
                }
              }
            }
          },
          //最外层圈
          {
            type: "pie",
            radius: "45%",
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            z: 0,
            hoverAnimation: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 1
              }
            ],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(253, 227, 90, 0.2)"
                    },
                    {
                      offset: 1,
                      color: "rgba(249, 137, 27, 0)"
                    }
                  ]
                }
              }
            }
          }
        ]
      };

      option && this.myChart.setOption(option);
    }
  }
};
</script>

<style lang="less" scoped>
.guan-components {
  width: 154px;
  height: 169px;
}
</style>
