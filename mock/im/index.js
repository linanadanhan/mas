import Mock from 'mockjs'

Mock.mock(/sessionMessage\/getSessionList/, {
  'status': 200,
  'data': null
})

Mock.mock(/contactGroup\/getGroupList/, {
  'status': 200,
  'data': null
})

Mock.mock(/syncData\/getBadgeInfo/, {
  'status': 200,
  'data': null
})
