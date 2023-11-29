<template>
  <div class="aside-model" ref="aside_model">
    <div
      class="aside-container"
      :class="{ active: domTop <= 25 || !isReachBottom }"
    >
      <slot> </slot>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import useScroll from "@/hooks/useScroll";
const aside_model = ref(null);
const { isReachBottom, domTop } = useScroll(aside_model);
</script>

<style lang="less" scoped>
.aside-model {
  width: 250px;
  height: 100vh;
  .aside-container {
    width: 250px;
  }
  .active {
    position: fixed;
    top: 25px;
  }
}
</style>