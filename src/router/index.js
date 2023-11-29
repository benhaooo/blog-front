import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('@/views/archive/archive.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/category/category.vue')
    },
    {
      path: '/tag',
      name: 'tag',
      component: () => import('@/views/tag/tag.vue')
    },
    {
      path: '/projectx',
      name: 'projectx',
      component: () => import('@/views/projectx/projectx.vue')
    },

    {
      path: '/projectx/matrixn',
      name: 'matrixn',
      component: () => import('@/views/projectx/projects/MatrixN.vue')
    },

    {
      path: '/article/:id',
      name: 'article',
      component: () => import('@/views/article/article.vue')
    },
    {
      path: '/categories/:categoryId',
      name: 'categories',
      component: () => import('@/views/article/ArticleList.vue')
    },
    {
      path: '/tags/:tagId',
      name: 'tags',
      component: () => import('@/views/article/ArticleList.vue')
    },
    {
      path: '/user',
      name: 'user',
      redirect:"/user/userInfo",
      component: () => import('@/views/user/user.vue'),
      children: [
        {
          path: '/user/userInfo',
          name: 'userInfo',
          component: () => import('@/views/user/route/UserInfo.vue'),
        },
        {
          path: '/user/myLike',
          name: 'myLike',
          component: () => import('@/views/user/route/MyLike.vue'),
        },
        {
          path: '/user/changePwd',
          name: 'changePwd',
          component: () => import('@/views/user/route/ChangePwd.vue'),
        },
      ]
    },

  ]
})

export default router
