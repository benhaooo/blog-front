
<template>
  <div class="session-list">
    <div
      v-for="(session, index) in sessions"
      :key="session.id"
      class="chat-key"
      :class="{ active: currentSessionId == session.id }"
      @click="selectSession(session.id)"
    >
      <!-- <div class="ava"></div> -->
      <div class="info">
        <div class="name">{{ session.name }}</div>
        <div class="count">{{ session.messages.length }}条对话</div>
      </div>
      <i class="iconfont" @click.stop="deleteSession(index)">&#xe630;</i>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  sessions: Array,
  currentSessionId: String,
});

const emits = defineEmits(["select", "delete"]);

const selectSession = (id) => {
  emits("select", id);
};

const deleteSession = (index) => {
  emits("delete", index);
};
</script>

<style lang="less" scoped>
.session-list {
  .chat-key {
    display: flex;
    width: 250px;
    height: 80px;
    border-radius: 16px;
    background-color: rgb(50, 54, 68);
    cursor: pointer;
    margin: 20px 0;

    position: relative;
    &:hover {
      background-color: #1d90f5;
      transition: 0.3s;
      box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);

      .iconfont {
        display: block;
      }
    }
    .info {
      padding: 10px 20px;
      color: #fff;
      .name {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
      }
    }
    .iconfont {
      position: absolute;
      top: 5px;
      right: 5px;
      display: none;
      &:hover {
        color: #ee3f4d;
      }
    }
  }
  .active {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
  }
}
</style>
