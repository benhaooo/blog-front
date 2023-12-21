<template>
  <div class="user-card block">
    <a-layout>
      <a-layout-sider style="bacground-color: #fff; height: 100%">
        <div class="ava center">
          <a-upload
            name="img"
            accept="image/png, image/jpeg"
            :headers="appStore.getHeader()"
            action="http://localhost:9966/user/update/ava"
            :showUploadList="false"
            @change="handleUploadAvatar"
            :beforeUpload="beforeUploadAvatar"
          >
            <a-avatar :size="99" :src="userInfo.avatar">
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
            <a-menu-item key="3"
              ><router-link to="/user/userInfo"
                >个人信息</router-link
              ></a-menu-item
            >
            <a-menu-item key="4"
              ><router-link to="/user/myLike"
                >我的点赞</router-link
              ></a-menu-item
            >
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
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
import useAppStore from "@/stores/modules/app";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const appStore = useAppStore();
const router = useRouter();

onMounted(() => {
  appStore.fetchUserInfo();
});

const { userInfo } = storeToRefs(appStore);

// // 开启loading
const beforeUploadAvatar = () => {
  return new Promise((resolve, reject) => {
    message.loading({ content: "图片上传中" });
    return resolve(true);
  });
};
// 上传成功
const handleUploadAvatar = ({ file }) => {
  if (file.status == "done") {
    userInfo.value.avatar = file.response.data;
    message.destroy();
    message.success("头像上传成功");
  }
};
</script>

<style lang="less" scoped>
.user-card {
  width: 88%;
  margin: 80px auto 40px;
  min-height: 1000px;
  .ava {
    background-color: #ffffff;
    padding: 30px 0;
  }
}
</style>