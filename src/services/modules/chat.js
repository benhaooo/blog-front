import MyRequest from '../request'

export function getListAskprompt() {
    return MyRequest.get({
        url: '/askprompt/list',
    })
}

export function chatCompletions(data) {
    return MyRequest.post({
        url: '/chatCompletions',
        data: data
    })
}