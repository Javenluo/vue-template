
const state = {
  list: null
}

const mutations = {
  GET_TABLE_LIST: (state) => {
    return state.list
  }
}

const actions = {

  async login({ commit, dispatch }, userInfo) {
    commit('GET_TABLE_LIST')
    return null
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

