<template>
  <div class="tab">
    <el-dropdown @command="closeTab" class="func">
      <span>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-menu"
          class="btn"
          circle
        ></el-button>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="关闭其他">关闭其他</el-dropdown-item>
        <el-dropdown-item command="关闭全部">关闭全部</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-tabs
      :value="currentTabIndex"
      @input="$tab.showTab"
      type="card"
      @tab-remove="$tab.close"
      class="el_tab"
    >
      <el-tab-pane
        v-for="(item, index) in openedTabs"
        :key="index"
        :label="item.title"
        :name="item.menuId"
        :closable="item.close"
        class="el_tab_pane"
      >
        <el-scrollbar class="scrollbar">
          <div class="content">
            <component
              :is="item.components[item.components.length - 1].path"
              v-if="item.components.length"
            ></component>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import ms from "./MainStore";
export default {
  data() {
    return {
      pre_tabPath: "",
    };
  },
  created() {
    this.changeActiveIndex(this.currentTabIndex);
    this.$tab.reShow(this);
    this.listenHistory();
  },
  computed: {
    openedTabs() {
      return this.$store.getters.GetOpenedTabs;
    },
    currentTabIndex() {
      return this.$store.getters.GetCurrentTabIndex;
    },
  },
  methods: {
    addTab(router) {
      let tab = {
        title: router.title,
        close: true,
        component: router.name,
        menuId: router.name,
      };
      this.$tab.open(tab);
    },
    listenHistory() {
      window.addEventListener("hashchange", (e) => {
        let url = location.href;
        let indexOfSharp = url.indexOf("#");
        if (indexOfSharp > 0) {
          let hash = url.substr(indexOfSharp + 1);
          let tab = ms.state.openedTabs.find((i) => "/" + i.menuId === hash);
          this.changeActiveIndex(tab.menuId);
          if (tab.fromHistory) return;
          tab.fromHistory = true;
          this.$tab.open(tab);
        }
      });
    },

    changeActiveIndex(index) {
      this.$emit("changeActiveIndex", index);
    },

    closeTab(command) {
      if (command == "关闭其他") {
        this.$tab.closeOthers();
      } else if (command == "关闭全部") {
        this.$tab.closeAll();
        this.changeActiveIndex(this.currentTabIndex);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tab {
  margin-top: 10px;
  height: 100%;

  .func {
    float: right;
    margin-top: 4px;
    margin-right: 14px;
    z-index: 2;
  }

  .content {
    height: 100%;
    width: calc(100% - 20px);
    margin-right: 10px;
    margin-left: 10px;
  }
}
</style>

<style lang="scss">
.el_tab {
  width: 100%;
  background-color: #fff;
  // font-size: 12px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  width: calc(100% - 20px);
  //  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.el_tab_pane {
  margin-left: 5px;
}

.scrollbar {
  height: calc(100vh - 135px);
}

.el-tabs__nav-scroll {
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.el-tabs__item {
  padding: 0 20px;
  height: 40px;
  // box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  // color: #303133;
  color: #eeeeee;
  position: relative;
  background-color: #295371;
}

.el-tabs__item.is-active {
  color: #409eff;
  // color: #303133;
  background-color: #ffffff;
}

.btn {
  background-color: #295371;
  border-color: #295371;
}
</style>