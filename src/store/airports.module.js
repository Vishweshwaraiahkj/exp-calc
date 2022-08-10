import axios from 'axios'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    UPDATE_AIRPORTS (state, payload) {
      state.list = payload
    }
  },
  actions: {
    addFavorite (context, payload) {
      const airports = context.state.list
      const newList = airports.map((i) => {
        if (i.abbreviation === payload) {
          i.favorite = true
        }
        return i
      })
      context.commit('UPDATE_AIRPORTS', newList)
    },
    removeFavorite (context, payload) {
      const airports = context.state.list
      const newList = airports.map((i) => {
        if (i.abbreviation === payload) {
          i.favorite = false
        }
        return i
      })
      context.commit('UPDATE_AIRPORTS', newList)
    },
    async fetchAirports (context) {
      if (context.state.list?.length) return false
      try {
        await axios
          .get(process.env.VUE_APP_API_ENDPOINT + '/airports')
          .then(response => response.data)
          .then(items => {
            context.commit('UPDATE_AIRPORTS', items)
          })
      } catch (error) {
        alert('Error getting existing data!')
      }
    }
  },
  getters: {
    getAirports: (state) => {
      return state.list
    }
  }
}
