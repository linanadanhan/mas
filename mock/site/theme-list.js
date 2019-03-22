import Mock from 'mockjs'

Mock.mock(/site\/getThemeList/, {
  'status': 200,
  'data': [{
    name: 'default',
    title: '默认蓝色主题'
  }, {
    name: 'sample',
    title: '护眼绿色主题'
  }, {
    name: 'NationalDay',
    title: '国庆节主题'
  }, {
    name: 'MidAutumnFestival',
    title: '中秋节主题'
  }, {
    name: 'onlyBackground',
    title: '背景主题'
  }, {
    name: 'tzxf',
    title: '台州智慧消防'
  }, {
    name: 'iconNavMenu',
    title: '图标导航菜单主题'
  }]
})
