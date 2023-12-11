<template>
  <div
    class="block article-card animate__animated"
    :class="{
      'article-card-thumbnail-reverse': props.reverse,
      animate__fadeInLeft: !props.reverse,
      animate__fadeInRight: props.reverse,
    }"
  >

    <router-link :to="`/article/${article.id}`" class="thumbnail"
      ><img :src="article.thumbnail" alt=""
    /></router-link>
    <div class="article-info">
      <router-link :to="`/article/${article.id}`"
        ><h3 class="title">{{ article.title }}</h3></router-link
      >
      <div class="meta">
        <span class="top" v-if="article.isTop === 1"
          ><i class="iconfont">&#xe620;</i>顶置</span
        >
        |
        <span class="date"
          ><i class="iconfont">&#xe616;</i>发表于{{ article.createTime }}</span
        >
        |
        <span
          ><i class="iconfont">&#xe600;</i
          ><router-link
            :to="`/category/${article.categoryId}`"
            class="classify"
            >{{ article.categoryName }}</router-link
          ></span
        >
        |
        <span class="tag"
          ><i class="iconfont">&#xe66c;</i>
          {{ article.tags[0]?.name }}
        </span>
      </div>

      <p class="pre">
        {{ deleteMDTag(article.content) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import MarkdownIt from "markdown-it";

const props = defineProps({
  article: {},
  reverse: false,
});

// 使用MarkdownIt组件去除markdown标签
const md = new MarkdownIt();
const deleteMDTag = (articleContent) => {
  return (articleContent = md
    .render(articleContent)
    .replace(/<\/?[^>]*>/g, "")
    .replace(/[|]*\n/, "")
    .replace(/&npsp;/gi, ""));
};
</script>

<style lang="less" scoped>
.article-card {
  height: 200px;
  margin-bottom: 30px;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  .thumbnail {
    height: 100%;
    width: 40%;
    // 剪切
    clip-path: polygon(0 0, 80% 0, 100% 100%, 0 100%);
    transition: 0.5s;
    &:hover {
      transform: translateX(-5%);
    }
    img {
      height: 100%;
    }
  }

  .article-info {
    margin: 0 30px;

    .title {
      font-size: 24px;
      font-weight: normal;
      &:hover {
        color: #49b1f5;
      }
    }
    .meta {
      margin: 10px 0;
      font-size: 12px;
      color: #858585;
      span {
        margin: 0 4px;
        i {
          margin-right: 1px;
          color: #333333;
        }
      }
      .classify {
        /* inherit 继承 */
        color: inherit;
        &:hover {
          color: #49b1f5;
        }
      }

      .top {
        color: #ff7242;
        i {
          color: inherit;
        }
      }
    }
    .pre {
      font-size: 14px;
      line-height: 2;
      // 显示两行
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.article-card-thumbnail-reverse {
  flex-direction: row-reverse;
  .thumbnail {
    clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%);
    &:hover {
      transform: translateX(5%);
    }
  }
}
</style>