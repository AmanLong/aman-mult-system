<template>
  <div class="reac" :style="size">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <path
        :d="all"
        fill="none"
        :stroke-width="reac.lineWidth"
        :stroke="reac.color"
      />
      <path
        :d="leftTop"
        fill="none"
        :stroke-width="reac.hornWidth"
        :stroke="reac.color"
      />
      <path
        :d="rightTop"
        fill="none"
        :stroke-width="reac.hornWidth"
        :stroke="reac.color"
      />
      <path
        :d="rightBottom"
        fill="none"
        :stroke-width="reac.hornWidth"
        :stroke="reac.color"
      />
      <path
        :d="leftBottom"
        fill="none"
        :stroke-width="reac.hornWidth"
        :stroke="reac.color"
      />
    </svg>
  </div>
</template>
<script>
export default {
  name: "reacSvg",
  props: {
    reac: {
      width: 380,
      height: 200,
      lineWidth: 1,
      hornWidth: 4,
      hornLong: 40,
      color: "cyan",
    },
  },
  computed: {
    all() {
      return `M${this.reac.hornWidth / 2} ${this.reac.hornWidth / 2} 
        L${this.reac.hornWidth / 2 + this.reac.width} ${this.reac.hornWidth / 2}
        L${this.reac.hornWidth / 2 + this.reac.width} ${
        this.reac.height + this.reac.hornWidth / 2
      }
        L${this.reac.hornWidth / 2} ${
        this.reac.height + this.reac.hornWidth / 2
      }
        L${this.reac.hornWidth / 2} ${this.reac.hornWidth / 2}
        `;
    },
    leftTop() {
      return `M${this.reac.hornWidth / 2} ${
        this.reac.hornLong + this.reac.hornWidth / 2
      } 
        L${this.reac.hornWidth / 2} ${this.reac.hornWidth / 2} 
        L${this.reac.hornLong + this.reac.hornWidth / 2} ${
        this.reac.hornWidth / 2
      }`;
    },
    rightTop() {
      return `M${
        this.reac.width - this.reac.hornLong + this.reac.hornWidth / 2
      } ${this.reac.hornWidth / 2} 
        L${this.reac.width + this.reac.hornWidth / 2} ${
        this.reac.hornWidth / 2
      } 
        L${this.reac.width + this.reac.hornWidth / 2} ${
        this.reac.hornLong + this.reac.hornWidth / 2
      }`;
    },
    rightBottom() {
      return `M${this.reac.width + this.reac.hornWidth / 2} ${
        this.reac.height - this.reac.hornLong + this.reac.hornWidth / 2
      } 
        L${this.reac.width + this.reac.hornWidth / 2} ${
        this.reac.height + this.reac.hornWidth / 2
      } 
        L${this.reac.width - this.reac.hornLong + this.reac.hornWidth / 2} ${
        this.reac.height + this.reac.hornWidth / 2
      }`;
    },
    leftBottom() {
      return `M${this.reac.hornLong + this.reac.hornWidth / 2} ${
        this.reac.height + this.reac.hornWidth / 2
      } 
        L${this.reac.hornWidth / 2} ${
        this.reac.height + this.reac.hornWidth / 2
      } 
        L${this.reac.hornWidth / 2} ${
        this.reac.height - this.reac.hornLong + this.reac.hornWidth / 2
      }`;
    },
    size() {
      return `width:${this.reac.width + this.reac.hornWidth}px;
        height:${this.reac.height + this.reac.hornWidth}px;
        `;
    },
  },
};
</script>

<style lang="scss" scoped>
.reac {
  position: absolute;
}
</style>
