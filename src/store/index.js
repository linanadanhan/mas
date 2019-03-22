import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './user/'
import global from './global/'
import site from './site/'
import badge from './badge/'
import im from './im/'
import dicItem from './dicItem'

export default new Vuex.Store({
  modules: {
    user,
    site,
    global,
    badge,
    im,
    dicItem
  }
})
