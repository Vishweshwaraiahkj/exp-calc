import axios from 'axios'
import { isValidObject } from '@/utils/globals'

export default {
  namespaced: true,
  state: {
    globalMessage: {
      type: '',
      message: ''
    },
    categories: [],
    types: []
  },
  mutations: {
    UPDATE_MESSAGE(state, payload) {
      state.globalMessage = payload
    },
    UPDATE_CATEGORIES(state, payload) {
      state.categories = payload
    },
    UPDATE_TYPES(state, payload) {
      state.types = payload
    }
  },
  actions: {
    floatingMessages(context, payload) {
      context.commit('UPDATE_MESSAGE', payload)
    },
    async toggleFavorite(context, { item, key }) {
      if (!isValidObject(item)) return false
      const existingData = context.state[key]
      const favStatus = item.favorite
      const updatedItem = {
        ...item,
        favorite: !favStatus
      }
      try {
        const res = await axios.patch(
          process.env.VUE_APP_API_ENDPOINT + `/${key}/${item.id}`,
          updatedItem
        )
        if (!res.data) return false

        const updatedData = existingData?.map((i) => {
          if (i.id === item.id) {
            return updatedItem
          }
          return i
        })

        if (key === 'categories') {
          context.commit('UPDATE_CATEGORIES', updatedData)
        }
        if (key === 'types') {
          context.commit('UPDATE_TYPES', updatedData)
        }
      } catch (error) {
        alert('Error updating item!')
      }
    },
    async fetchAllCategories(context) {
      if (context.state.categories?.length) return false
      try {
        await axios
          .get(process.env.VUE_APP_API_ENDPOINT + '/categories')
          .then((response) => response.data)
          .then((items) => {
            context.commit('UPDATE_CATEGORIES', items)
          })
      } catch (error) {
        alert('Error getting existing categories!')
      }
    },
    async fetchAllTypes(context) {
      if (context.state.types?.length) return false
      try {
        await axios
          .get(process.env.VUE_APP_API_ENDPOINT + '/types')
          .then((response) => response.data)
          .then((items) => {
            context.commit('UPDATE_TYPES', items)
          })
      } catch (error) {
        alert('Error getting existing categories!')
      }
    }
  },
  getters: {
    getAllCategories: (state) => {
      return state.categories
    },
    getAllTypes: (state) => {
      return state.types
    },
    getGlobalMsgs: (state) => {
      return state.globalMessage
    }
  }
}
