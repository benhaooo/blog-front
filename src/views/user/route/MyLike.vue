<template>
  <h1>我的点赞</h1>
  <template v-for="article in articles" :key="article.id">
    <router-link :to="`/article/${article.id}`">
      <a-card :title="article.title" :bordered="false">
      </a-card>
    </router-link>
  </template>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getMyLikeArticles } from "@/services";
import useAppStore from "@/stores/modules/app";
const appStore = useAppStore();
const articles = ref({});

onMounted(() => {
  getMyLikeArticles(appStore.getHeader()).then((res) => {
    articles.value = res.data;
  });
});
</script>


<style lang="less" scoped>
</style>