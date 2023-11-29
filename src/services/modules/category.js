import MyRequest from '../request'

export function listAllCategory() {
    return MyRequest.get({
        url: '/category/listAll',
    })
}
