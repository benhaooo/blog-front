import { defineStore } from "pinia";
import { getInfo, getBlogInfo, getInfoDetail } from "@/services";

const useAppStore = defineStore("app", {
    state: () => ({
        showLoginBox: false,

        showSearchBox: false,

        token: "",

        userInfo: null,

        userInfoDetail: null,

    }),

    actions: {
        getToken() {
            return this.token || localStorage.getItem("token") || "";
        },
        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        delToken() {
            this.token = "";
            localStorage.removeItem("token");
        },
        getHeader() {
            return {
                "accessToken": this.getToken()
            }
        },
        async fetchUserInfo() {
            const res = await getInfo(this.getHeader())
            this.userInfo = res.data

        },
        async fetchUserInfoDetail() {
            const res = await getInfoDetail(this.getHeader())
            this.userInfoDetail = res.data
            this.userInfoDetail.skills = this.userInfoDetail.skills
                ? this.userInfoDetail.skills.split("&")
                : []; //避免出现为空的节点
        },

    }
})

export default useAppStore