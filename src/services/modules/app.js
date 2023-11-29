import MyRequest from '../request'

export function getBlogInfo() {
    return MyRequest.get({
        url: "/blogInfo/",
    })
}