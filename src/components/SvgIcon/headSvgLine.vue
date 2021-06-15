<template>
  <div class="svgLine">
    <div class="el"></div>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <path
        :d="path.d"
        :fill="path.fill"
        :stroke-width="path.stroke_width"
        :stroke="path.stroke"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "headSvgLine",
  props: {
    path: {
      d: "",
      fill: "",
      stroke_width: "",
      stroke: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.svgLine {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;

  .el {
    position: absolute;
    left: -5px;
    top: -5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: cyan;
    box-shadow: 0 0 15px;
  }
}
</style>