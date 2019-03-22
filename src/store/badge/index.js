import Vue from 'vue'
import _ from 'underscore'

const state = {
  badge: {
    'test.a': {
      isDot: false,
      value: 5,
      data: []
    },
    'test.b': {
      isDot: true,
      value: 3,
      data: []
    },
    '1111': {
      isDot: true,
      value: 3,
      data: []
    },
    'U_1': {
      isDot: false,
      value: 3,
      data: []
    }
  }
}
const mutations = {
  SET_BADGE (state, {key, badge}) {
    Vue.set(state.badge, key, badge)
  }
}
const actions = {
  setBadge: ({
    commit
  }, badge) => {
    return new Promise((resolve, reject) => {
      commit('SET_BADGE', badge)
      resolve()
    })
  }
}
const getters = {
  badge: (state) => (names) => {
    if (Array.isArray(names)) {
      let dnum = 0
      let num = 0
      _.each(names, name => {
        let item = state.badge[name]
        if (item) {
          if (item.isDot) {
            dnum += item.value
          } else {
            num += item.value
          }
        }
      })
      return {
        isDot: dnum > 0 && num === 0,
        value: num > 0 ? num : ''
      }
    } else {
      return state.badge[names] > 0 ? state.badge[names] : ''
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
