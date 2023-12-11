import {
    getArticleListByCondition,
    getArticleList,
    getBlogInfo
}
    from "@/services";
import {
    defineStore
}
    from "pinia";

const useHomeStore = defineStore("home", {
    state: () => ({
        current: 1,
        articleList: [],
        total: 0,
        isLoading: false,
        blogInfo: {},
    }),
    actions: {
        async fetchArticleList() {
            this.isLoading = true
            const res = await getArticleListByCondition({ current: this.current })
            this.articleList = res.data.rows
            this.total = res.data.total
            this.isLoading = false
        },


        async fetchBlogInfo() {
            getBlogInfo().then(({ data }) => {
                this.blogInfo = data
            })
        },
    },
})

export default useHomeStore
