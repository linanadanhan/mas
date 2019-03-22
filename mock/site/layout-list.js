import Mock from 'mockjs'

Mock.mock(/layout\/layoutList/, {
  'status': 200,
  'data': [{
    name: 'default',
    title: '默认布局'
  }, {
    name: '2-8',
    title: '两栏（2-8）'
  }, {
    name: '3-7',
    title: '两栏（3-7）'
  }, {
    name: '4-6',
    title: '两栏（4-6）'
  }, {
    name: '5-5',
    title: '两栏（5-5）'
  }, {
    name: '6-4',
    title: '两栏（6-4）'
  }, {
    name: '7-3',
    title: '两栏（7-3）'
  }, {
    name: '8-2',
    title: '两栏（8-2）'
  }, {
    name: '4-4-2',
    title: '三栏（4-4-2）'
  }, {
    name: 'tile/layouts/3-3-3',
    title: '三栏（3-3-3）'
  }]
})
