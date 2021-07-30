import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    account: null,
    profile: null
  },
  getters: {
    profile (state) {
      return state.profile || JSON.parse(localStorage.getItem('profile'))
    }
  },
  mutations: {
    setLoginData (state, { token, account, profile }) {
      state.token = token
      state.account = account
      state.profile = profile
      localStorage.setItem('profile', JSON.stringify(profile))
      localStorage.setItem('account', JSON.stringify(account))
      localStorage.setItem('token', JSON.stringify(token))
    }
  },
  actions: {},
  modules: {}
})
