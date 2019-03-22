import Mock from 'mockjs'

Mock.mock(/site\/getWidgetListByCategory/, {
  'status': 200,
  'data': [{
    'singleton': false,
    'name': 'nested',
    'description': '这是widget的描述信息这是widget的描述信息这是widget的描述信息这是widget的描述信息',
    'id': 23032556436016,
    'title': '面板',
    'params': '{"title":"嵌套面板", "text":"嵌套面板", "decorator":"none", "openMax": false, "openMin": false, "badge": "", "widgetHeight": "", "paddingTop": "", "paddingLeft": "", "paddingBottom": "", "paddingRight": "","widgetIco": "icon-cf-c57", "borderColor": "rgba(255, 255, 255, 0)", "borderRadius": "0", "decoratorBgColor": "rgba(255, 255, 255, 1)", "changeLayout": true}'
  }, {
    'singleton': false,
    'name': 'demo',
    'description': null,
    'id': 23032556449403,
    'title': 'demo',
    'params': '{"title":"demo", "text":"demo", "decorator":"default", "openMax": false, "openMin": false, "badge": "", "widgetHeight": "", "paddingTop": "", "paddingLeft": "", "paddingBottom": "", "paddingRight": "","widgetIco": "icon-cf-c57", "borderColor": "rgba(219,224,229, 1)", "borderRadius": "0", "decoratorBgColor": "rgba(255, 255, 255, 1)", "changeLayout": false}'
  }, {
    'singleton': false,
    'name': 'hello-world',
    'description': null,
    'id': 23032556454311,
    'title': 'hello-world',
    'params': '{"title":"Hello-world", "text":"Hello-world", "decorator":"default", "openMax": false, "openMin": false, "badge": "", "widgetHeight": "", "paddingTop": "", "paddingLeft": "", "paddingBottom": "", "paddingRight": "","widgetIco": "icon-cf-c57", "borderColor": "rgba(219,224,229, 1)", "borderRadius": "0", "decoratorBgColor": "rgba(255, 255, 255, 1)", "changeLayout": false}'
  }, {
    'singleton': false,
    'name': 'test',
    'description': null,
    'id': 23032556458327,
    'title': 'test',
    'params': '{"title":"test", "text":"test", "decorator":"default", "openMax": false, "openMin": false, "badge": "", "widgetHeight": "", "paddingTop": "", "paddingLeft": "", "paddingBottom": "", "paddingRight": "","widgetIco": "icon-cf-c57", "borderColor": "rgba(219,224,229, 1)", "borderRadius": "0", "decoratorBgColor": "rgba(255, 255, 255, 1)", "changeLayout": false}'
  }, {
    'singleton': false,
    'name': 'widget-bar',
    'description': null,
    'id': 23032556462790,
    'title': 'widget-bar',
    'params': '{"title":"图标Bar", "text":"图标Bar", "decorator":"default", "openMax": false, "openMin": false, "badge": "", "widgetHeight": "", "paddingTop": "", "paddingLeft": "", "paddingBottom": "", "paddingRight": "","widgetIco": "icon-cf-c57", "borderColor": "rgba(219,224,229, 1)", "borderRadius": "0", "decoratorBgColor": "rgba(255, 255, 255, 1)", "changeLayout": false}'
  }]
})
