import {
    onMounted,
    onUnmounted,
    ref,
}
    from "vue";

import {
    getScrollHeight,
    getScrollTop,
    getWindowHeight,
}
    from "@/utils/scrollUtil";
import {
    throttle
}
    from 'underscore'

export default function useScroll(dom) {
    const isReachBottom = ref(false)
    const scrollTop = ref(0)
    const windowHeight = ref(0)
    const scrollHeight = ref(0)
    const domTop = ref(0)
    const scrollListenerHandle = throttle((e) => {
        scrollTop.value = getScrollTop()
        windowHeight.value = getWindowHeight()
        scrollHeight.value = getScrollHeight()
        if (dom) {
            domTop.value=dom.value.getBoundingClientRect().top
        }
        isReachBottom.value = (scrollTop.value + windowHeight.value >= scrollHeight.value)
    }, 100)

    // 滚轮的监听
    onMounted(() => {
        window.addEventListener("scroll", scrollListenerHandle);
    });
    onUnmounted(() => {
        window.removeEventListener("scroll", scrollListenerHandle);
    });

    return { isReachBottom, scrollTop, scrollHeight, windowHeight, domTop }
}

