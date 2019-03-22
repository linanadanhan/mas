import Mock from 'mockjs'

Mock.mock(/getSiteInfoByDomain/, {
  'status': 200,
  'data': {
    C_SITE_CODE: 'web'
  }
})
