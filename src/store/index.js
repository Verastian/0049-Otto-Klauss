import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toys: [],
    currentUser: null,
    currentToy: {},
    
  },
  mutations: {
    UPDATE_CURRENT_USER(state, user) { state.currentUser = user },
    GET_TOYS(state, toy) { state.toys= toy },
    SET_CURRENT_TOY(state, toy){state.currentToy = toy}
  },
  actions: {
    updateCurrentUser({ commit }, user) {
      commit('UPDATE_CURRENT_USER', user)
    },
    getToys({ commit }) {
      axios.get(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/toys`).then(res => {
        console.log(res.data)
        commit('GET_TOYS', res.data)
      })
    },
    deleteToy({dispatch}, toyId){
      axios.delete(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/toys/${toyId}`)
      .then(() =>{
        dispatch('getToys')
      })
    },
    createToy({dispatch}, toy) {
      axios.post(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/toys`,toy)
      .then(() =>{
        dispatch('getToys')
      })
    },
    updateToy({dispatch}, toy){
      axios.put(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/toys/${toy.id}`,toy.data)
      .then(() =>{
        dispatch('getToys')
      })
    },
    editToy({commit}, toy){
      commit('SET_CURRENT_TOY',toy)
    }
  },
  modules: {
  }
})
