<script setup>
import TopBar from "@/layouts/TopBar.vue";
import BottomBar from "@/layouts/BottomBar.vue";
import LoginBox from "@/components/LoginBox.vue";
import SearchBox from "@/components/SearchBox.vue";
import { onMounted } from "vue";
import useAppStore from "@/stores/modules/app";
const appStore = useAppStore();

// 自动登录
onMounted(() => {
  appStore.fetchUserInfo();
});
</script>

<template>
  <TopBar />
  <router-view></router-view>
  <BottomBar />
  <LoginBox />
  <SearchBox />
</template>

<style scoped>
</style>
