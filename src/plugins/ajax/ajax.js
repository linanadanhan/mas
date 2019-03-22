/**
 * 封装axios的通用请求
 */
function combineURLs (baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL
}

export default function (Vue, {axios, gbs}) {
  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (config.url === config.baseURL) {
      let path = config.path
      if (typeof path === 'function') {
        path = path(config.pathParams || {})
      }
      config.url = combineURLs(config.baseURL, path)
    }
    // 增加type参数，同method
    config.method = config.type || config.method
    // method=get时，data自动转为params
    config[config.method === 'get' ? 'params' : 'data'] = config.data
    if (typeof config.beforeErrorHandle !== 'function') {
      config.beforeErrorHandle = function () {
        return true
      }
    }
    config.app.$store.dispatch('show_loading')
    return config
  }, function (error) {
    // Do something with request error
    console.log('请求前错误', error)
    return Promise.reject(error)
  })

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    // 服务正常返回数据
    let config = response.config
    let fn = config.fn || (() => {})
    let errFn = config.errFn || (() => {})
    config.app.$store.dispatch('hide_loading')
    return new Promise((resolve, reject) => {
      if (response.data[gbs.api_status_key_field] === '-1') {
        let handle = gbs.api_biz_error['408']
        handle.call(config.app, response.data, () => {
          errFn.call(config.app, response.data)
          reject(response.data)
        })
      } else if (response.data[gbs.api_status_key_field] === gbs.api_status_value_field) {
        // 业务正常逻辑数据
        if (gbs.api_data_field) {
          // 数据结构中有指定的业务数据节点
          fn.call(config.app, response.data[gbs.api_data_field])
          resolve(response.data[gbs.api_data_field])
        } else {
          // 数据结构中没有制定业务数据节点，全部数据返回
          fn.call(config.app, response.data)
          resolve(response.data)
        }
      } else {
        // 业务异常逻辑数据
        if (config.beforeErrorHandle(response.data)) {
          let handle = gbs.api_biz_error[response.data[gbs.api_status_key_field]] || gbs.api_biz_error.default
          handle.call(config.app, response.data, () => {
            errFn.call(config.app, response.data)
            reject(response.data)
          })
        } else {
          errFn.call(config.app, response.data)
          reject(response.data)
        }
      }
    })
  }, function (error) {
    // 服务器返回异常
    let config = error.config
    let errFn = config.errFn || (() => {})
    config.app.$store.dispatch('hide_loading')
    return new Promise((resolve, reject) => {
      if (config.beforeErrorHandle(error.data)) {
        let handle = gbs.api_sys_error[error.response[gbs.api_status_key_field]] || gbs.api_sys_error.default
        handle.call(config.app, error.response, () => {
          errFn.call(config.app, error.response)
          reject(error.response)
        })
      } else {
        errFn.call(config.app, error.response)
        reject(error.response)
      }
    })
  })

  Object.defineProperty(Vue.prototype, '$ajax', {
    get () {
      return (options) => {
        options.app = this
        return axios(options)
      }
    }
  })
  Object.defineProperty(Vue.prototype, '$http', {
    get () {
      return (options) => {
        options.app = this
        return axios(options)
      }
    }
  })
}
