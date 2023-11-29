import {
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
        currentPage: 1,
        articleList: [],
        isLoading: false,
        blogInfo: {},
    }),
    actions: {
        async fetchArticleList() {
            this.isLoading = true
            const res = await getArticleList(this.currentPage++)
            this.articleList.push(...res.data.rows)
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
