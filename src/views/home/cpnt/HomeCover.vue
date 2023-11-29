<template>
  <div class="home-cover" ref="home_cover">
    <div class="container">
      <h1 class="title">🥵 Tuple Blog</h1>
      <!-- <p class="words">你要来人间一趟，看一看日出，闻一闻花香</p> -->
      <!-- 打字效果,easytyper实现 -->
      <EasyTyper />
    </div>
    <i class="iconfont down-arrow" @click="scrollToContent">&#xe62d;</i>
  </div>
</template>

<script setup>
import { ref } from "vue";
import EasyTyper from "@/tools/EasyTyper.vue";

const home_cover = ref(null);
const scrollToContent = function () {
  window.scrollTo({
    top: home_cover.value.scrollHeight,
    behavior: "smooth",
  });
};
</script>

<style lang="less" scoped>
.home-cover {
  position: relative;
  height: 100vh;
  background: url("@/assets/imgs/home.webp") center/cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .container {
    // 不然只占了一半,原因未知
    // 把宽度撑起来，然后再居中
    width: 50%;
    // 覆盖父元素align-items的值，单独设置位置
    align-self: start;
    font-size: 24px;
    color: #fff;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      margin-bottom: 12px;
    }
  }

  .down-arrow {
    position: absolute;
    bottom: 10%;
    font-size: 26px;
    font-weight: bolder;
    color: #7a7c7d;
    cursor: pointer;
    animation: bounce 4s infinite;
    &:hover {
      color: #fff;
    }
  }
  @keyframes bounce {
    0%,
    10%,
    25%,
    40% {
      transform: translateY(0);
    }

    20% {
      transform: translateY(-14px);
    }

    30% {
      transform: translateY(-7px);
    }
  }
}
</style>