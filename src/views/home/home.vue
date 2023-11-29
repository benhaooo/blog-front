<template>
  <HomeCover></HomeCover>
  <div class="container">
    <div class="article-list">
      <template v-for="(item, index) in articleList" :key="item.id">
        <ArticleCard :article="item" :reverse="index % 2 == 1" />
      </template>
      <Loader v-if="homeStore.isLoading" />
    </div>

    <div class="aside-content">
      <div class="aside-wrap">
        <div class="author-card block">
          <div class="author-info">
            <div class="avatar">
              <img src="@/assets/imgs/ava.jpg" alt="" />
            </div>
            <h3 class="name">BenHao</h3>
            <p class="description">hello world!!!</p>
          </div>
          <div class="site-info">
            <router-link to="/">
              <div class="obj">文章</div>
              <div class="num">{{ blogInfo.articleCount }}</div>
            </router-link>
            <router-link to="/">
              <div class="obj">标签</div>
              <div class="num">{{ blogInfo.tagCount }}</div>
            </router-link>
            <router-link to="/">
              <div class="obj">分类</div>
              <div class="num">{{ blogInfo.categoryCount }}</div>
            </router-link>
          </div>
          <div class="link">
            <a href="#" class="github">
              <i class="iconfont">&#xe885;</i>
              Github
            </a>
            <div class="others"></div>
          </div>
        </div>

        <div class="announcement-card block">
          <div class="headline">
            <i class="iconfont">&#xe601;</i>
            公告
          </div>
          <p class="text">
            抱歉刚刚腾不出手，但现在我不禁想问大家一个问题，如果我们人类的欲望只是生理上的激素而已，那我们的未来将何去何从。在这里我不禁想问，宇宙的奥秘是什么呢︖人活着的意义又是什么呢︖是什么促使我们存在于这个宇宙层面上呢？
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { storeToRefs } from "pinia";
import useHomeStore from "@/stores/modules/home";

import HomeCover from "./cpnt/HomeCover.vue";
import ArticleCard from "./cpnt/ArticleCard.vue";
import Loader from "@/components/loader.vue";
import useScroll from "@/hooks/useScroll";

const homeStore = useHomeStore();
homeStore.fetchArticleList();
homeStore.fetchBlogInfo();

const { articleList, blogInfo } = storeToRefs(homeStore);

const { isReachBottom } = useScroll();

watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchArticleList().then(() => {
      isReachBottom.value = false;
    });
  }
});
</script>

<style lang="less" scoped>
.container {
  background-color: #ffffff;
  width: 90%;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  .article-list {
    flex: 1;
    margin-right: 20px;
  }

  .aside-content {
    .aside-wrap {
      position: sticky;
      top: 25px;
      width: 250px;
      .author-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        margin-bottom: 30px;


        // 背景颜色
        background: linear-gradient(
          -45deg,
          #e8d8b9,
          #eccec5,
          #a3e9eb,
          #bdbdf0,
          #eec1ea
        );
        background-size: 400% 400%;
        animation: gradientBG 10s ease infinite;
        // 背景位置移动
        @keyframes gradientBG {
          0% {
            background-position: 0 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0 50%;
          }
        }
        .author-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          .avatar {
            width: 120px;
            border-radius: 50%;
            overflow: hidden;
            transition: 0.5s;
            img {
              width: 100%;
            }
            &:hover {
              transform: rotate(360deg);
            }
          }
          .name {
            margin-top: 30px;
          }
          .description {
            font-size: 14px;
            margin: 6px 0;
          }
        }
        .site-info {
          display: flex;
          justify-content: space-evenly;
          margin: 20px 0;
          a {
            margin: 0 10px;
            text-align: center;
            &:hover {
              color: #49b1f5;
            }

            .obj {
              font-size: 14px;
              font-weight: 200;
            }
            .num {
              font-size: 18px;
            }
          }
        }

        .link {
          .github {
            display: block;
            width: 200px;
            height: 34px;
            border-radius: 12px;
            background-color: #49b1f5;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.1s;
            &:hover {
              background-color: #ff7242;
            }
            i {
              margin-right: 5px;
            }
          }
        }
      }

      .announcement-card {
        padding: 30px;
        .headline {
          i {
            display: inline-block;
            color: #ff0000;
            animation: shake 1s infinite;
          }

          @keyframes shake {
            0%,
            100% {
              transform: rotate(0deg);
            }
            40% {
              transform: rotate(-30deg);
            }
            45% {
              transform: rotate(30deg);
            }
            50% {
              transform: rotate(-20deg);
            }
            55% {
              transform: rotate(20deg);
            }
            60% {
              transform: rotate(-10deg);
            }
            65% {
              transform: rotate(10deg);
            }
          }
        }
        .text {
          font-size: 14px;
          line-height: 1.8;
        }
      }
    }
  }
}
</style>