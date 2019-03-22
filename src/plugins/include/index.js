import Vue from 'vue'
import include from './include'

Vue.use({
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$include', {
      get () {
        return include
      }
    })
  }
})
