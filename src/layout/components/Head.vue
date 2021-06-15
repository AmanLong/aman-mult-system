<template>
  <div class="head">
    <div class="btNav">
      <i :class="navIcon" @click="changeNav()"></i>
    </div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in breakcurmb" :key="index">{{
          item
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-button
      class="close"
      icon="el-icon-close"
      circle
      type="danger"
      @click="closeLayout()"
    ></el-button>
  </div>
</template>

<script>
export default {
  name: "Head",
  props: {
    breakcurmb: "",
  },
  data() {
    return {
      navOpen: true,
      navIcon: "el-icon-s-fold",
    };
  },
  methods: {
    changeNav() {
      this.navOpen = !this.navOpen;
      this.navIcon = this.navOpen ? "el-icon-s-fold" : "el-icon-s-unfold";
      this.$emit("changeNav", this.navOpen);
    },
    closeLayout() {
      this.$emit("closeLayout", "");
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
@import "../../css/globle.scss";
.head {
  height: 60px;
  background-color: #ffffff;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .btNav {
    float: left;
    margin-left: 10px;
    margin-top: 20px;
    cursor: pointer;
  }

  .breadcrumb {
    float: left;
    margin-left: 20px;
    margin-top: 23px;
  }
}
</style>

<style lang="scss">
.close {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  background-color: #295371;
  border-color: #295371;
}

</style>
