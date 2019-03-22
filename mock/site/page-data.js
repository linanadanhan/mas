export default {
  'status': 200,
  'data': {
    mode: '@themeMode',
    title: '@title',
    layout: '@layout',
    widgetParams: {},
    widgets: [
      [{
        'name': 'nested',
        'id': '123'
      }, {
        'name': '@widget',
        'id': '@integer'
      }, {
        'name': '@widget',
        'id': '@integer'
      }],
      [{
        'name': '@widget',
        'id': '@integer'
      }, {
        'name': '@widget',
        'id': '@integer'
      }, {
        'name': '@widget',
        'id': '@integer'
      }],
      [{
        'name': '@widget',
        'id': '@integer'
      }, {
        'name': '@widget',
        'id': '@integer'
      }, {
        'name': '@widget',
        'id': '@integer'
      }]
    ]
  }
}
