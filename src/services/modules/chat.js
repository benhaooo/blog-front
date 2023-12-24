import MyRequest from '../request'

export function getAskpromptList(current) {
    return MyRequest.get({
        url: '/gpt/askprompt/list',
        params: {
            current
        }
    })
}

export function chatCompletions(data) {
    return MyRequest.post({
        url: '/chatCompletions',
        data: data
    })
}