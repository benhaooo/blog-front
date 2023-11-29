import MyRequest from '../request'

export function getArticleList(pageNum) {
    return MyRequest.get({
        url: '/article/articleList',
        params: {
            pageNum: pageNum
        }
    })
}
