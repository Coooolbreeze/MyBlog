import axios from 'axios'
import token from './token'
import notify from '../components/notification/function'
import NProgress from 'nprogress'
const apiConfig = require('../../config').api

const baseRequest = axios.create({
  baseURL: apiConfig.baseURL
})

export default class Request {
  constructor () {
    this.baseRequestUrl = apiConfig.baseURL
    this.token = token
  }

  get (url, data) {
    return this.request('GET', url, data)
  }

  post (url, data) {
    return this.request('POST', url, data)
  }

  put (url, data) {
    return this.request('PUT', url, data)
  }

  delete (url, data) {
    return this.request('DELETE', url, data)
  }

  request (method, url, data, onRefresh = false) {
    if (!data || !data.noLoad) {
      NProgress.start()
    }
    return baseRequest({
      headers: { token: this.token.get() },
      url,
      method,
      data,
      params: data
    })
      .then(res => {
        NProgress.done()
        if (res) return res.data.data
        else notify({ content: '删除成功' })
      })
      .catch(err => {
        NProgress.done()
        const resp = err.response
        if (resp.status === 401) {
          this.token.refresh().then(_ => this.request(method, url, data, true))
        } else {
          notify({
            content:
              resp.data.message && typeof resp.data.message === 'string'
                ? resp.data.message
                : '请求失败，请重试'
          })
          // throw Error(resp)
        }
      })
  }
}
