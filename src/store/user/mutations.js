/**
 * Created by sailengsi on 2017/5/10.
 */
// import storage from 'utils/storage'
import cookie from 'utils/cookie'

import * as types from './mutations_types'

export default {
  [types.UPDATE_USERINFO] (state, userDb) {
    state.userinfo = userDb.userinfo
    // storage.set('userinfo', state.userinfo)
    cookie.setCookie('userinfo', JSON.stringify(state.userinfo))
  },

  [types.REMOVE_USERINFO] (state) {
    // storage.remove('userinfo')
    cookie.delCookie('userinfo')
    state.userinfo = null
  },

  [types.UPDATE_REMUMBER] (state, userDb) {
    state.remumber.remumber_flag = userDb.remumber_flag
    state.remumber.remumber_login_info = userDb.remumber_login_info

    // storage.set('remumber_flag', state.remumber.remumber_flag)
    // storage.set('remumber_login_info', state.remumber.remumber_login_info)
    cookie.setCookie('remumber_flag', state.remumber.remumber_flag)
    cookie.setCookie('remumber_login_info', state.remumber.remumber_login_info)
  },

  [types.REMOVE_REMUMBER] (state) {
    // storage.remove('remumber_flag')
    // storage.remove('remumber_login_info')
    cookie.delCookie('remumber_flag')
    cookie.delCookie('remumber_login_info')

    state.remumber.remumber_flag = false
    state.remumber.remumber_login_info = {
      username: '',
      token: ''
    }
  }
}
