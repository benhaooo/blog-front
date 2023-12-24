<template>
  <div class="chat-container">
    <el-container style="height: 100%">
      <el-aside width="100px"> <ChatNav /> </el-aside>
      <el-main>
        <transition>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import ChatNav from "./cpnt/ChatNav.vue";
import useWebSocket from "@/hooks/websocket";

const handleMessage = (e) => {
  console.log("收到消息:", e);
};

const ws = useWebSocket(handleMessage);
onMounted(() => {});
</script>

<style lang="less" scoped>
.chat-container {
  width: 100vw;
  height: 100vh;
  background-color: #131824;
}
</style>