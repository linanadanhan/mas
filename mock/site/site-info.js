import Mock from 'mockjs'

Mock.mock(/site\/siteInfo/, {
  'status': 200,
  'data': {
    name: 'web',
    title: '@title',
    publicTheme: '@theme',
    privateTheme: '@theme',
    loginType: 'system', // 'system/dialog/public/none'
    loginWidget: 'login'
  }
})
