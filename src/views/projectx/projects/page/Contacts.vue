<template>
  <div class="askprompt-container">
    <div class="askprompt-content">
      <template v-for="(askprompt, index) in askprompts" :key="askprompt.id">
        <div class="askprompt-card">
          <div class="name">{{ askprompt.name }}</div>
          <div class="content-wrapper">
            <div class="content">{{ askprompt.content }}</div>
            <button class="to-use" @click="handelUse(askprompt)">使用-></button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const askprompts = reactive([
  {
    id: 1,
    name: "写作助理",
    content:
      "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected Chinese version of the text and avoid including explanations. Please begin by editing the following text: [文章内容]",
  },
  {
    id: 2,
    name: "写作助理",
    content:
      "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected Chinese version of the text and avoid including explanations. Please begin by editing the following text: [文章内容]",
  },
  {
    id: 3,
    name: "写作助理",
    content:
      "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected Chinese version of the text and avoid including explanations. Please begin by editing the following text: [文章内容]",
  },
  {
    id: 1,
    name: "写作助理",
    content:
      "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected Chinese version of the text and avoid including explanations. Please begin by editing the following text: [文章内容]",
  },
  {
    id: 2,
    name: "写作助理",
    content:
      "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected Chinese version of the text and avoid including explanations. Please begin by editing the following text: [文章内容]",
  },
  {
    id: 3,
    name: "写作助理",
    content:
      "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected Chinese version of the text and avoid including explanations. Please begin by editing the following text: [文章内容]",
  },
]);

const handelUse = (askprompt) => {
  router.push({
    name: "message",
    state: askprompt,
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
        .to-use {
          width: 99px;
          height: 40px;
          background: linear-gradient(to right, #2196f3, #4ffbdf);
          border-radius: 20px;
          margin-top: 10px;
          border: none;
          &:hover {
            box-shadow: 0 0 2px 1px #4ffbdf;
          }
        }
      }
    }
  }
}
</style>
