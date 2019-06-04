export const state = () => ({
  counter: 0,
  user: null,
  wndCount: 0,
  WndStatuses: [],
})

export const mutations = {
  increment (state) {
    state.counter++
  },
  setUser (state, payload) {
    state.user = payload
  },
  setWndStatuses: (state, payload) => {
    if(!state.wndStatuses){
      state.wndStatuses = [];
    }
    if( !state.wndStatuses[payload.wndID] ) {
      state.wndStatuses[payload.wndID] = {
          zIndex: state.wndCount,
      };
      state.maxWndZIndex = state.wndCount;
      state.wndCount = state.wndCount+1;
    }
  },
  moveWndToTop: (state, payload) => {
      //ウインドウの入れ替え処理
      let oldZIndex = state.wndStatuses[payload.wndID].zIndex;
      //ウインドウを最前面にする
      state.wndStatuses[payload.wndID].zIndex = state.maxWndZIndex;
      //最前面にしたウインドウより手前に表示されていたウインドウのzIndexをデクリメント
      for(let key in state.wndStatuses){
          if( (state.wndStatuses[key].zIndex > oldZIndex) && (key != payload.wndID) ) {
              state.wndStatuses[key].zIndex -= 1;
          }
      }
  },
}

export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  },
  setWndStatuses ({ commit }, payload) {
    commit('setWndStatuses', payload)
  },
  moveWndToTop ({ commit }, payload) {
    commit('moveWndToTop', payload)
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  user(state) {
    return state.user.displayName
  },
  setWndStatuses(context, payload) {
      context.commit('setWndStatuses', payload);
  },
  moveWndToTop(context, payload) {
      context.commit('moveWndToTop', payload);
  }
}
