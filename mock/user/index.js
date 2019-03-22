import Mock from 'mockjs'

Mock.mock(/api\/login/, {
  'status': 200,
  'data': {
    'userinfo': {
      'id': 837,
      'pid': 78,
      'username': 'Admin',
      'email': '',
      'sex': '3',
      'status': 1,
      'create_time': '2017-05-11 14:02:16',
      'birthday': '1992-11-05',
      'address': '',
      'token': '75b2cea6ce59d1247d3b57ecd9469bf8',
      'access_status': 2,
      'web_routers': '',
      'api_routers': '',
      'default_web_routers': '',
      'is_update_pass': 1
    }
  }
})
