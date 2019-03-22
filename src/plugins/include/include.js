import require from '../require/require.js'

if (typeof window.sharedComponents === 'undefined') {
  window.sharedComponents = {}
}

export default function (moduleName, fileName, componentName) {
  moduleName = moduleName + '/components'
  let instance = window.sharedComponents[fileName]
  if (!instance) {
    instance = require(moduleName, fileName, componentName)()
    window.sharedComponents[fileName] = instance
  }
  return instance
}
