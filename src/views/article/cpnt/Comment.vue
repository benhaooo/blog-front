<template>
  <div class="comment">
    <div class="comment-header">
      <i class="iconfont">&#xe608;</i>
      <h3>评论</h3>
    </div>
    <CommentPublish @publish="publish" />
    <!-- 评论列表 -->
    <div class="comment-list">
      <template
        v-for="(commentRoot, index) in commentList"
        :key="commentRoot.id"
      >
        <div class="comment-item">
          <CommentUnit
            :comment="commentRoot"
            @reply="
              reply(
                index,
                commentRoot.senderId,
                commentRoot.senderNickName,
                commentRoot.id,
                commentRoot.id
              )
            "
          />
          <!-- 子评论 -->
          <CommentUnit
            v-for="commentChild in commentRoot.children"
            :key="commentChild.id"
            :comment="commentChild"
            :rootId="commentRoot.id"
            @reply="
              reply(
                index,
                commentChild.senderId,
                commentChild.senderNickName,
                commentChild.id,
                commentRoot.id
              )
            "
          />
          <CommentPublish
            v-if="commentRoot.showPublish"
            @publish="publish"
            :type="1"
            :replyTo="replyTo"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
import { ref } from "vue";
import CommentUnit from "./CommentUnit.vue";
import CommentPublish from "./CommentPublish.vue";
import useAppStore from "@/stores/modules/app";
const appStore = useAppStore();

import { publishComment, getArticleCommentList } from "@/services";
import { treeSelectProps } from "ant-design-vue/lib/tree-select";

const props = defineProps({
  articleId: 0,
});

// 获取文章评论
const commentList = ref([]);
const getComment = () => {
  getArticleCommentList(props.articleId).then((res) => {
    commentList.value = res.data;
  });
};
getComment();

const replyTo = ref({});

// 点击发送评论
const publish = (content, replyTo) => {
  const data = {
    articleId: props.articleId,
    content: content,
    parentUserId: replyTo?.senderId,
    parentId: replyTo?.id,
    rootId: replyTo?.rootId,
  };
  publishComment(data, appStore.getHeader()).then((res) => {
    message.success(res.message);
    // content = "";
    getComment();
  });
};

// 回复输入框调用
const reply = (index, senderId, senderNickName, id, rootId) => {
  replyTo.value = {
    senderId,
    senderNickName,
    id,
    rootId,
  };
  commentList.value.forEach((comment) => {
    comment.showPublish = false;
  });
  commentList.value[index].showPublish = true;
};
</script>

<style lang="less" scoped>
.comment {
  margin-top: 30px;
  .comment-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    i {
      margin-right: 20px;
      font-size: 24px;
    }
    h3 {
      font-size: 16px;
      font-weight: bolder;
    }
  }
  .comment-list {
    .comment-item {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #eee;
      margin-top: 30px;
      padding: 20px 0;
      .avatar {
        margin-right: 20px;
      }
      .main {
        flex: 1;
        a {
          color: #fb819f;
          font-weight: bold;
          font-size: 16px;
        }
        .content {
          font-size: 14px;
          color: #666;
          margin: 12px 10px 0;
        }
        .date {
          font-size: 12px;
          color: #ccc;
          margin-top: 10px;
        }
      }
      border-bottom: 1px solid #e3e5e7;

      .comment-publish {
        padding-left: 70px;
        margin-top: 30px;
      }
    }
  }
}
</style>