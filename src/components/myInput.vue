<template>
  <div class="input">
    <el-input
      ref="input"
      v-model="input.text"
      :show-password="input.isPassword"
      clearable
      @focus="focusInput()"
      @blur="blurInput()"
      @keyup.enter.native="onSubmit"
    ></el-input>
    <span ref="placeholder" class="noText" @click="tipClick()">{{
      input.placeholder
    }}</span>
  </div>
</template>

<script>
import anime from "animejs";
export default {
  name: "myInput",
  props: {
    input: {
      text: "",
      placeholder: "",
      isPassword: false,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.input.text != "") {
        this.focusInput();
      }
    },
    focusInput() {
      let placeholder = this.$refs.placeholder;
      anime({
        targets: placeholder,
        translateX: -15,
        translateY: -30,
        color: "#FFF",
        easing: "easeInSine",
        duration: 500,
      });
    },
    blurInput() {
      if (this.input.text != "") return;
      let placeholder = this.$refs.placeholder;
      anime({
        targets: placeholder,
        translateX: 0,
        translateY: 0,
        color: "#bbb",
        easing: "easeInSine",
        duration: 500,
      });
    },
    tipClick() {
      this.$refs.input.focus();
    },
    onSubmit() {
      this.$emit("submit", "");
    },
  },
};
</script>

<style scoped lang="scss">
.input {
  margin-top: 25px;
  position: relative;

  .noText {
    position: absolute;
    left: 15px;
    top: 10px;
    font-size: 14px;
    color: #bbb;
  }
}
</style>