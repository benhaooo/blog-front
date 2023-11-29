import MyRequest from '../request'


export function register(data) {
    return MyRequest.post({
        url: "/register",
        data: data
    })
}


export function login(data){
    return MyRequest.post({
        url: "/login",
        data: data
    })
}

export function logout(headers){
    return MyRequest.post({
        url: "/logout",
        headers:headers
    })
}

export function update(data,headers){
    return MyRequest.post({
        url: "/user/update",
        data:data,
        headers:headers,
    })
}


export function getInfo(headers){
    return MyRequest.get({
        url: "/user/info",
        headers:headers,
    })
}

export function getInfoDetail(headers){
    return MyRequest.get({
        url: "/user/info/detail",
        headers:headers,
    })
}

export function updateInfoDetail(data,headers){
    return MyRequest.request({
        method:"put",
        url: "/user/info/detail",
        headers,
        data,
    })
}