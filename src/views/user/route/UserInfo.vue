<template>
  <div class="user-info">
    <a-modal
      v-model:visible="open"
      width="666px"
      title="个人信息"
      @ok="handleOk"
    >
      <a-form :model="userInfoForm" :colon="false">
        <a-row justify="space-around">
          <a-col :span="10">
            <a-form-item label="昵称">
              <a-input
                v-model:value="userInfoForm.nickName"
                show-count
                :maxlength="10"
              /> </a-form-item
          ></a-col>
          <a-col :span="10"
            ><a-form-item label="姓名">
              <a-input
                v-model:value="userInfoForm.name"
                show-count
                :maxlength="10"
              /> </a-form-item
          ></a-col>
        </a-row>

        <a-form-item label="电话号码">
          <a-input v-model:value="userInfoForm.phone" type="number" />
        </a-form-item>

        <a-row justify="space-around">
          <a-col :span="10">
            <a-form-item label="生日">
              <a-date-picker
                format="YYYY-MM-DD"
                v-model:value="userInfoForm.birthday"
              /> </a-form-item
          ></a-col>
          <a-col :span="10"
            ><a-form-item label="身份">
              <a-select
                ref="select"
                v-model:value="userInfoForm.identity"
                @focus="focus"
                @change="handleChange"
              >
                <a-select-option value="学生">学生</a-select-option>
                <a-select-option value="在职">在职</a-select-option>
                <a-select-option value="无职">无职</a-select-option>
              </a-select>
            </a-form-item></a-col
          >
        </a-row>
        <a-form-item label="学校/公司">
          <a-input v-model:value="userInfoForm.organization" />
        </a-form-item>
        <a-form-item label="专业技能">
          <template v-for="(skill, index) in userInfoForm.skills" :key="index"
            ><a-tag color="processing" closable @close="handleClose(index)">{{
              skill
            }}</a-tag></template
          >
          <a-input
            v-if="inputVisible"
            v-model:value="inputValue"
            type="text"
            size="small"
            :style="{ width: '55px' }"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />

          <a-tag
            v-else
            style="background: #fff; border-style: dashed"
            @click="inputVisible = true"
          >
            <plus-outlined />
            +
          </a-tag>
        </a-form-item>

        <a-form-item label="个人介绍">
          <a-textarea
            v-model:value="userInfoForm.introduction"
            :rows="5"
            show-count
            :maxlength="100"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-descriptions bordered :column="2" title="个人简历">
      <template #extra>
        <a-button type="primary" @click="handleEdit">编辑</a-button>
      </template>
      <a-descriptions-item label="用户名">{{
        userInfoDetail.userName
      }}</a-descriptions-item>
      <a-descriptions-item label="昵称">{{
        userInfoDetail.nickName
      }}</a-descriptions-item>
      <a-descriptions-item label="姓名">{{
        userInfoDetail.name
      }}</a-descriptions-item>
      <a-descriptions-item label="电话号码">{{
        userInfoDetail.phone
      }}</a-descriptions-item>
      <a-descriptions-item label="电子邮箱">{{
        userInfoDetail.email
      }}</a-descriptions-item>
      <a-descriptions-item label="生日">{{
        userInfoDetail.birthday
      }}</a-descriptions-item>
      <a-descriptions-item label="身份">{{
        userInfoDetail.identity
      }}</a-descriptions-item>
      <a-descriptions-item label="学校/公司">{{
        userInfoDetail.organization
      }}</a-descriptions-item>
      <a-descriptions-item label="专业技能">
        <template v-for="(skill, index) in userInfoDetail.skills" :key="index"
          ><a-tag color="processing">{{ skill }}</a-tag></template
        >
      </a-descriptions-item>
    </a-descriptions>
    <a-card
      title="个人介绍"
      :bordered="false"
      style="background-color: #f1939c; border-radius: 10px; margin: 20px"
    >
      {{ userInfoDetail.introduction }}
    </a-card>

    <a-card
      title="项目介绍"
      :bordered="false"
      style="background-color: #d1c2d3; border-radius: 10px; margin: 20px"
    >
    </a-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { storeToRefs } from "pinia";
import useAppStore from "@/stores/modules/app";
import { updateInfoDetail } from "@/services";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
const appStore = useAppStore();
appStore.fetchUserInfoDetail();
const { userInfoDetail } = storeToRefs(appStore);

const open = ref(false);
const userInfoForm = ref({});
const inputVisible = ref(false);
const inputValue = ref("");

// 删除标签
const handleClose = (index) => {
  userInfoForm.value.skills.splice(index, 1);
};

// 添加标签
const handleInputConfirm = () => {
  inputValue.value = inputValue.value.trim();
  if (inputValue.value) userInfoForm.value.skills.push(inputValue.value);
  inputValue.value = "";
  inputVisible.value = false;
};

// 编辑按钮
const handleEdit = () => {
  open.value = true;
  userInfoForm.value = JSON.parse(JSON.stringify(userInfoDetail.value));
};
// 确认修改
const handleOk = () => {
  userInfoForm.value.skills = userInfoForm.value.skills.join("&");
  updateInfoDetail(userInfoForm.value, appStore.getHeader()).then(() => {
    message.success("修改成功");
    appStore.fetchUserInfoDetail();
    open.value = false;
  });
};
</script>

<style lang="less" scoped>
.user-info {
  margin: 20px;
}
</style>