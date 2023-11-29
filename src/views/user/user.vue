<template>
  <div class="user-card block">
    <!-- <h1 class="title">基本信息</h1>
    <div class="user-info">
      <div class="left-wrap">
        <a-upload
          name="img"
          accept="image/png, image/jpeg"
          action="http://localhost:9999/uploadImg"
          :showUploadList="false"
          @change="handleUploadAvatar"
          :beforeUpload="beforeUploadAvatar"
        >
          <img :src="formUserInfo.avatar" />
        </a-upload>
      </div>
      <div class="right-wrap">
        <InputModal2 :text="'昵称'" v-model:value="formUserInfo.nickName" />
        <InputModal2 :text="'个人网站'" v-model:value="formUserInfo.webSite" />
        <InputModal2 :text="'简介'" v-model:value="formUserInfo.intro" />
        <InputModal2 :text="'邮箱'" v-model:value="formUserInfo.email" />

        <a-button type="primary" size="middle" @click="handleUpdateInfo"
          >修改</a-button
        >
      </div>
    </div> -->
    <a-layout>
      <a-layout-sider style="bacground-color: #fff; height: 100%;"> 
        <div class="ava center">
          <a-upload
            name="img"
            accept="image/png, image/jpeg"
            action="http://localhost:9966/uploadImg"
            :showUploadList="false"
            @change="handleUploadAvatar"
            :beforeUpload="beforeUploadAvatar"
          >
            <a-avatar :size="99" :src="formUserInfo.avatar">
              <template #icon><UserOutlined /></template>
            </a-avatar>
          </a-upload>
        </div>

        <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                <span>用户中心</span>
              </span>
            </template>
            <a-menu-item key="3" ><router-link to="/user/userInfo">个人信息</router-link></a-menu-item>
            <a-menu-item key="4"><router-link to="/user/myLike">我的点赞</router-link></a-menu-item>
            <a-menu-item key="5">修改密码</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup>
// import InputModal2 from "@/components/models/InputModal2.vue";
// import HeaderCover from "@/components/HeaderCover.vue";
// import { update } from "@/services";
// // import AvatarCropper from "vue-avatar-cropper";
// import { message } from "ant-design-vue";
// import "ant-design-vue/es/message/style/css";
import useAppStore from "@/stores/modules/app";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const appStore = useAppStore();
const router = useRouter();

onMounted(() => {
  appStore.fetchUserInfo();
});

const formUserInfo = reactive(JSON.parse(JSON.stringify(appStore.userInfo)));

// // 开启loading
// const beforeUploadAvatar = () => {
//   return new Promise((resolve, reject) => {
//     message.loading({ content: "图片上传中" });
//     return resolve(true);
//   });
// };
// // 上传成功
// const handleUploadAvatar = ({ file }) => {
//   if (file.status == "done") {
//     formUserInfo.avatar = file.response.data;
//   }
// };
// const handleUpdateInfo = () => {
//   update(formUserInfo,appStore.getHeader()).then(()=>{
//     message.success('修改成功')
//     router.push('/')
//   })
// };

const selectedKeys = ref("1");
</script>

<style lang="less" scoped>
.user-card {
  width: 88%;
  margin: 80px auto 40px;
  min-height: 1000px;
  .ava{
    background-color: #ffffff;
    padding: 30px 0;
  }
  // .title {
  //   font-size: 20px;
  //   font-weight: bolder;
  // }
  // .user-info {
  //   display: flex;
  //   .left-wrap {
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     width: 200px;
  //     img {
  //       width: 120px;
  //       clip-path: circle();
  //     }
  //   }
  //   .right-wrap {
  //     flex: 1;
  //     padding: 30px;
  //     display: flex;
  //     flex-direction: column;
  //     align-items: center;
  //   }
  // }
}
</style>