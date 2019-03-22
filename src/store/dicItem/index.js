import Vue from 'vue'

const state = {
}
const mutations = {
  SET_DICITEMS (state, {key, value}) {
    Vue.set(state, key, value)
  }
}
const actions = {
  setDicItems: ({
    commit
  }, data) => {
    return new Promise((resolve, reject) => {
      commit('SET_DICITEMS', data)
      resolve()
    })
  }
}
const getters = {
  getDicItems: (state) => (key) => {
    return state[key]
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
