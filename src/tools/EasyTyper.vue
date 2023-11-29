<template>
  <span class="words">{{ obj.output }}</span>
</template>
<script setup>
import { ref } from "vue";
import EasyTyper from "easy-typer-js";
import { onMounted, reactive } from "vue";


onMounted(() => {
  const typed = new EasyTyper(obj, `你要来人间一趟，看一看日出，闻一闻花香。​`,completeAsentence);
});
const istyped = ref(false);
// 输入结束后的回调函数
const completeAsentence = (instance) => {
  fetch("https://v1.hitokoto.cn")
    .then((res) => {
      return res.json();
    })
    .then(({ hitokoto }) => {
      instance=new EasyTyper(obj, hitokoto,completeAsentence);
    });
};

const obj = reactive({
  output: "",
  type: "rollback",
  isEnd: false,
  speed: 300,
  backSpeed: 100,
  singleBack: false,
  sleep: 1000,
  sentencePause: false,
});
</script>


<style lang="less" scoped>
.words {
  height: 40px;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    width: 2px;
    height: 60%;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    background-color: #fff;
    margin-left: 10px;
    animation: blink 0.7s infinite;
  }
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>