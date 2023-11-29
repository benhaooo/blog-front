import axios from 'axios'
import {
  BASE_URL,
  TIMEOUT
}
  from './config'

class MyRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    // //拦截器
    // this.instance.interceptors.request.use(config => {
    //   // 是否需要设置 token
    //   const isToken = (config.headers || {}).isToken === false
    //   if (appStore.getToken() && !isToken) {
    //     config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    //   }
    //   return config
    // }, err => {
    //   return err
    // })

    //   this.instance.interceptors.response.use(res => {
    //     homeStore.isLoading = false
    //     return res
    //   }, err => {
    //     return err
    //   })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({
      ...config,
      method: "get"
    })
  }

  post(config) {
    return this.request({
      ...config,
      method: "post"
    })
  }
}

export default new MyRequest(BASE_URL, TIMEOUT)
