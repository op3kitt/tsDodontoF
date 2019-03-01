export const state = () => ({
  counter: 0,
  user: null
})

export const mutations = {
  increment (state) {
    state.counter++
  },
  setUser (state, payload) {
    state.user = payload
  }
}

export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  user(state) {
    return state.user.displayName
  }
}
