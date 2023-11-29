<template>
  <a-modal
    v-model:visible="showSearchBox"
    :footer="null"
    :closable="false"
    :bodyStyle="{ padding: '0' }"
  >
  </a-modal>
</template>

<script setup>
import useAppStore from "@/stores/modules/app";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { showSearchBox } = storeToRefs(appStore);


</script>

<style lang="less" scoped>
</style>