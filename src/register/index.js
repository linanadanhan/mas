/**
 * Created by shencq on 2017/12/15.
 */
import Vue from 'vue'
import _ from 'underscore'
// import { string } from 'utils/'
import libs from './libs.js'
import apis from './apis.js'
import cps from 'components'

/**
 * 把一些全局对象和一些全局方法，注册到Vue原型上
 */
Vue.use({
  install (Vue, options) {
    // 注册第三方库
    _.each(libs, (item, key) => {
      Vue.prototype['$' + key] = item
    })

    // 注册全局方法，如常用的接口方法，工具方法等。
    _.each(apis, (item, key) => {
      Vue.prototype['$' + key] = item
    })

    _.each(cps, (item, key) => {
      Vue.use(item)
    })
  }
})
