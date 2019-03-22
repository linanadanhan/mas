import Mock from 'mockjs'

Mock.mock(/widget\/widgetTable/, {
  'status': 200,
  'data': {
    tableData: [{
      type: '交办件',
      title: '浙江省财政厅',
      state: '办理中'
    }, {
      type: '交办件',
      title: '浙江省财政厅',
      state: '办理中'
    }, {
      type: '交办件',
      title: '浙江省财政厅',
      state: '办理中'
    }]
  }
})

Mock.mock(/widget\/widgetBar/, {
  'status': 200,
  'data': {
    xAxis: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    yAxis: {},
    series: {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  }
})

Mock.mock(/widget\/widgetPie/, {
  'status': 200,
  'data': {
    'series': {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      data: [{
        value: 235,
        name: '视频广告'
      }, {
        value: 274,
        name: '联盟广告'
      }, {
        value: 310,
        name: '邮件营销'
      }, {
        value: 335,
        name: '直接访问'
      }, {
        value: 400,
        name: '搜索引擎'
      }]
    }
  }
})

