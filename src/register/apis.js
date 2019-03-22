/**
 * Created by sailengsi on 2017/5/14.
 */

import request from 'apis/'
var plugins = {}
for (var i = 0; i < request.length; i++) {
  if (typeof request[i] === 'object' && request[i].list && Array.isArray(request[i].list)) {
    for (var j = 0; j < request[i].list.length; j++) {
      plugins['api_' + request[i].module + '_' + request[i].list[j].method] = (function (n, m) {
        return function (options = {}) {
          options.type = request[n].list[m].type
          options.path = request[n].list[m].path
          return this.$ajax(options)
        }
      })(i, j)
    }
  }
}

// console.log(plugins);

export default plugins
