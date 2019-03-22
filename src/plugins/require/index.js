import Vue from 'vue'
import require from './require.js'

Vue.use({
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$require', {
      get () {
        return require
      }
    })
  }
})
