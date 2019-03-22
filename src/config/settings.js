// import Vue from 'vue'
var gbs = {
  api_host: '/api', // 接口根地址。本地代理到slsadmin.api.sls.com,线上使用的是Nginx代理
  modules_host: '/modules', // 异步组件根地址。
  default_site: 'web', // 默认访问站点
  db_prefix: 'sls_admin_', // 本地存储的key
  event_bus_api: '/eventbus/', // vertx event bus 地址
  im_host: '/webchat', // 即时通讯地址
  fileRemoteServiceUrl: '/api/zuul/cos3-file-manager', // 远程文件存储服务
  fileServiceUrl: '/api/zuul/cos3-file-manager', // 文件上传服务地址
  filePreviewUrl: '/api/cos3-file-manager', // 文件预览服务地址
  admin_host: '/admin', // 后台管理服务地址
  // event_bus_api: 'http://localhost:8089/eventbus/', // vertx event bus 地址
  // im_host: 'http://localhost:8083', // 即时通讯地址
  // fileServiceUrl: 'http://localhost:8080/api/zuul/cos3-file-manager', // 文件上传服务地址
  // filePreviewUrl: 'http://localhost:8080/api/cos3-file-manager', // 文件预览服务地址
  // admin_host: 'http://localhost:8081', // 后台管理服务地址

  // 业务状态码字段
  api_status_key_field: 'status',
  // 业务状态码value
  api_status_value_field: 200,

  // 存放数据的字段
  api_data_field: 'data',

  api_biz_error: {
    // 用户未登录
    401: function (res) {
      this.$store.dispatch('remove_userinfo')
      this.$router.push('/login')
    },
    408: function (res) { // 超时
      this.$store.dispatch('remove_userinfo')
      var site = this.$store.getters.site
      this.$router.push(`/${site.name}/public`)
    },
    402: function (res, callback) {
      showErrorMsg(res, callback, this)
    },
    403: function (res, callback) {
      if (res.data) {
        this.$alert('', `${res.data}`, {
          callback: action => {
            this.$router.push('/login')
          }
        })
      }
    },
    404: function (res, callback) {
      this.$router.push('/login')
    },
    500: function (res, callback) {
      showErrorMsg(res, callback, this)
    },
    201: function (res, callback) {
      callback()
    },
    default: function (res, callback) {
      showErrorMsg(res, callback, this)
    }
  },

  api_sys_error: {
    default: function (err, callback) {
      if (err.status === 404) {
        err.data = '服务器请求超时！'
      }
      showErrorMsg(err, callback, this)
    }
  }
}

function showErrorMsg (res, callback, that) {
  let data = {}
  if (res === 'This session has been expired (possibly due to multiple concurrent logins being attempted as the same user).') {
    data.data = '账号在别处登录，您被迫下线！'
  } else {
    data = res
  }
  let options = {
    title: '',
    width: '30%',
    body: require('../views/settings/ShowErrorMsg.vue').default,
    'before-close': function (done) {
      if (res === 'This session has been expired (possibly due to multiple concurrent logins being attempted as the same user).') {
        that.$closeAllDialog()
        that.$router.push('/login')
      } else {
        callback()
      }
      done()
    },
    data: data,
    buttons: [{
      text: '确定',
      type: 'primary',
      handle: function (options, dialog, body) {
        if (res === 'This session has been expired (possibly due to multiple concurrent logins being attempted as the same user).') {
          that.$closeAllDialog()
          that.$router.push('/login')
        } else {
          callback()
        }
        dialog.close()
      }
    }]
  }
  that.$dialog(options)
}

var cbs = {
  /**
   * ajax请求成功，返回的状态码不是200时调用
   * @param  {object} err 返回的对象，包含错误码和错误信息
   */
  statusError (err) {
    console.log('err')
    if (err.status !== 404) {
      this.$message({
        showClose: true,
        message: '返回错误：' + err.msg,
        type: 'error'
      })
    } else {
      this.$store.dispatch('remove_userinfo').then(() => {
        this.$alert(err.status + ',' + err.msg + '！', '登录错误', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/login')
          }
        })
      })
    }
  },

  /**
   * ajax请求网络出错时调用
   */
  requestError (err) {
    this.$message({
      showClose: true,
      message: '请求错误：' + (err.response ? err.response.status : '') + ',' + (err.response ? err.response.statusText : ''),
      type: 'error'
    })
  }
}

export {
  gbs,
  cbs
}
