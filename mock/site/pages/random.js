import Mock from 'mockjs'
import _ from 'underscore'
import PageNested from '../page-nested'
import PageTab from '../page-tab'

export default function () {
  const data = Mock.mock({
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
  })

  _.each(data.data.widgets, group => {
    _.each(group, widget => {
      data.data.widgetParams[widget.id] = {
        title: 'T' + widget.id,
        text: 'text-' + widget.id,
        decorator: Mock.Random.decorator(),
        badge: 'test.b'
      }
      if (widget.name === 'nested') {
        let params = data.data.widgetParams[widget.id]
        params.decorator = 'none'
        params.nestedPage = Mock.mock(PageNested)
        _.each(params.nestedPage.widgets, ng => {
          _.each(ng, item => {
            data.data.widgetParams[item.id] = {
              title: 'T' + item.id,
              text: 'text-' + item.id,
              decorator: Mock.Random.decorator(),
              badge: 'test.a'
            }
          })
        })
      }
      if (widget.name === 'tab') {
        let params = data.data.widgetParams[widget.id]
        params.decorator = 'default'
        params.tabs = Mock.mock(PageTab)
        _.each(params.tabs, ng => {
          _.each(ng.widgets, widgets => {
            _.each(widgets, tab => {
              data.data.widgetParams[tab.id] = {
                title: 'T' + tab.id,
                text: 'text-' + tab.id,
                decorator: Mock.Random.decorator(),
                badge: 'test.a'
              }
            })
          })
        })
      }
    })
  })
  return data
}
