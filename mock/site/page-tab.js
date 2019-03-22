export default [
  {
    name: 'demo',
    id: '@integer',
    layout: '@layout',
    widgets: [
      [{ name: 'hello-world', id: '@integer' }, { name: 'widget-pie', id: '@integer' }]
    ]
  },
  {
    name: 'check-role',
    id: '@integer',
    layout: '@layout',
    widgets: [
        [{ name: 'check-role', id: '@integer' }]
    ]
  },
  {
    name: 'test',
    id: '@integer',
    layout: '@layout',
    widgets: [[{ name: 'test', id: '@integer' }]]
  }
]

