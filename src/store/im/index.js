import Vue from 'vue'

const state = {
  '1_1_0': 3,
  '1_1_1': 10
}
const mutations = {
  SET_IM_COUNT (state, {key, value}) {
    Vue.set(state, key, value)
  }
}
const actions = {
  setImCount: ({
    commit
  }, value) => {
    return new Promise((resolve, reject) => {
      commit('SET_IM_COUNT', value)
      resolve()
    })
  }
}
const getters = {
  imCount: (state) => (name) => {
    return state[name]
  },
  getAllImCount: (state) => {
    let num = 0
    for (let k in state) {
      num += state[k]
    }
    return num
  },
  clearAll: (state) => {
    for (let m in state) {
      state[m] = 0
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
