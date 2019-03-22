import Vue from 'vue'
import _ from 'underscore'

Vue.use({
  install (Vue) {
    Vue.mixin({
      beforeCreate: function () {
        var apis = this.$options.apis
        _.each(apis, api => {
          this[`$api_${api.name || api.method}`] = function (options = {}) {
            options.type = api.type
            options.path = api.path
            let req = this.$ajax(options)
            return Promise.resolve(req)
          }
        })
      }
    })
  }
})
