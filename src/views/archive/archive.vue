<template>
  <header-cover>归档</header-cover>
  <div class="container">
    <div class="main-content block">
      <Timeline>
        <TimelineTitle>文章總覽 - {{ total }}</TimelineTitle>
        <TimelineItem v-for="archive in archiveList" :key="archive.id">
          <div class="archive-box">
            <router-link
              :to="`/article/${archive.id}`"
              class="archive-thumbnail"
              ><img :src="archive.thumbnail" alt=""
            /></router-link>
            <div class="archive-info">
              <time-model :time="archive.createTime" />
              <router-link
                :to="`/article/${archive.id}`"
                class="archive-title"
                >{{ archive.title }}</router-link
              >
            </div>
          </div>
        </TimelineItem>
      </Timeline>

      <a-pagination v-model:current="current" :total="total" @change="pageChange" show-less-items />
    </div>
  </div>
</template>

<script setup>
import HeaderCover from "@/components/HeaderCover.vue";
import TimeModel from "@/components/models/TimeModel.vue";
import { Timeline, TimelineTitle, TimelineItem } from "vue3-timeline";
import "vue3-timeline/dist/style.css";
import { getArticleArchiveList } from "@/services";
import { onMounted, ref } from "vue";
const current = ref(1);
const total=ref(0)
const archiveList = ref([]);

const fetchArchiveList=()=>{
  getArticleArchiveList(current.value).then(({ data }) => {
    total.value=data.total
    archiveList.value = data.rows;
  });
}
onMounted(() => {
  fetchArchiveList()
});

const pageChange=()=>{
  fetchArchiveList()
}
</script>

<style lang="less" scoped>
.container {
  .main-content {
    width: 80%;
    margin: 0 auto;
    padding: 40px 30px;
    .archive-box {
      display: flex;
      .archive-thumbnail {
        width: 80px;
        height: 80px;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          transition: 0.5s;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
      .archive-info {
        padding: 10px 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .archive-title {
          transition: 0.5s;
          &:hover {
            transform: translateX(8px);
          }
        }
      }
    }
  }
}
</style>