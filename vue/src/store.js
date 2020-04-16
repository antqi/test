import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {
    count: (state) => {
      return state.count
    },
  },
  mutations: {
    increment(state, args) {
      state.count++
    },
  },
  actions: {
    increment({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('increment')
          resolve()
        }, 2000)
      })
    },
  },
})
