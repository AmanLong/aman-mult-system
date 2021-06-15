<template>
  <div>
    <div class="imgDiv"><img :src="imgUrl" alt="" v-show="!firstFlag" /></div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clickGeneratePicture">下载海报</el-button>
      <!-- <el-button @click="">下载二维码</el-button> -->
    </span>
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      firstFlag: true,
      imgUrl: "",
    };
  },
  methods: {
    // 保存
    saveFile(data, filename) {
      const save_link = document.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "a"
      );
      save_link.href = data;
      save_link.download = filename;

      const event = document.createEvent("MouseEvents");
      event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      save_link.dispatchEvent(event);
    },
    // 生成图片
    clickGeneratePicture() {
      return html2canvas(document.querySelector("#app")).then((canvas) => {
        // 转成图片，生成图片地址
        this.imgUrl = canvas.toDataURL("image/png");
        this.saveFile(this.imgUrl, new Date().toLocaleString());
        console.log(this.imgUrl);
        this.firstFlag = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.imgDiv {
  width: 400px;
  height: 300px;

  img {
    width: auto;
    height: 100%;
  }
}
</style>