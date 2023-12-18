<template>
  <div class="message" :class="{ self: message.role == 'user' }">
    <div class="user-info" v-if="message.role == 'user'">
      <div class="avater-wrapper">
        <i class="iconfont center edit" @click="handleEditMessage(index)"
          >&#xeabd;</i
        >
        <el-avatar size="small" :src="userInfo.avatar" />
      </div>
      <span class="name">{{ userInfo.nickName }}</span>
    </div>
    <div class="user-info" v-else>
      <div class="avater-wrapper">
        <i class="iconfont center edit" @click="handleEditMessage(index)"
          >&#xeabd;</i
        >
        <el-avatar size="small" src="@/assets/imgs/gpt.png" />
      </div>
      <span class="name">{{ model }}</span>
    </div>
    <div class="content">
      <text-loading v-if="!message.content" />
      <md-editor v-else v-model="message.content" previewOnly />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const props = defineProps({
  message: Object,
  userInfo: Object,
});
const handleEditMessage = () => {};
</script>

<style scoped lang="less">
.message {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .user-info {
    display: flex;
    .avater-wrapper {
      position: relative;
      height: 26px;
      width: 26px;
      clip-path: circle();
      overflow: hidden;
      .edit {
        position: absolute;
        width: 100%;
        height: 100%;
        cursor: pointer;
        color: #363635;
        opacity: 0;
        background-color: rgba(67, 66, 87, 0.535);
        transition: 0.3s;
      }
    }
    .name {
      color: #fff;
      margin: 0 10px;
    }
  }
  .content {
    padding: 0 12px;
    margin-top: 8px;
    background-color: rgb(56, 60, 75);
    color: #fff;
    border-radius: 5px 20px 20px 20px;
    .md-editor {
      --md-color: #fff; /* 修改文本颜色 */
      --md-bk-color: transparent; /* 修改背景颜色 */
    }
  }
  &:hover {
    .user-info {
      .avater-wrapper {
        .edit {
          opacity: 1;
        }
      }
    }
  }
}
.self {
  align-items: flex-end;
  .user-info {
    flex-direction: row-reverse;
  }
  .content {
    background-color: #1d90f5;
    border-radius: 20px 5px 20px 20px;
  }
}
</style>