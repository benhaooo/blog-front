<template>
  <div class="bottom-bar">
    <div class="web-info">
      <p>© 2022 - 2022 By Benhao</p>
      <a href="#"><i class="iconfont ICPIcon">&#xe64e;</i>桂ICP备202201122号-1</a>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.bottom-bar {
//   position: absolute;
//   bottom: 0;
  width: 100%;
  height: 120px;
  background-image: linear-gradient(135deg, #0396ff 100%, #abdcff 10%);
  .web-info{
    color: #eee;
    font-size: 14px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p{
        // line-height: 14px;
        cursor: pointer;
    }
    .ICPIcon{
        margin-right: 3px;
        color: #036ee9;
    }
  }
}
</style>