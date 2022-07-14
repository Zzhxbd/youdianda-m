import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN_KEY = 'YOUDIANDA_USER'
export default new Vuex.Store({
  state: {
    token:getItem(TOKEN_KEY)
  },
  getters: {

  },
  mutations: {
    setToken(state, data) {
      state.token = data
      //本地存储
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.token)
    }
  },
  actions: {
  },
  modules: {
  }
})
