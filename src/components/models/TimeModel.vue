<template>
  <time><i class="iconfont time-lable">&#xe616;</i><span>{{props.time}}</span></time>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  time: "",
});
</script>

<style lang="less" scoped>
    time{
        color: #858585;
        .time-lable{
            margin-right: 6px;
        }
    }
</style>