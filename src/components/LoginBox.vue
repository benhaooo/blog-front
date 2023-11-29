<template>
  <a-modal
    v-model:visible="showLoginBox"
    :footer="null"
    :closable="false"
    :bodyStyle="{ padding: '0' }"
  >
    <div class="login-box">
      <div class="container">
        <div class="left">
          <img src="https://upload.linkstarted.top/cloudfile/anya.jpg" alt="" />
        </div>
        <div class="right">
          <div class="switch">
            <span
              class="login"
              :class="{ active: state.loginTabIndex == 0 }"
              @click="handelSwitchTab(0)"
              >登录</span
            >
            <span>/</span>
            <span
              class="register"
              :class="{ active: state.loginTabIndex == 1 }"
              @click="handelSwitchTab(1)"
              >注册</span
            >
          </div>
          <div class="form">
            <InputModel
              v-model:value="state.formData.username"
              :placeholder="'用户名'"
            />

            <InputModel
              v-model:value="state.formData.email"
              :placeholder="'邮箱'"
              :class="{ hidden: state.loginTabIndex == 0 }"
            />

            <InputModel
              v-model:value="state.formData.password"
              :placeholder="'密码'"
              :type="'password'"
            />
          </div>
          <ButtonModel @click="loginOrRegister">{{
            state.loginTabIndex == 0 ? "登录" : "注册"
          }}</ButtonModel>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { reactive, ref } from "vue";
import ButtonModel from "@/components/models/ButtonModel.vue";
import InputModel from "@/components/models/InputModel.vue";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
import { register, login } from "@/services";
import useAppStore from "@/stores/modules/app";
import { storeToRefs } from "pinia";
const appStore = useAppStore();
const { showLoginBox } = storeToRefs(appStore);

const state = reactive({
  loginTabIndex: 0,
  formData: {
    username: "",
    email: "",
    password: "",
  },
});
const handelSwitchTab = (index) => {
  state.loginTabIndex = index;
  state.formData = {
    username: "",
    email: "",
    password: "",
  };
};
const loginOrRegister = () => {
  if (state.loginTabIndex == 0) {
    let loginData = {
      username: state.formData.username,
      password: state.formData.password,
    };
    //登录
    login(loginData).then((res) => {
      message.success(res.msg);
      appStore.setToken(res.data.accessToken)
      appStore.userInfo = res.data.userInfo;
      appStore.showLoginBox = false;
    });
  } else {
    //注册
    register(state.formData).then((res) => {
      message.success(res.msg);
      state.loginTabIndex = 0;
    });
  }
};
</script>

<style lang="less" scoped>
.login-box {
  .container {
    display: flex;
    .left {
      img {
        height: 400px;
      }
    }
    .right {
      width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      .switch {
        color: #ccc;
        font-size: 16px;
        .active {
          color: rgb(181, 154, 254);
          font-size: 20px;
        }
      }
      .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        .input {
          margin: 10px 0;
          transition: 0.4s;
        }
        .hidden {
          height: 0;
          opacity: 0;
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}
</style>