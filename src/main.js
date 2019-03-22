// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
// To add to window
if (!window.Promise) {
  window.Promise = Promise
}

import 'plugins/'
import 'register/'

import Vue from 'vue'
import App from './App'
import store from 'store/'
import router from './router'
import uploader from 'vue-simple-uploader'

// element-ui
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'

Vue.use(ElementUI)
Vue.use(uploader)

Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data: {
    eventHub: new Vue() // 定义全局事件总线对象
  },
  render: r => r(App)
})
