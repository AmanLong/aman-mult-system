<template>
  <div id="contrainer">
    <div class="head">
      <span class="title">{{ sysName }}</span>

      <el-dropdown @command="handleCommand" class="user">
        <div>
          <el-avatar class="avatar" :size="50" :src="avatar"></el-avatar>
          <div class="name">
            <span>{{ userName }}</span>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- <el-scrollbar style="height: calc(100% - 60px)"> -->
    <div
      v-for="(item, index) in pages"
      :key="index"
      :ref="`card${index}`"
      class="card"
      @click="routerTo(item.componentName, index)"
    >
      <img :src="getSysImg(item.componentName)" />
      <span>{{ item.name }}</span>
    </div>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import GETTER_TYPES from "@/store/getter-types";
import MUTATION_TYPES from "@/store/mutation-types";
import myAnime from "@/mixins/myAnime";
import takePhoto from "@/mixins/takePhoto";
export default {
  mixins: [myAnime, takePhoto],
  data() {
    return {
      sysName: CONFIG.SYS_NAME,
      avatar: CONFIG.SYS_LOGO,

      pages: [
        {
          name: "地球",
          img: require("@/assets/monitor.jpg"),
          componentName: "monitor",
        },
        {
          name: "后台管理",
          img: require("@/assets/backstage.jpg"),
          componentName: "index",
        },
        {
          name: "浙江",
          img: require("@/assets/zhejiang.png"),
          componentName: "zhejiang",
        },
      ],

      _setTimeOut: null,
      clientHeight: `${document.documentElement.clientHeight}`,
      clientWidth: `${document.documentElement.clientWidth}`,
    };
  },
  created() {
    this.initSysImg();
  },
  computed: {
    ...mapGetters([GETTER_TYPES.getSysImg, GETTER_TYPES.getSysImgNum]),
    userName() {
      return this.$store.state.userName;
    },
  },
  methods: {
    ...mapMutations([
      MUTATION_TYPES.changeCardStatus,
      MUTATION_TYPES.addSysImg,
    ]),

    initSysImg() {
      if (this.getSysImgNum == 0) {
        this.pages.forEach((element) => {
          let obj = { name: element.componentName, img: element.img };
          this.addSysImg(obj);
        });
      }
    },

    routerTo(componentName, index) {
      this.MAX(this.$refs[`card${index}`][0]);
      this._setTimeOut = setTimeout(() => {
        this.$router.push({ name: componentName });
      }, 1000);
    },

    handleCommand(command) {
      if (command === "exit") {
        this.$confirm("是否确定退出登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$store.commit("changeLoginStatue", false);
            this.$router.go(0);
          })
          .catch(() => {});
      }
    },
  },
  beforeDestroy() {
    this._setTimeOut = null;
  },
};
</script>

<style lang="scss">
@import "../css/globle.scss";
#contrainer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #153c58;
  padding: 0px;
  overflow: hidden;
  height: 100%;

  .head {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid $base-border-color;
    color: $base-font-white;
    background-color: #153c58;

    .title {
      font-size: 24px;
      font-weight: 500;
      margin-left: 30px;
      line-height: 60px;
    }

    .user {
      float: right;
      margin-right: 20px;
      cursor: pointer;
      .avatar {
        margin-top: 5px;
      }
      .name {
        float: right;
        padding-top: 20px;
        padding-left: 10px;

        span {
          color: $base-font-white;
          font-size: 16px;
        }

        i {
          color: $base-font-white;
        }
      }
    }

    .btClose {
      float: right;
      margin-right: 30px;
      margin-top: 10px;
    }
  }
}

.card {
  width: 150px;
  height: 120px;
  border-radius: 4px;
  border: 1px solid $base-border-color;
  margin-top: 30px;
  margin-left: 30px;
  float: left;
  text-align: center;

  img {
    width: 100%;
    height: 100%;
    margin-bottom: 5%;
  }
}

.card:hover {
  cursor: pointer;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
