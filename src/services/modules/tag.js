import MyRequest from '../request'

export function listAllTag() {
    return MyRequest.get({
        url: '/tag/listAll',
    })
}
