<template>
  <div class="comment-unit" :class="{ isChild: isChild }">
    <div class="avatar">
      <img :src="comment.senderAvatar" alt="" />
    </div>
    <div class="main">
      <a href="#">{{ comment.senderNickName }} </a>
      <span class="toComment" v-if="comment.parentId != rootId">
        <i v-if="comment.parentUserNickName" class="iconfont">&#xe602;</i
        ><a href="#">{{ comment.parentUserNickName }}</a>
      </span>

      <div class="content">{{ comment.content }}</div>
      <div class="mate">
        <span class="date">{{ comment.createTime }}</span>
        <span class="reply" @click="reply">回复</span>
      </div>
    </div>
  </div>
</template>

<script setup>
rootIdrootIdrootId;
import { defineProps } from "vue";
const props = defineProps({
  comment: {},
  rootId: Number,
  isChild: false,
});

const emit = defineEmits(["reply"]);
const reply = function () {
  emit("reply");
};
</script>

<style lang="less" scoped>
.comment-unit {
  display: flex;
  .avatar {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      clip-path: circle();
    }
  }

  .main {
    flex: 1;
    a {
      color: #8e8e88;
      font-weight: normal;
      font-size: 14px;
      &:hover {
        color: #fb819f;
      }
      i {
        color: #00aeec;
      }
    }
    .content {
      font-size: 14px;
      // color: #fafafb;
      margin: 12px 10px 0;
    }
    .mate {
      font-size: 12px;
      color: #ccc;
      margin-top: 10px;
      .date {
      }
      .reply {
        margin-left: 10px;
        cursor: pointer;
        &:hover {
          color: #00aeec;
        }
      }
    }
  }
}
.isChild {
  margin-left: 70px;
  .avatar {
    width: 30px;
    height: 30px;
  }
}
</style>