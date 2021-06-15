<template>
  <div ref="contrainer" class="contrainer">
    <img class="img" :src="getSysImg('zhejiang')" v-show="close" />
    <el-scrollbar class="scrollbar" v-show="!close">
      <div class="con">
        <div class="block head">
          <div class="title">
            <span>{{ title }}</span>
          </div>

          <el-button
            class="zjClose"
            icon="el-icon-close"
            circle
            type="danger"
            @click="back()"
          ></el-button>
        </div>
        <div class="content">
          <el-row class="row" :gutter="20">
            <el-col :span="12" class="col">
              <div class="block sale">
                <el-row class="row">
                  <el-col :span="12" class="col">
                    <div class="title">
                      <span>{{ saleTitle }}</span>
                    </div>
                    <div class="numCon">
                      <div class="number">
                        <div class="numTitle">
                          <span>目标任务</span>
                        </div>
                        <div class="numDiv">
                          <span class="orangeRed num">{{ goalSale }}</span>
                          <span>万</span>
                        </div>
                      </div>
                      <div class="number">
                        <div class="numTitle">
                          <span>累计玩家</span>
                        </div>
                        <div class="numDiv">
                          <span class="blue num">{{ allSale }}</span>
                          <span>万</span>
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="col">
                    <div class="title">
                      <span>目标完成率</span>
                    </div>
                    <div ref="rate" class="rate"></div>
                  </el-col>
                </el-row>
              </div>

              <div class="block net">
                <div class="title">
                  <span>{{ netTitle }}</span>
                </div>
                <div class="box">
                  <el-row>
                    <el-col :span="8">
                      <div class="grid border_r border_b">
                        <div class="title">
                          <span>上单</span>
                        </div>
                        <div class="context">
                          <span class="num blue">{{ zcs }}</span>
                          <span>万</span>
                        </div>
                      </div>
                      <div class="grid border_r">
                        <div class="title">
                          <span>中单</span>
                        </div>
                        <div class="context">
                          <span class="num blue">{{ dqkjs }}</span>
                          <span>万</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid border_r border_b">
                        <div class="title">
                          <span>ADC</span>
                        </div>
                        <div class="context">
                          <span class="num green">{{ bnxz }}</span>
                          <span>万</span>
                        </div>
                      </div>

                      <div class="grid border_r">
                        <div class="title">
                          <span>打野</span>
                        </div>
                        <div class="context">
                          <span class="num blue">{{ dqkjl }}</span>
                          <span>万</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid border_b">
                        <div class="title">
                          <span>辅助</span>
                        </div>
                        <div class="context">
                          <span class="num orangeRed">{{ bncx }}</span>
                          <span>万</span>
                        </div>
                      </div>

                      <div class="grid">
                        <div class="title">
                          <span>其他</span>
                        </div>
                        <div class="context">
                          <span class="num blue">{{ pjdjxl }}</span>
                          <span>万</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <div class="block lotSale">
                <div class="title">
                  <span>{{ lotSaleTitle }}</span>
                </div>
                <div ref="lotSale" class="bar"></div>
              </div>
            </el-col>
            <el-col :span="12" class="col">
              <div class="block status">
                <div class="title">
                  <span>{{ saleStatus }}</span>
                </div>
                <el-row class="row">
                  <el-col :span="8" class="col">
                    <div class="rect">
                      <div
                        class="titleDiv"
                        :style="
                          'background:url(' +
                          rect +
                          ') no-repeat;background-size:100% 100%;'
                        "
                      >
                        <div class="title1">
                          <span>男性玩家</span>
                        </div>
                      </div>

                      <div class="context">
                        <span class="num blue">{{ computer }}</span>
                        <span>万</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8" class="col">
                    <div class="rect">
                      <div
                        class="titleDiv"
                        :style="
                          'background:url(' +
                          rect +
                          ') no-repeat;background-size:100% 100%;'
                        "
                      >
                        <div class="title1">
                          <span>女性玩家</span>
                        </div>
                      </div>

                      <div class="context">
                        <span class="num blue">{{ ticket }}</span>
                        <span>万</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8" class="col">
                    <div class="rect">
                      <div
                        class="titleDiv"
                        :style="
                          'background:url(' +
                          rect +
                          ') no-repeat;background-size:100% 100%;'
                        "
                      >
                        <div class="title1">
                          <span>其他玩家</span>
                        </div>
                      </div>

                      <div class="context">
                        <span class="num orangeRed">{{ publicNum }}</span>
                        <span>万</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="block games">
                <div class="title">
                  <span>{{ gameTitle }}</span>
                </div>
                <div ref="games" class="pie"></div>
              </div>

              <div class="block lotGame">
                <div class="title">
                  <span>{{ lotGameTitle }}</span>
                </div>
                <div ref="lotGame" class="bar"></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GETTER_TYPES from "@/store/getter-types";
import myAnime from "@/mixins/myAnime";
export default {
  mixins: [myAnime],
  data() {
    return {
      close: false,
      fullScreenFlag: false,

      title: "浙江省LOL玩家统计",
      rect: require("@/assets/rect.png"),

      saleTitle: "目标完成情况",
      goalSale: 500,
      allSale: 400,
      goalRate: 80,

      saleStatus: "玩家类型",
      computer: 376,
      ticket: 24,
      publicNum: 0,

      netTitle: "各位置玩家",
      zcs: 110,
      bnxz: 90,
      bncx: 80,
      dqkjs: 80,
      dqkjl: 40,
      pjdjxl: 0,

      gameTitle: "各位置占比",
      gameData: [
        { value: 110, name: "上单" },
        { value: 90, name: "中单" },
        { value: 80, name: "打野" },
        { value: 80, name: "ADC" },
        { value: 40, name: "辅助" },
      ],

      lotSaleTitle: "各地LOL玩家数量",
      lotSaleAreaData: [
        ["杭州", 60, 55, -0.08],
        ["宁波", 51, 45, -0.12],
        ["温州", 42, 33, -0.21],
        ["嘉兴", 36, 31, -0.14],
        ["湖州", 33, 22, -0.33],
        ["绍兴", 31, 26, -0.16],
        ["金华", 26, 20, -0.23],
        ["义乌", 17, 12, -0.29],
        ["衙州", 13, 16, 0.19],
        ["舟山", 11, 12, 0.02],
        ["台州", 7, 5, -0.12],
        ["丽水", 3, 4, 0.33],
      ],

      lotGameTitle: "各位置玩家数量",
      lotGameData: [
        ["上单", 60, 55, -0.08],
        ["中单", 51, 45, -0.12],
        ["AD", 42, 33, -0.21],
        ["打野", 36, 31, -0.14],
        ["辅助", 33, 32, -0.03],
      ],
    };
  },
  computed: {
    ...mapGetters([GETTER_TYPES.getSysImg, GETTER_TYPES.getMenuList]),
  },
  created() {},
  mounted() {
    this.Init();
  },
  methods: {
    Init() {
      this.getGoalRate();
      this.getLotSale();
      this.getPie();
      this.getLotGame();
    },

    getGoalRate() {
      let myChart = this.$echarts.init(this.$refs.rate);
      let option = {
        series: [
          {
            type: "gauge",
            splitNumber: 5,
            radius: "100%",
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [this.goalRate / 100, "#5B90F9"],
                  [1, "#F0F2F5"],
                ],
                width: 10,
                shadowColor: "#000", //默认透明
                shadowBlur: 0,
              },
            },
            splitLine: {
              length: 15,
              lineStyle: {
                width: 0.3,
                color: "#999",
              },
            },
            axisLabel: {
              color: "#999999",
              fontSize: 12,
              distance: 0,
            },
            axisTick: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              fontSize: 20,
              offsetCenter: [0, "70%"],
              formatter: "{value}%",
            },
            data: [{ value: this.goalRate.toFixed(2) }],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },

    getLotSale() {
      let myChart = this.$echarts.init(this.$refs.lotSale);
      // 绘制图表
      let option = {
        legend: {},
        tooltip: {
          formatter: function (params) {
            var s = "";
            s += params.name + "\n";
            var values = params.value.toString().split(",");
            s += "2020: " + values[1] + " 万人\n";
            s += "2021: " + values[2] + " 万人\n";
            s += "增长率: " + (values[3] * 100).toFixed(2) + "%\n";
            return s;
          },
          extraCssText: "width:120px; white-space:pre-wrap",
        },
        grid: {
          top: 20,
          bottom: 25,
          right: 50,
          x: 45,
          x2: 30,
          y: 80,
        },
        title: {
          text: "单位:万人",
          textStyle: {
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "normal",
            color: "#666",
          },
          x: "right",
          padding: [5, 50],
        },
        dataset: {
          source: this.lotSaleAreaData,
        },
        xAxis: {
          type: "category",
          splitLine: {
            show: false, //去掉网格线
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            splitLine: {
              show: true, //去掉网格线
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
          },
          {
            splitLine: {
              show: false, //去掉网格线
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              interval: "auto",
              formatter: function (value) {
                return value * 100 + "%";
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
            name: "2020",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#78D4F8", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#B0E8FF", // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
            radius: ["50%", "60%"],
          },
          {
            type: "bar",
            name: "2021",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#F6903D", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FFC697", // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
          },
          {
            type: "line",
            name: "增长率",
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#7162FD",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },

    getPie() {
      let myChart = this.$echarts.init(this.$refs.games);
      let option = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "游戏占比",
            type: "pie",
            radius: ["45%", "75%"],
            avoidLabelOverlap: true,
            labelLine: {
              normal: {
                length: 10,
                length2: 70,
              },
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = [
                    "#F6903D",
                    "#5B90F9",
                    "#60DCAA",
                    "#F6BD16",
                    "#7162FD",
                    "#78D4F8",
                    "#9560BC",
                    "#D02090",
                    "#CDB79E",
                    "#1C86EE",
                    "#BF3EFF",
                    "#CD5C5C",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
            data: this.gameData,
            label: {
              formatter: "{b}  {d}%",
              borderWidth: 20,
              borderRadius: 10,
            },
          },
        ],
      };
      myChart.setOption(option, true);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },

    getLotGame() {
      let myChart = this.$echarts.init(this.$refs.lotGame);
      // 绘制图表
      let option = {
        legend: {},
        tooltip: {
          formatter: function (params) {
            var s = "";
            s += params.name + "\n";
            var values = params.value.toString().split(",");
            s += "2020: " + values[1] + " 万人\n";
            s += "2021: " + values[2] + " 万人\n";
            s += "增长率: " + (values[3] * 100).toFixed(2) + "%\n";
            return s;
          },
          extraCssText: "width:120px; white-space:pre-wrap",
        },
        grid: {
          top: 20,
          bottom: 25,
          right: 50,
          x: 45,
          x2: 30,
          y: 80,
        },
        title: {
          text: "单位:万人",
          textStyle: {
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "normal",
            color: "#666",
          },
          x: "right",
          padding: [5, 50],
        },
        dataset: {
          source: this.lotGameData,
        },
        xAxis: {
          type: "category",
          splitLine: {
            show: false, //去掉网格线
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: [
          {
            splitLine: {
              show: true, //去掉网格线
            },
            axisTick: {
              show: false,
            },
          },
          {
            splitLine: {
              show: false, //去掉网格线
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              interval: "auto",
              formatter: function (value) {
                return value * 100 + "%";
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
            name: "2020",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#60DCAA", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#B4EED7", // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
            radius: ["50%", "60%"],
          },
          {
            type: "bar",
            name: "2021",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#5B90F9", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#A5C3FE", // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
          },
          {
            type: "line",
            name: "增长率",
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#F6903D",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },

    back() {
      this.close = true;
      this.WINDOW(this.$refs.contrainer, "zhejiang");

      this._setTimeOut = setTimeout(() => {
        this.$router.push({ name: "home" });
      }, 1000);
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.zjClose {
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: #fff;
  border-color: #fff;
  color: #333;
}
</style>
<style lang="scss" scoped>
.contrainer {
  height: 100%;
  width: 100%;

  .img {
    width: 100%;
    height: 100%;
  }
}
.con {
  margin: 0px;
  color: #333333;
  background-color: #f2f3f5;
  padding: 20px;
  width: calc(100% - 40px);
  overflow: hidden;

  .head {
    height: 64px;
    text-align: center;
    position: relative;
    .title {
      text-align: center;
      font-weight: 600;
      margin-left: 0px;
      margin-top: 0px;
      span {
        font-size: 28px;
      }
    }
  }

  .content {
    width: 100%;
    height: calc(100% - 100px);

    .row {
      height: 100%;

      .col {
        height: 100%;

        .sale {
          height: 260px;
          margin-top: 20px;
          .numCon {
            border-right: 1px solid #eeeeee;
            .number {
              display: flex;
              justify-content: center;
              margin-top: 50px;
              .numTitle {
                font-size: 16px;
                padding-top: 10px;
              }
              .numDiv {
                margin-left: 40px;
                .num {
                  font-size: 28px;
                }
              }
            }
          }
        }

        .rate {
          text-align: center;
          width: 100%;
          height: 160px;
          margin-top: 30px;
        }

        .net {
          height: 260px;
          margin-top: 20px;

          .box {
            padding: 10px;
            padding-left: 40px;
            padding-right: 40px;

            .grid {
              height: 100px;
              width: 100%;

              .title {
                font-size: 16px;
                padding-bottom: 20px;
              }

              .context {
                text-align: center;

                .num {
                  font-size: 28px;
                }
              }
            }
          }
        }

        .lotSale {
          height: 380px;
          margin-top: 20px;
          .bar {
            height: calc(100% - 40px);
          }
        }

        .status {
          height: 200px;
          margin-top: 20px;
          .rect {
            margin: 10px;
            margin-left: 20px;
            height: calc(100% - 60px);
            border: 1px solid #eeeeee;
            .titleDiv {
              margin: 0px;
              height: 32px;
              width: 100%;

              .title1 {
                font-size: 16px;
                height: 100%;
                width: 100%;
                padding-left: 20px;
                padding-top: 8px;
              }
            }

            .context {
              height: calc(100% - 70px);
              text-align: center;
              margin-top: 32px;
              .num {
                font-size: 28px;
              }
            }
          }
        }

        .games {
          height: 320px;
          margin-top: 20px;
          .pie {
            height: calc(100% - 40px);
          }
        }

        .lotGame {
          height: 380px;
          margin-top: 20px;
          .bar {
            height: calc(100% - 40px);
          }
        }
      }
    }
  }
}

.block {
  border-radius: 4px;
  background: #fff;

  .title {
    padding-left: 20px;
    padding-top: 16px;
    text-align: left;
    margin: 0px;
    font-size: 20px;
  }
}

.border_r {
  border-right: 1px solid #eeeeee;
}
.border_b {
  border-bottom: 1px solid #eeeeee;
}

.orangeRed {
  color: #ff6b00;
}
.blue {
  color: #1292ff;
}
.green {
  color: #16be4f;
}

.scrollbar {
  height: calc(100vh - 0px);
  width: calc(100% - 0px);
}
</style>
