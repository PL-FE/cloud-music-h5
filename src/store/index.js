import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistedState()],
  state: {
    token: '',
    account: null,
    profile: null,
    playingSongIdx: '',
    playingSong: null,
    playList: null
  },
  getters: {
    account (state) {
      return state.account
    },
    profile (state) {
      return state.profile
    },
    playList (state) {
      return state.playList
    },
    playingSongIdx (state) {
      return state.playingSongIdx
    }
  },
  mutations: {
    setPlayingSong (state, { playingSong, playingSongIdx }) {
      state.playingSong = playingSong
      state.playingSongIdx = playingSongIdx
    },
    setPlayingSongIdx (state, { playingSongIdx }) {
      state.playingSongIdx = playingSongIdx
    },
    setPlayList (state, playList) {
      state.playList = playList
    },
    setLoginData (state, { token, account, profile }) {
      state.token = token
      state.account = account
      state.profile = profile
    }
  },
  actions: {
    // 有延迟
    getLikeList (state) {
      const uid = state.getters.account.id
      return api.post(`api/likelist?uid=${uid}`)
    }
  },
  modules: {}
})
