import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "animate.css";
// import animate from "animate.css";
// import 'animate.css/animate.min.css'
import "@/assets/css/index.css"

const app = createApp(App)

// 屏蔽错误信息
app.config.errorHandler = () => null;
// 屏蔽警告信息
app.config.warnHandler = () => null;

app.use(createPinia())
app.use(router)

app.mount('#app')


router.beforeEach((to, from, next) => {
  NProgress.start();
  // 修改页面中的title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

router.afterEach(() => {
  //手动设置滚轮初始位置
  window.scrollTo({
    top: 0,
    // 瞬间滚动
    behavior: "instant"
  });
  NProgress.done();
});
