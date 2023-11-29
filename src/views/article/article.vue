<template>
  <div class="article">
    <HeaderCover>
      <div class="info">
        <h1 class="title">{{ article.title }}</h1>
        <div class="mete-firstline">
          <div class="meta-date">
            <i class="iconfont">&#xe616;</i>
            <span class="lable">发表于</span>
            <time>{{ article.createTime }}</time>
          </div>
          <span class="separator">|</span>
          <div class="meta-categories">
            <i class="iconfont">&#xe600;</i>
            <router-link to="/" class="categoryName">{{
              article.categoryName
            }}</router-link>
          </div>
        </div>
        <div class="meta-secondline">
          <div class="meta-view-count">
            <i class="iconfont">&#xe640;</i>
            <span class="view-count">{{ article.viewCount }}</span>
          </div>
        </div>
      </div>
    </HeaderCover>
    <div class="container">
      <div class="content-card block">
        <!-- 文章内容· -->
        <div class="article-content">
          <md-editor v-model="article.content" previewOnly />
        </div>

        <div class="signature">
          <img src="@/assets/imgs/ava.jpg" alt="" class="profile" />
          <div class="copyright">
            <div class="copyright-author">
              <span class="copyright-meta">文章作者：</span>
              <router-link to="/" class="copyright-info">benhao</router-link>
            </div>
            <div class="copyright-link">
              <span class="copyright-meta">文章链接：</span>
              <span class="copyright-info"
                >http://127.0.0.1:5173/article/762</span
              >
            </div>
            <div class="copyright-notice">
              <span class="copyright-meta">版权声明：</span>
              <span class="copyright-info"
                >本博客所有文章除特别声明外，均采用
                <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                  >BY-NC-SA</a
                >
                许可协议。转载请注明出处！</span
              >
            </div>
          </div>
        </div>
        <div class="like" :class="{ liked: article.isLiked }">
          <svg
            class="icon"
            @click="pointLike"
            @mouseenter="handleMouseEnter"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 219.31 235"
          >
            <title>like</title>
            <path
              ref="likePath"
              d="M42.31,117l49,37V36c0-14.36,9.62-26,21.5-26s21.5,11.64,21.5,26V91l75,26V225h-137l-58-74c-5.54-10.52-4.77-16.48-3-20,2.8-5.57,31-14,31-14h0"
              style="
                fill: none;
                stroke: #000;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 20px;
              "
            />
          </svg>
          <span class="likeCount">{{ article.likeCount }}</span>
        </div>

        <div class="tag-list">
          <i class="iconfont">&#xe86e;</i>
          <template v-for="tag in article.tagList" :key="tag.id">
            <router-link
              :to="`/tag/${tag.id}`"
              class="tag center"
              :style="`background-color: ${tag.color};`"
              >{{ tag.name }}</router-link
            >
          </template>
        </div>

        <Comment :articleId="articleId" />
      </div>
      <ArticleCatalog />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getArticle, putPointLike } from "@/services";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
import HeaderCover from "@/components/HeaderCover.vue";
import Comment from "./cpnt/Comment.vue";
import ArticleCatalog from "@/components/ArticleCatalog.vue";

import useAppStore from "@/stores/modules/app";
const appStore = useAppStore();

const likePath = ref(null);
onMounted(() => {
  likePath.value.style.strokeDasharray = likePath.value.getTotalLength();
  likePath.value.style.strokeDashoffset = "0";

  // let socket = new WebSocket("ws://localhost:9966/ws");
  // socket.onopen = function (event) {
  //   console.log("WebSocket连接已打开");
  //   socket.send("订阅/topic/likes");
  // };
  // socket.onmessage = function (event) {
  //   console.log("收到消息: " + event.data);
  // };
});

const handleMouseEnter = () => {
  clearInterval(likePath.value.timer);
  var strokeDashoffset = likePath.value.getTotalLength();
  var step = (-strokeDashoffset / 500) * 20;
  likePath.value.timer = setInterval(function () {
    if (strokeDashoffset < -step) {
      likePath.value.style.strokeDashoffset = 0;
      clearInterval(likePath.value.timer);
      return;
    }
    strokeDashoffset += step;
    likePath.value.style.strokeDashoffset = strokeDashoffset;
  }, 20);
};

const route = useRoute();
const articleId = route.params.id;
const article = ref({});
const commentList = ref([]);
const isLiked = ref(false);
// 获取文章内容
getArticle(articleId).then((res) => {
  article.value = res.data;
});

// 点赞
const pointLike = () => {
  putPointLike(article.value.id, appStore.getHeader()).then((res) => {
    if (res.code == 20001) {
      article.value.likeCount++;
      article.value.isLiked = true;
      message.success("点赞成功");
    } else if (res.code == 20002) {
      article.value.likeCount--;
      article.value.isLiked = false;
      message.info("取消点赞");
    }
  });
};
</script>


<style lang="less" scoped>
.article {
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .title {
      margin-bottom: 20px;
    }
    .mete-firstline {
      display: flex;
      .lable {
        margin-right: 6px;
      }

      .meta-categories {
        .categoryName {
          color: inherit;
        }
      }
    }
    .separator {
      margin: 0 6px;
    }

    i {
      margin-right: 6px;
    }
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0 50px;
    margin: 40px 0;
    .content-card {
      width: 70%;
      padding: 50px 40px;
      margin-right: 20px;
      .article-content {
      }

      .signature {
        width: 80%;
        margin-top: 40px;
        padding: 20px 30px;
        display: flex;
        border: 1px solid #eee;
        border-radius: 14px;
        &:hover {
          box-shadow: 0 0 8px 0 rgb(232 237 250 / 60%),
            0 2px 4px 0 rgb(232 237 250 / 50%);
        }
        .profile {
          width: 90px;
          clip-path: circle();
        }
        .copyright {
          margin-left: 25px;
          font-size: 14px;
          .copyright-meta {
            color: #19b1f5;
            font-weight: bold;
            line-height: 30px;
          }
        }
      }
      .tag-list {
        margin-top: 40px;
        display: flex;
        align-items: center;
        i {
          font-size: 20px;
        }
        .tag {
          padding: 6px 12px;
          margin: 0 10px;
          border-radius: 8px;
          font-size: 12px;
          color: #fff;
          //         background-color: var(--tag-color);
        }
      }
      .like {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0;
        .icon {
          height: 40px;
          margin-right: 30px;
          cursor: pointer;
        }
        .likeCount {
          font-size: 16px;
          font-weight: bolder;
        }
      }
      .liked {
        .icon {
          path {
            fill: #ed5a65 !important;
          }
        }
        .likeCount {
          color: #19b1f5;
        }
      }
    }
  }
}
</style>