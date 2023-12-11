<template>
  <div class="chat-nav-container">
    <div class="menu-list center">
      <template v-for="(item, index) in menuList" :key="index">
        <div class="menu center" :class="{ selected: current === index }">
          <i class="iconfont" :class="item" @click="handleClick(index)"></i>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const menuList = ["icon-xinxi", "icon-haoyou", "icon-shezhi"];
const current = ref(0);

const handleClick = (index) => {
  switch (index) {
    case 0:
      router.push("/projectx/chat/message");
      break;
    case 1:
      router.push("/projectx/chat/contacts");
      break;
    case 2:
      router.push("/projectx/chat/setting");
      break;
  }
  current.value = index;
};
</script>

<style lang="less" scoped>
.chat-nav-container {
  height: 100%;
  .menu-list {
    flex-direction: column;
    width: 100%;
    height: 100%;

    .menu {
      width: 100%;
      position: relative;
      cursor: pointer;
      margin: 20px 0;
      .iconfont {
        font-size: 24px;
        color: #999;
      }
      &:hover {
        .iconfont {
          color: #93b5cf;
        }
      }
      &::before {
        content: "";
        position: absolute;
        width: 6px;
        height: 60%;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        transition: 0.3s;
        border-radius: 3px;
        background-color: #2983bb !important;
        opacity: 0;
      }
    }

    .selected {
      .iconfont {
        color: #2983bb !important;
      }
      &::before {
        opacity: 1;
      }
    }
  }
}
</style>