import axios from 'axios'
import token from './token'
const apiConfig = require('../../config').api

const baseRequest = axios.create({
  baseURL: apiConfig.baseURL
})

export default class Request {
  constructor () {
    this.baseRequestUrl = apiConfig.baseURL
    this.token = token
  }

  get (url, params) {
    return baseRequest({
      url,
      params
    })
      .then(res => {
        return res.data.data
      })
      .catch(err => {
        throw Error(err.response)
      })
  }
}
