export default {
  namespaced: true,
  state: {
    favourites: []
  },
  mutations: {
    UPDATE_FAVOURITES (state, payload) {
      state.favourites = payload
    }
  },
  actions: {
    addToFavourites (context, payload) {
      let favourites = context.state.favourites
      favourites = favourites.pushUnique('abbreviation', payload)
      context.commit('UPDATE_FAVOURITES', favourites)
    },
    removeFromFavourites (context, payload) {
      const favourites = context.state.favourites
      const newFavourites = favourites.remove(
        'abbreviation',
        payload.abbreviation
      )
      context.commit('UPDATE_FAVOURITES', newFavourites)
    }
  }
}
