import axios from 'axios'
import codeMessage from '../config/code-message'
import store from '../redux/store'
import {
  message
} from 'antd'



const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  headers: {

  }
})
//发生在请求之前
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.data = Object.keys(config.data).reduce((prev, key) => {
        const vaule = config.data[key]
        return prev + `&${key}=${vaule}`
      }, '').substring(1)
    }

    const {
      user: {
        token
      }
    } = store.getState()
    

    if (token) {
      config.headers.authorization = 'Bearer ' + token;
    }
    return config
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.status === 0) {
      return response.data.data
    } else {
      // alert(response.data.msg)
      message.error(response.data.msg)
    }
  },
  (error) => {

    let errorMessage = ''
    if (error.response) {
      errorMessage = codeMessage[error.response.status] || '未知错误'
    } else {
      if (error.message.indexOf('Network Error') !== -1) {
        errorMessage = '请检查网络连接';
      } else if (error.message.indexOf('timeout') !== -1) {
        errorMessage = '网络太卡了，请连上wifi重试';
      } else {
        errorMessage = '未知错误';
      }
    }

    // alert(errorMessage)
    message.error(errorMessage)
    return Promise.reject(errorMessage)

  }


)

export default axiosInstance