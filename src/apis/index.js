/**
 * Created by sailengsi on 2017/5/11.
 */

/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */

import user from './user/'
import site from './site/'
import widget from './widget/'
import im from './im'
import form from './form'

export default [{
  module: 'user',
  name: '用户管理',
  list: user
}, {
  module: 'site',
  name: '站点管理',
  list: site
}, {
  module: 'widget',
  name: 'widget管理',
  list: widget
}, {
  module: 'im',
  name: '即时消息管理',
  list: im
}, {
  module: 'form',
  name: '表单管理',
  list: form
}]

