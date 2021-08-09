import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
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
      return state.account || getItem('account')
    },
    profile (state) {
      return state.profile || getItem('profile')
    },
    playList (state) {
      return state.playList || getItem('playList') || []
    },
    playingSongIdx (state) {
      return state.playingSongIdx || getItem('playingSongIdx')
    }
  },
  mutations: {
    setPlayingSong (state, { playingSong, playingSongIdx }) {
      state.playingSong = playingSong
      state.playingSongIdx = playingSongIdx
      setItem('playingSongIdx', playingSongIdx)
      setItem('playingSong', playingSong)
    },
    setPlayingSongIdx (state, { playingSongIdx }) {
      state.playingSongIdx = playingSongIdx
      setItem('playingSongIdx', playingSongIdx)
    },
    setPlayList (state, playList) {
      state.playList = playList
      setItem('playList', playList)
    },
    setLoginData (state, { token, account, profile }) {
      state.token = token
      state.account = account
      state.profile = profile
      setItem('profile', profile)
      setItem('account', account)
      setItem('token', token)
    }
  },
  actions: {
    getLikeList (state) {
      const uid = state.getters.account.id
      return api.get(`api/likelist?uid=${uid}`)
    }
  },
  modules: {}
})

function setItem (key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function getItem (key) {
  return JSON.parse(localStorage.getItem(key))
}
