/**
 * 即时消息模块
 * @type {Object}
 */
export default [
  {
    name: '获取历史会话信息',
    method: 'getSessionList',
    path: '/cos3-im-manager/sessionMessage/getSessionList',
    type: 'get'
  },
  {
    name: '获取用户下的所有群组信息',
    method: 'getGroupList',
    path: '/cos3-im-manager/contactGroup/getGroupList',
    type: 'get'
  },
  {
    name: '获取对应用户的badge信息',
    method: 'getBadgeInfo',
    path: '/cos3-portal-manager/syncData/getBadgeInfo',
    type: 'get'
  }
]

