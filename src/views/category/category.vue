<template>
  <HeaderCover> 分类 </HeaderCover>
  <div class="container">
    <div class="main-content block">
      <h3 class="category-title">分类 - {{ categoryList.length }}</h3>
      <ul class="category-list">
        <li v-for="category in categoryList" :key="category.id">
          <router-link
            :to="`/categories/${category.id}`"
            class="category-name"
            >{{ category.name }}</router-link
          >
          <span class="category-count">({{ category.articleCount }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import HeaderCover from "@/components/HeaderCover.vue";
import { listAllCategory } from "@/services";
import { onMounted,ref } from "vue";

const categoryList = ref([]);
onMounted(() => {
  listAllCategory().then(({ data }) => {
    categoryList.value = data;
  });
});
</script>

<style lang="less" scoped>
.container {
    margin-bottom: 30px;
  .main-content {
    width: 80%;
    margin: 0 auto;
    padding: 50px;
    .category-title{
        line-height: 30px;
        text-align: center;
        font-size: 24px;
    }
    .category-list {
      li {
        line-height: 40px;
        &::before {
          display: inline-block;
          content: "";
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 3px solid #49b1f5;
          transition: .3s;
        }
        &:hover {
          &::before {
            border-color: #ff7242;
          }
        }

        .category-name {
          margin: 0 6px;
        }
      }
    }
  }
}
</style>