<template>
  <div class="topbar" :class="tapbarClass" ref="topbar">
    <header>
      <router-link to="/" class="title">
        <img src="@/assets/imgs/happy.png" alt="" />
        Tuple Blog</router-link
      >
      <!-- 使用 Ant Design Vue 的icon -->
      <div class="nav">
        <a class="nav-i" @click="appStore.showSearchBox = true;"> <search-outlined /> 搜索 </a>
        <router-link to="/" class="nav-i"> <home-filled /> 首页 </router-link>
        <router-link to="/archive" class="nav-i">
          <container-filled /> 归档
        </router-link>
        <router-link to="/category" class="nav-i">
          <book-filled /> 分类
        </router-link>
        <router-link to="/tag" class="nav-i">
          <tags-filled /> 标签
        </router-link>
        <router-link to="/projectx" class="nav-i">
          <api-filled /> 神机百炼
        </router-link>
        <a class="nav-i" @click="appStore.showLoginBox = true" v-if="!appStore.userInfo">
          <setting-filled /> 登录
        </a>
        <template v-else>
          <div class="after-login">
            <img :src="appStore.userInfo.avatar" class="avatar" />
            <ul class="menu">
              <li>
                <router-link to="/user"
                  ><i class="iconfont">&#xe72a;</i>个人中心</router-link
                >
              </li>
              <li @click="handelLogout">
                <i class="iconfont">&#xe647;</i>退出登录
              </li>
            </ul>
          </div>
        </template>
      </div>
    </header>
  </div>
</template>

<script setup>
import {
  HomeFilled,
  BookFilled,
  TagsFilled,
  ContainerFilled,
  SettingFilled,
  LogoutOutlined,
  UserOutlined,
  ApiFilled,
  MessageFilled,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import useScroll from "@/hooks/useScroll";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import {VueCropper} from 'vue-cropper'
import { logout } from "@/services";
import useAppStore from "@/stores/modules/app";
const router = useRouter();

const { scrollTop } = useScroll();

const tapbarClass = ref({
  "nav-hidden": false,
  "nav-bg": false,
});
watch(scrollTop, (newValue, oldValue) => {
  if (newValue - oldValue > 0) {
    //向下滚
    tapbarClass.value = {
      "nav-hidden": true,
      "nav-bg": true,
    };
  } else {
    //向上滚
    tapbarClass.value["nav-hidden"] = false;
    if (scrollTop.value == 0) {
      tapbarClass.value["nav-bg"] = false;
    }
  }
});

const appStore = useAppStore();
const handelLogout = () => {
  const headers = {
    token: localStorage.token,
  };
  logout(headers).then(() => {
    router.replace("/");
    localStorage.clear();
    appStore.userInfo = null;
  });
};
</script>

<style lang="less" scoped>
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: 0.5s;
  z-index: 9;
  //统一设置字体颜色
  //子节点设置继承属性
  color: #eee;
  header {
    height: 60px;
    padding: 10px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 22px;
      color: inherit;
      position: relative;
      img {
        height: 50%;
        margin-right: 10px;
      }
      &::before{
        content: '\e6bb';
        font-family: "iconfont" !important;
        position: absolute;
        height: 80%;
        left: 0;
        right: 0;
        background-color: #39c5bb;
        box-shadow: 0 0 5px #39c5bb;
        border-radius: 10px;
        text-align: center;
        opacity: 0;
        transition: .3s;
      }
      &:hover{
        &::before{
          opacity: 1;
        }
      }
    }

    .nav {
      display: flex;
      // 消除统一宽度的影响
      align-items: flex-start;

      .nav-i {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        color: inherit;
        padding-bottom: 6px;
        margin: 15px 0 0 30px;
        cursor: pointer;

        &:after {
          position: absolute;
          content: "";
          width: 0;
          height: 3px;
          border-radius: 2px;
          left: 50%;
          bottom: 0;
          background-color: #80c8f8;
          transition: 0.5s;
        }
        &:hover {
          &:after {
            width: 100%;
            left: 0;
          }
        }
      }
      .after-login {
        margin-left: 30px;
        position: relative;
        .avatar {
          height: 50px;
          clip-path: circle();
        }

        &::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 0;
          height: 10px;
          width: 100%;
        }
        &:hover {
          .menu {
            display: block;
          }
        }
        .menu {
          display: none;
          position: absolute;
          top: 110%;
          left: -50%;
          background-color: #fff;
          color: #686665;
          font-size: 12px;
          border-radius: 4px;
          transition: 0.2s;
          overflow: hidden;
          animation: submenu 0.3s 0.1s both;
          li {
            display: flex;
            justify-content: center;
            padding: 10px 0;
            width: 100px;
            &:hover {
              background-color: #4bb1f4;
            }
          }
        }

        @keyframes submenu {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
    }
  }
}
.nav-hidden {
  top: -80px;
}
.nav-bg {
  background-color: rgba(255, 255, 255, 0.75);
  color: #4c4948;
}
</style>