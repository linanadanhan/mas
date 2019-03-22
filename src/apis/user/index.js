/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
  {
    name: '登录',
    method: 'login',
    path: '/login',
    type: 'post'
  },
  {
    name: '登出',
    method: 'logout',
    path: '/logout',
    type: 'post'
  },
  {
    name: '注册',
    method: 'register',
    path: '/User/register',
    type: 'post'
  },
  {
    name: '获取用户列表',
    method: 'selectUser',
    path: '/User/selectUser',
    type: 'get'
  },

  {
    name: '添加修改用户公用接口',
    method: 'saveUser',
    path: '/User/saveUser',
    type: 'post'
  },
  {
    name: '删除用户',
    method: 'deleteUser',
    path: '/User/deleteUser',
    type: 'post'
  },
  {
    name: '获取用户信息',
    method: 'findUser',
    path: '/User/findUser',
    type: 'get'
  },

  {
    name: '修改密码',
    method: 'modifyPassword',
    path: '/cos3-portal-manager/personnel/modifyPassword',
    type: 'post'
  },
  {
    name: '设置权限',
    method: 'updateUserAccess',
    path: '/User/updateUserAccess',
    type: 'post'
  },
  {
    name: '设置用户状态',
    method: 'updateUserStatus',
    path: '/User/updateUserStatus',
    type: 'post'
  },
  {
    name: '查询租户信息列表',
    method: 'getCustomerList',
    path: '/cos3-portal-manager/customer/getCustomerList',
    type: 'get'
  },
  {
    name: '根据主键查询单笔租户信息',
    method: 'getCustomerById',
    path: '/cos3-portal-manager/customer/getCustomerById',
    type: 'get'
  },
  {
    name: '保存租户信息',
    method: 'saveCustomer',
    path: '/cos3-portal-manager/customer/saveCustomer',
    type: 'post'
  },
  {
    name: '删除租户信息',
    method: 'deleteCustomer',
    path: '/cos3-portal-manager/customer/deleteCustomer',
    type: 'get'
  },
  {
    name: '校验租户标识是否唯一',
    method: 'isUniqueCustomerCode',
    path: '/cos3-portal-manager/customer/isUniqueCustomerCode',
    type: 'get'
  },
  {
    name: '租户连接测试',
    method: 'testCustomerConn',
    path: '/cos3-portal-manager/customer/testCustomerConn',
    type: 'post'
  },
  {
    name: '校验域名是否唯一',
    method: 'isUniqueDomain',
    path: '/cos3-portal-manager/customer/isUniqueDomain',
    type: 'get'
  }
]
