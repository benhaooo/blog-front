<template>
  <div class="askprompt-container">
    <div class="askprompt-content">
      <template v-for="askprompt in askprompts" :key="askprompt.id">
        <div class="askprompt-card">
          <div class="name">{{ askprompt.name }}</div>
          <div class="content-wrapper">
            <div class="content">{{ askprompt.content }}</div>
            <button class="to-use" @click="handelUse(askprompt)">使用-></button>
          </div>
        </div>
      </template>
    </div>
    <a-pagination
      v-model:current="current"
      :total="total"
      @change="pageChange"
      show-less-items
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import useSessionsStore from "@/stores/modules/chat";
const sessionsStore = useSessionsStore();
import { getAskpromptList } from "@/services";

const askprompts = ref([]);
const current = ref(1);
const total = ref(0);

onMounted(() => {
  getList();
});

const handelUse = (askprompt) => {
  sessionsStore.askprompt = askprompt;
  router.push({
    name: "message",
  });
};
const pageChange = () => {
  console.log("###");
  getList();
};
const getList = () => {
  getAskpromptList(current.value).then(({ data }) => {
    askprompts.value = data.rows;
    total.value = data.total;
  });
};
</script>

<style lang="less" scoped>
.askprompt-container {
  width: 80%;
  margin: 0 auto;

  .askprompt-content {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;

    .askprompt-card {
      position: relative;
      width: 266px;
      height: 360px;
      overflow: hidden;
      color: #fff;
      background-color: #2e2f3a;
      padding: 20px;
      border-radius: 16px;
      margin: 20px 0;
      .name {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        .to-use {
          position: absolute;
          width: 99px;
          height: 40px;
          background: linear-gradient(to right, #2196f3, #4ffbdf);
          border-radius: 20px;
          border: none;
          opacity: 0;
          bottom: 10px;
          transition: 0.5s ease;
          &:hover {
            box-shadow: 0 0 2px 1px #4ffbdf;
          }
        }
      }
      &:hover {
        .to-use {
          bottom: 20px;
          opacity: 1;
        }
      }
    }
  }
}
</style>
