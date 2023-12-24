<template>
  <h1>修改密码</h1>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 3 }"
    :wrapper-col="{ span: 6 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item label="旧密码" name="oldPwd">
      <a-input-password v-model:value="formState.oldPwd" />
    </a-form-item>

    <a-form-item label="新密码" name="newPwd">
      <a-input-password v-model:value="formState.newPwd" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">确认</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive } from "vue";
import { changePwd } from "@/services";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
import useAppStore from "@/stores/modules/app";
const appStore = useAppStore();
import { useRouter } from "vue-router";
const router = useRouter();

const formState = reactive({});
const onSubmit = () => {
  if (!formState.newPwd.trim() || !formState.oldPwd.trim()) {
    return;
  }
  if (formState.newPwd != formState.confirmPwd) {
    changePwd(formState, appStore.getHeader())
      .then(() => {
        message.success("修改成功");
        router.push("/");
      })
      .catch(() => {
        message.error("修改失败");
      });
  } else {
    message.info("两次密码不得一致");
  }
};
</script>

<style lang="less" scoped>
</style>