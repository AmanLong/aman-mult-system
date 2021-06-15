<template>
  <div ref="layout" class="layout">
    <img class="collage" :src="getSysImg('index')" v-show="close" />
    <div v-show="!close" class="container">
      <el-menu
        ref="menu"
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        router
        @select="handleSelect"
        background-color="#153c58"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: 100%"
      >
        <el-menu-item @click="closeLayout">
          <img class="sysLogo" :src="sysLogo" />
          <span slot="title">{{ sysName }}</span>
        </el-menu-item>

        <el-menu-item
          v-for="(item, index) in oneLevelMenu"
          :key="'one' + index"
          :index="item.name"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }} </span>
        </el-menu-item>

        <el-submenu
          v-for="(item, index) in twoLevelMenu"
          :key="'two' + index"
          :index="item.name"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="(childItem, index) in item.children"
            :key="'twoChild' + index"
            :index="childItem.name"
          >
            {{ childItem.title }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="index-container">
        <Head
          @changeNav="changeNav"
          @closeLayout="closeLayout"
          :breakcurmb="breakcurmb"
        ></Head>
        <Tab ref="tab" @changeActiveIndex="changeActiveIndex"></Tab>
      </div>
    </div>
  </div>
</template>

<script>
import myAnime from "@/mixins/myAnime";
import { mapGetters } from "vuex";
import GETTER_TYPES from "@/store/getter-types";
import Head from "./components/Head.vue";
import Tab from "./components/tabs/tab.vue";
export default {
  mixins: [myAnime],
  components: {
    Head,
    Tab,
  },
  data() {
    return {
      close: false,
      _setTimeOut: null,
      isCollapse: false,
      activeIndex: "index",

      sysLogo: CONFIG.SYS_LOGO,
      sysName: CONFIG.SYS_NAME,
      breakcurmb: ["主页"],
    };
  },
  computed: {
    ...mapGetters([GETTER_TYPES.getSysImg, GETTER_TYPES.getMenuList]),

    layout() {
      return this.$router.options.routes.find((i) => i.name === "layout");
    },
    oneLevelMenu() {
      let menu = [];
      this.getMenuList.forEach((element) => {
        if (!element.children) menu.push(element);
      });
      return menu;
    },
    twoLevelMenu() {
      let menu = [];
      this.getMenuList.forEach((element) => {
        if (element.children) menu.push(element);
      });
      return menu;
    },
  },
  mounted() {},
  methods: {
    changeNav(navOpen) {
      this.isCollapse = !navOpen;
    },

    closeLayout() {
      this.close = true;
      this.WINDOW(this.$refs.layout, "index");

      this._setTimeOut = setTimeout(() => {
        this.$router.push({ name: "home" });
      }, 1000);
    },

    changeActiveIndex(index) {
      this.activeIndex = index;
    },

    handleSelect(key, keyPath) {
      this.getBreakcurmb(keyPath);
      let path = "/" + key;
      let router = this.getRouter(path, this.layout.children);
      if (router) this.$refs.tab.addTab(router);
    },

    getRouter(path, routes) {
      for (var i = 0; i < routes.length; i++) {
        if (routes[i].path == path) {
          return routes[i];
        } else {
          if (routes[i].children) {
            return this.getRouter(path, routes[i].children);
          }
        }
      }
    },

    getBreakcurmb(keyPath) {
      this.breakcurmb = [];
      keyPath.forEach((name) => {
        this.breakcurmb.push(this.getMenuTitle(name, this.getMenuList));
      });
    },

    getMenuTitle(name, list) {
      let menu = list.find((item) => item.name == name);
      if (menu) {
        return menu.title;
      } else {
        for (var i = 0; i < list.length; i++) {
          if (list[i].children) {
            return this.getMenuTitle(name, list[i].children);
          }
        }
      }
    },
  },

  beforeDestroy() {
    this._setTimeOut = null;
  },
};
</script>

<style lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<style lang="scss" scoped>
@import "../css/globle.scss";
.layout {
  height: 100%;
  background-color: #f8f8f8;
  .collage {
    width: 100%;
    height: 100%;
  }

  .container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    .nav {
      width: 240px;
      height: 100%;
      background: $menu-backgound-color;
      color: $base-font-white;
      flex: 0 0 auto;
    }

    .index-container {
      height: 100%;
      overflow: hidden;
      flex: 1 1 auto;

      .view {
        background-color: #ffffff;
      }
    }
  }
}

.sysLogo {
  width: 40px;
  height: 40px;
  margin-left: -8px;
  margin-right: 5px;
}
</style>

