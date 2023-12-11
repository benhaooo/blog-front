<template>
  <header-cover>标签</header-cover>
  <div class="container">
    <div class="main-content">
      <!-- <transition-group
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__swing"
        leave-active-class="animate__backOutUp"
      > -->
      <article-card-2
        v-for="article in articleList"
        :key="article.id"
        :article="article"
        v-show="isShow"
      />
      <!-- </transition-group> -->
      <Loader v-show="loading" />
    </div>
  </div>
</template>

<script setup>
import HeaderCover from "@/components/HeaderCover.vue";
import ArticleCard2 from "./cpnt/ArticleCard2.vue";
import Loader from "@/components/loader.vue";
import { getArticleListByCondition } from "@/services";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import useScroll from "@/hooks/useScroll";

const route = useRoute();

const isShow = ref(true);
const condition = {
  current: 1,
  categoryId: route.params.categoryId,
  tagId: route.params.tagId,
};
const loading = ref(false);
const articleList = ref([]);

const fetchArticleListByCondition = () => {
  loading.value = true;
  getArticleListByCondition(condition).then(({ data }) => {
    loading.value = false;
    articleList.value.push(...data.rows);
    condition.current++;
  });
};

onMounted(() => {
  fetchArticleListByCondition();
});

const { isReachBottom } = useScroll();
watch(isReachBottom, (newValue) => {
  if (newValue) {
    fetchArticleListByCondition();
  }
});
</script>

<style lang="less" scoped>
.container {
  .main-content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>