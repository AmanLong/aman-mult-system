<template>
  <div class="con">
    <el-row>
      <el-col
        :span="8"
        v-for="(o, index) in 2"
        :key="o"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import MUTATIONS_TYPES from "@/store/mutation-types";
export default {
  data() {
    return {
      currentDate: new Date(),
      
      menuList: [
        {
          name: "index",
          icon: "el-icon-s-home",
          title: "主页",
        },
        {
          name: "test",
          icon: "el-icon-s-grid",
          title: "测试功能",
          children: [
            {
              name: "formPage",
              title: "表单页",
            },
            {
              name: "tablePage",
              title: "表格页",
            },
            {
              name: "huawei",
              title: "华为",
            },
            {
              name: "photo",
              title: "拍照",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.setMenuList(this.menuList);
  },
  methods: {
    ...mapMutations([MUTATIONS_TYPES.setMenuList]),
  },
};
</script>

<style lang="scss" scoped>
.con {
  height: 100%;
  width: 100%;
  background-color: #fff;
}
</style>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>