<template>
  <div class="app" :style="'background-image: url(' + bg + ')'">
    <!-- <img :src="bg"> -->
    <div ref="form" class="form">
      <div class="title">
        <img :src="sysLogo" />
        <div class="sysName">
          <span>{{ sysName }}</span>
        </div>
      </div>
      <div class="context">
        <MyInput :input="userName"></MyInput>
        <MyInput :input="password" @submit="Login()"></MyInput>
        <div class="btns">
          <el-button type="primary" @click="Login()" style="width: 100%"
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/myInput";
import Fetch from "@/fetch/fetch.js";
import { mapMutations } from "vuex";
import MUTATION_TYPES from "@/store/mutation-types";

export default {
  components: {
    MyInput,
  },
  data() {
    return {
      bg: CONFIG.LOGIN_BG,
      sysLogo: CONFIG.SYS_LOGO,
      sysName: CONFIG.SYS_NAME,
      userName: {
        text: "",
        placeholder: "用户名",
      },
      password: {
        text: "",
        placeholder: "密码",
        isPassword: true,
      },
    };
  },
  mounted() {},
  methods: {
    ...mapMutations([MUTATION_TYPES.changeLoginStatus, MUTATION_TYPES.changeUserName]),

    Login() {
      if (this.userName.text == "admin" && this.password.text == "admin") {
        let params = {
          userName: this.userName.text,
          password: this.password.text,
        };
        // Fetch.Login({ params: params }).then((res) => {
        //   console.log(res);
        // });
        this.changeLoginStatus(true);
        this.changeUserName(this.userName.text);
        this.$router.push({ name: "home" });
      } else {
        this.$notify.error({
          title: "登录失败",
          message: "用户名或者密码错误",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;

  .form {
    position: absolute;
    right: 300px;
    bottom: 200px;
    width: 400px;
    height: 300px;
    background-color: rgba(250, 250, 250, 0.2);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .title {
      height: 50px;
      padding-top: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
      img {
        width: 40px;
        height: 40px;
      }
      .sysName {
        margin-left: 5px;
        font-weight: 600;
        font-size: 28px;
        color: #fff;
      }
    }

    .context {
      padding: 20px;
      padding-top: 0px;

      .btns {
        width: 100%;
        margin-top: 25px;
      }
    }
  }
}
</style>






