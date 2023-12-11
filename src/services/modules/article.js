import MyRequest from '../request'

export function getArticle(id) {
    return MyRequest.get({
        url: `/article/${id}`,
    })
}

export function getArticleListByCondition(condition) {
    return MyRequest.get({
        url: '/article/list/condition',
        params: condition
    })
}
export function getArticleCommentList(article_id) {
    return MyRequest.get({
        url: `/comment/list/${article_id}`,
    })
}

// 发布评论
export function publishComment(data, headers) {
    return MyRequest.post({
        url: "/comment/publish",
        data: data,
        headers: headers,
    })
}
export function getArticleArchiveList(current) {
    return MyRequest.get({
        url: "/article/list/archive",
        params: {
            current
        }
    })
}

export function putPointLike(id,headers) {
    return MyRequest.request({
        method:"put",
        url: `/article/like/${id}`,
        headers
    })
}