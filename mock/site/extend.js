import Mock from 'mockjs'

Mock.Random.extend({
  theme: function (date) {
    let items = ['default', 'sample', 'NationalDay', 'MidAutumnFestival', 'iconNavMenu']
    items = ['iconNavMenu']
    return this.pick(items)
  },
  layout: function (date) {
    let items = ['default', '2-8', '4-6', '5-5', '6-4', '8-2', '4-4-2']
    items = ['default']
    return this.pick(items)
  },
  nestedLayout: function (date) {
    let items = ['2-8', '4-6', '5-5', '6-4', '8-2', '4-4-2']
    items = ['5-5']
    return this.pick(items)
  },
  decorator: function (date) {
    let items = ['default']
    // items = ['notoolbar','default','chartViewTop']
    return this.pick(items)
  },
  widget: function (date) {
    let items = ['hello-world', 'demo', 'test', 'widget-bar', 'widget-table', 'widget-pie']
    // items = ['check-person']
    return this.pick(items)
  },

  title: function (date) {
    return this.pick(['Tangram-有个性的数字化工作平台'])
  },

  themeMode: function (date) {
    let items = ['maximum', 'standard', 'minimum']
    items = ['standard']
    return this.pick(items)
  }

})
