export default {
  'status': 200,
  'data': {
    table: [{
      'name1': '内容1111111',
      'name2': '内容1111111',
      'name3': '内容1111111'
    }],
    config: {
      'table': {  // 表格整体配置
        'resource': '',            // 数据源
        'size': 'mini',            // 表格大小
        'checkbox': false,         // 复选框
        'orderNumber': false,      // 序号
        'page': true,              // 带分页组件
        'style': '#409EFF',        // 表格内容文字颜色
        'border': true,            // 表格边框
        'stripe': true,            // 表格斑马纹
        'autoWidth': false         // 列宽自动
      },
      'rows': [{  // 表头配置
        'id': 1001,
        'prop': 'name1',
        'label': '标题1',
        'width': '',
        'fixed': false
      }, {
        'id': 1003,
        'prop': 'name3',
        'label': '标题3',
        'width': '',
        'fixed': false
      }, {
        'id': 1002,
        'prop': 'name2',
        'label': '标题2',
        'width': '',
        'fixed': false
      }, {
        'id': 1006,
        'prop': 'name6',
        'label': '操作',
        'width': '',
        'fixed': 'right',
        'type': [{
          'name': '修改'
        }, {
          'name': '删除'
        }]
      }]
    }
  }
}
