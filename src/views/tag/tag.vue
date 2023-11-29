<template>
  <header-cover>
    <h3 class="headeline">标题</h3>
  </header-cover>
  <div class="container">
    <div class="main-content block">
      <p class="title">标签-{{ tagList.length }}</p>
      <div class="tag-list">
        <template v-for="tag in tagList" :key="tag.id">
          <router-link
            :to="`/tags/${tag.id}`"
            :style="`font-size:${randomFontSize()}px;color:${randomColor()};`"
            class="tag"
            >{{ tag.name }}</router-link
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderCover from "@/components/HeaderCover.vue";
import { listAllTag } from "@/services";
import { onMounted, reactive } from "vue";

const tagList = reactive([]);
onMounted(() => {
  listAllTag().then((res) => {
    tagList.push(...res.data);
  });
});

const randomFontSize = () => {
  return Math.floor(Math.random() * 16 + 20);
};
const randomColor = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};
</script>

<style lang="less" scoped>

.container {
  margin-bottom: 40px;
  .main-content {
    width: 80%;
    margin: 0 auto;
    padding: 40px;
    .title{
      text-align: center;
    }
    .tag-list {
      .tag {
        display:inline-block;
        margin: 0 10px;
        transition: 0.3s;
        &:hover {
          transform: scale(1.1);
          color: #49b1f5 !important;
        }
      }
    }
  }
}
</style>