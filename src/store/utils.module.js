import axios from 'axios'

export default {
  namespaced: true,
  state: {
    modalStatus: '',
    globalMessage: {
      type: '',
      message: ''
    },
    categories: [],
    types: []
  },
  mutations: {
    UPDATE_MODAL_STATUS (state, payload) {
      state.modalStatus = payload
    },
    UPDATE_MESSAGE (state, payload) {
      state.globalMessage = payload
    },
    UPDATE_CATEGORIES (state, payload) {
      state.categories = payload
    },
    UPDATE_TYPES (state, payload) {
      state.types = payload
    }
  },
  actions: {
    changeModalStatus (context, payload) {
      context.commit('UPDATE_MODAL_STATUS', payload)
    },
    floatingMessages (context, payload) {
      context.commit('UPDATE_MESSAGE', payload)
    },
    async fetchAllCategories (context) {
      if (context.state.categories?.length) return false
      try {
        await axios
          .get(process.env.VUE_APP_API_ENDPOINT + '/categories')
          .then(response => response.data)
          .then(items => {
            context.commit('UPDATE_CATEGORIES', items)
          })
      } catch (error) {
        alert('Error getting existing categories!')
      }
    },
    async fetchAllTypes (context) {
      if (context.state.types?.length) return false
      try {
        await axios
          .get(process.env.VUE_APP_API_ENDPOINT + '/types')
          .then(response => response.data)
          .then(items => {
            context.commit('UPDATE_TYPES', items)
          })
      } catch (error) {
        alert('Error getting existing categories!')
      }
    }
  },
  getters: {
    getModalStatus: (state) => {
      return state.modalStatus
    },
    getAllCategories: (state) => {
      return state.categories
    },
    getAllTypes: (state) => {
      return state.types
    }
  }
}
