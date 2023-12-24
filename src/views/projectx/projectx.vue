<template>
  <div class="projectx-container">
    <div class="projectx-header">
      <img src="@/assets/imgs/tao.jpg" alt="" />
      <h3>神机百炼</h3>
      <div class="scripts">
        <div class="item">
          <span>项目</span>
          <p>一堆杂七杂八的</p>
        </div>
      </div>
    </div>

    <div class="projectx-content">
      <div class="projects">
        <div class="projects-header"></div>
        <router-link to="/projectx/chat">
          <div class="project-item">
            <img
              class="project-item-favicon"
              src="@/assets/imgs/gpt.png"
              alt=""
            />
            <div class="project-item-info">
              <h3 class="title">chatgpt</h3>
              <p class="introduction">精致小巧的个人gpt网站</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.projectx-container {
  padding: 60px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .projectx-header {
    position: relative;
    width: 1200px;
    height: 420px;
    border-radius: 20px;
    overflow: hidden;

    font-weight: bolder;
    color: #fff;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    h3 {
      font-size: 40px;
      position: absolute;
      left: 30px;
      top: 40px;
      color: inherit;
    }

    .scripts {
      position: absolute;
      left: 30px;
      bottom: 60px;
      color: inherit;
      font-weight: bolder;

      .item {
        width: 250px;
        height: 120px;
        border-radius: 20px;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 16px;
        cursor: pointer;
        transition: 0.3s;
        span {
          font-size: 30px;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            width: 20px;
            height: 2px;
            background-color: #fff;
            border-radius: 20px;
            bottom: -2px;
            left: 0;
          }
        }
        p {
          font-size: 18px;
          margin-top: 5px;
        }

        &:hover {
          transform: translateY(-6px);
        }
      }
    }
  }

  .projectx-content {
    width: 100%;
    margin-top: 55px;
    .projects {
      .project-item {
        display: flex;
        align-items: center;
        width: 320px;
        height: 120px;
        background-color: #fff;
        border-radius: 10px;
        cursor: pointer;
        .project-item-favicon {
          width: 60px;
          height: 60px;
          clip-path: circle();
          margin: 0 20px;

          transition: 0.2s;
        }
        .project-item-info {
          flex: 1;
          .title {
            font-weight: bolder;
            font-size: 22px;
            margin-bottom: 4px;
          }
        }

        &:hover {
          .project-item-favicon {
            width: 0;
            height: 0;
          }
          background-color: #f1939c;
        }
      }
    }
  }
}
</style>