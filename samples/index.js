import _ from 'underscore'

const widgets = {
  demo: {
    'widget': () => import('./widgets/demo'),
    'config': () => import('./widgets/demo/config'),
    'profile': () => import('./widgets/demo/profile')
  }
}

if (typeof window.exports === 'undefined') {
  window.exports = {}
}

_.each(widgets, (comp, key) => {
  let name = 'samples/widgets/' + key + '/widget'
  let instance = window.exports[name]
  if (!instance) {
    window.exports[name] = {
      default: comp.widget()
    }
  }
})
_.each(widgets, (comp, key) => {
  _.each(['config', 'profile'], (type) => {
    let name = 'samples/widgets/' + key + '/' + type
    let instance = window.exports[name]
    if (!instance) {
      comp[type]().then((item) => {
        window.exports[name] = item
      })
    }
  })
})

