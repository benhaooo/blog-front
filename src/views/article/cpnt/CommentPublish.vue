<template>
  <!-- 发表评论 -->
  <div class="comment-publish">
    <!-- <div class="avatar"><img :src="appStore?.userInfo.avatar" alt="" /></div> -->
    <div class="right" :class="{ focused }">
      <div class="input">
        <textarea
          @focus="focused = true"
          @blur="focused = false"
          v-model="content"
          :placeholder="
            replyTo
              ? `回复 @${replyTo.senderNickName}`
              : isLogin
              ? '请输入评论!!!'
              : '请先登录!!!'
          "
          :disabled="!isLogin"
        />
        <div class="emoji">
          <V3Emoji @click-emoji="clickEmoji" />
        </div>
      </div>
      <div class="publish">
        <el-button type="primary" @click="publish" :disabled="!isLogin"
          >发布</el-button
        >
      </div>
    </div>
  </div>
</template> 
<script setup>
import { ref, toRefs, onMounted, defineProps, computed } from "vue";
import V3Emoji from "vue3-emoji";
import "vue3-emoji/dist/style.css";
import useAppStore from "@/stores/modules/app";
const appStore = useAppStore();

const props = defineProps({
  replyTo: {},
});
const focused = ref(false);
// 存储输入框的值
const content = ref("");
const isLogin = computed(() => appStore.userInfo);
const clickEmoji = function (emoji) {
  content.value += emoji;
};
// 发布评论事件
const emit = defineEmits(["publish"]);
const publish = function () {
  emit("publish", content.value, props.replyTo);
  content.value = "";
};
</script> 
<style lang="less" scoped>
.comment-publish {
  display: flex;
  .right {
    display: flex;
    flex: 1;
    height: 50px;
    transition: height 0.2s;
    .input {
      position: relative;
      margin-right: 10px;

      textarea {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        padding: 10px 20px;
        border-radius: 10px;
        background-color: #f5f5f5;
        font-size: 14px;
        &:hover {
          background-color: #ffffff;
          border: 1px solid #c9ccd0;
        }
      }
      .emoji {
        // display: none;
        position: absolute;
        right: 5px;
        bottom: 5px;
      }

      flex: 1;
    }
    .publish {
      .el-button {
        background-color: #7fd6f5;
        border: none;
        height: 100%;
        &:hover {
          background-color: #00aeec;
        }
      }
      height: 100%;
    }
  }
  .focused {
    height: 90px;
    .input {
      textarea {
        background-color: #ffffff;
        border: 1px solid #c9ccd0;
      }
      .emoji {
        display: block;
      }
    }
  }
}
</style>