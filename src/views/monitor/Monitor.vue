<template>
  <div class="con" ref="con">
    <img class="img" :src="getSysImg('monitor')" v-show="close" />

    <div
      v-show="!close"
      class="monitor"
    >
      <div class="head">
        <span class="title">
          {{ sysName }}
        </span>

        <headSvgLine
          ref="svgLine"
          class="svgLine"
          :path="head_svg_path"
        ></headSvgLine>

        <div ref="btBack" class="btBack" @click="back()"><span>✕</span></div>
      </div>

      <div ref="contrainer" class="contrainer">
        <reacSvg :reac="reac"></reacSvg>
        <div ref="earth" class="earthDiv"></div>
      </div>
    </div>
  </div>
</template>

<script>
import myAnime from "@/mixins/myAnime";
import { mapGetters } from "vuex";
import GETTER_TYPES from "@/store/getter-types";
import anime from "animejs";
import headSvgLine from "@/components/SvgIcon/headSvgLine";
import reacSvg from "@/components/SvgIcon/reacSvg";

import "echarts-gl";

export default {
  mixins: [myAnime],
  components: {
    headSvgLine,
    reacSvg,
  },
  computed: {
    ...mapGetters([GETTER_TYPES.getSysImg]),

    head_svg_path() {
      return {
        d: this.headSvgPath,
        fill: "none",
        stroke_width: "2",
        stroke: "cyan",
      };
    },

    reac() {
      return {
        width: this.reacWidth,
        height: this.reacHeight,
        lineWidth: 1,
        hornWidth: 4,
        hornLong: 40,
        color: "cyan",
      };
    },
  },
  data() {
    return {
      close: false,
      _setTimeOut: null,

      sysName: CONFIG.SYS_NAME,
      headSvgPath:
        "M0 15 L440 15 L480 35 L520 35 L560 55 L900 55 L940 35 L980 35 L1020 15 L1455 15",

      reacWidth: 100,
      reacHeight: 600,
      ROOT_PATH:
        "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples",
    };
  },
  mounted() {
    // this.svg_font();
    this.svg_line();
    this.refresh_reacSvg();
    this.initEarth();

    window.onresize = () => {
      this.svg_line();
      this.refresh_reacSvg();
      this.initEarth();
    };
  },
  methods: {
    back() {
      this.close = true;
      this.WINDOW(this.$refs.con, "monitor");
      this._setTimeOut = setTimeout(() => {
        this.$router.push({ name: "home" });
      }, 1000);
    },

    svg_font() {
      anime({
        targets: ".title path",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 1500,
        delay: function (el, i) {
          return i * 250;
        },
        direction: "alternate",
        loop: true,
      });
    },

    svg_line() {
      if (!this.$refs.svgLine) return;
      let svgLineWidth =
        this.$refs.svgLine.offsetWidth | this.$refs.svgLine.$el.offsetWidth;
      let nodes = [];
      this.reacWidth = svgLineWidth / 3.33;
      nodes.push(svgLineWidth / 3.33);
      nodes.push(nodes[0] + svgLineWidth / 36);
      nodes.push(nodes[1] + svgLineWidth / 36);
      nodes.push(nodes[2] + svgLineWidth / 36);
      nodes.push(nodes[3] + svgLineWidth / 4);
      nodes.push(nodes[4] + svgLineWidth / 36);
      nodes.push(nodes[5] + svgLineWidth / 36);
      nodes.push(nodes[6] + svgLineWidth / 36);
      nodes.push(svgLineWidth - 40);
      this.headSvgPath = `M0 15 L${nodes[0]} 15 L${nodes[1]} 35 L${nodes[2]} 35 L${nodes[3]} 55 L${nodes[4]} 55 
      L${nodes[5]} 35 L${nodes[6]} 35 L${nodes[7]} 15 L${nodes[8]} 15`;

      this._setTimeOut = setTimeout(() => {
        var path = anime.path(".svgLine path");
        anime({
          targets: ".svgLine .el",
          translateX: path("x"),
          translateY: path("y"),
          rotate: path("angle"),
          easing: "linear",
          duration: svgLineWidth * 3,
          loop: true,
        });
      }, 300);
    },

    refresh_reacSvg() {
      let svgLineWidth =
        this.$refs.svgLine.offsetWidth | this.$refs.svgLine.$el.offsetWidth;
      this.reacWidth = svgLineWidth - 5;

      let leftConHeight = this.$refs.contrainer.offsetHeight;
      this.reacHeight = leftConHeight - 7;
    },

    initEarth() {
      let myChart = this.$echarts.init(this.$refs.earth);
      let option = {
        backgroundColor: "#000",
        globe: {
          baseTexture: this.ROOT_PATH + "/data-gl/asset/earth.jpg",

          shading: "lambert",

          environment: this.ROOT_PATH + "/data-gl/asset/starfield.jpg",

          atmosphere: {
            show: true,
          },

          light: {
            ambient: {
              intensity: 0.1,
            },
            main: {
              intensity: 1.5,
            },
          },
        },
        series: [],
      };
      myChart.setOption(option, true);
    },
  },
  beforeDestroy() {
    this._setTimeOut = null;
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/globle.scss";
.con {
  background-color: #0b5ce7;
  height: 100%;
  width: 100%;
  color: cyan;

  .img {
    width: 100%;
    height: 100%;
  }

  .monitor {
    width: 100%;
    height: 100%;
    position: relative;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: #000;

    .head {
      width: 100%;
      height: 60px;
      color: $base-font-white;
      text-align: center;

      .svgLine {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
      }

      .title {
        width: 300px;
        height: 60px;
        color: cyan;
        font-size: 32px;
      }

      .btBack {
        position: absolute;
        right: 0px;
        top: 14px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        color: #aaa;
        background-color: cyan;
        text-align: center;

        span {
          font-size: 26px;
          font-weight: 600;
        }
      }
      .btBack :hover {
        color: orangered;
      }
    }

    .contrainer {
      width: 100%;
      height: calc(100% - 60px);
      overflow: hidden;
    }

    .earthDiv {
      margin-left: 5px;
      margin-top: 5px;
      height: calc(100% - 12px);
      width: calc(100% - 12px);
    }
  }
}
</style>