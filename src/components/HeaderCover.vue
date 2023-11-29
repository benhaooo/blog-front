<template>
  <div class="header-cover">
    <slot> </slot>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.header-cover {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;

  background: url('@/assets/imgs/p2.jpg') center/cover;
}
</style>