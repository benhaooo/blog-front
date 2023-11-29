<template>
  <div class="article-card-2 block animate__animated animate__fadeIn">
    <router-link :to="`/article/${article.id}`" class="thumbnail-box">
      <img :src="article.thumbnail" alt="" />
    </router-link>
    <div class="article-info">
       <router-link :to="`/article/${article.id}`"><h3 class="title">{{ article.title }}</h3></router-link>
      <div class="meta">
        <time>{{ article.createTime }}</time>
        <div class="category">
          <i class="lable iconfont">&#xe600;</i>
          <router-link :to="`/categories/${article.categoryId}`">{{ article.categoryName }}</router-link>
        </div>
      </div>
      <div class="tagList">
        <i class="iconfont">&#xe66c;</i>
        <router-link
          :to="`/tags/${tag.id}`"
          class="tag"
          v-for="tag in article.tagVOList"
          :key="tag.id"
          >{{ tag.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  article: {},
});
</script>

<style lang="less" scoped>
.article-card-2 {
  width: 360px;
  margin: 20px 30px;
  border-radius: 12px;
  overflow: hidden;
  .thumbnail-box {
    display: block;
    height: 200px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .article-info {
    padding: 20px;
    color: #666;
    .title {
      color: inherit;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      .category{
        .lable{
            margin-right: 4px;
        }
      }
    }
    .tagList {
      margin-top: 10px;
      .tag{
        margin: 0 5px;

      }
    }
  }
}
</style>