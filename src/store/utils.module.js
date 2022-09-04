import axios from 'axios'
import { IsValidObject, UpdateArrayByKey } from '@/utils/globals'

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
    async toggleFavorite(context, { item, type }) {
      if (!IsValidObject(item)) return false
      const existingData = context.state[type]
      const favStatus = item.favorite
      const updatedItem = {
        ...item,
        favorite: !favStatus
      }
      try {
        const res = await axios.patch(
          process.env.VUE_APP_API_ENDPOINT + `/${type}/${item.id}`,
          updatedItem
        )
        if (!res.data) return false

        const updatedData = UpdateArrayByKey(existingData, 'id', updatedItem)

        if (type === 'categories') {
          context.commit('UPDATE_CATEGORIES', updatedData)
        }
        if (type === 'types') {
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
    },
    async addToList(context, { dataObj, dataType }) {
      const existingData = context.state[dataType]

      try {
        const res = await axios.post(
          process.env.VUE_APP_API_ENDPOINT + `/${dataType}`,
          dataObj
        )

        if (!res.data) return false

        const updatedData = [...existingData, dataObj]
        if (dataType === 'categories') {
          context.commit('UPDATE_CATEGORIES', updatedData)
        }
        if (dataType === 'types') {
          context.commit('UPDATE_TYPES', updatedData)
        }
      } catch (error) {
        context.dispatch(
          'utils/floatingMessages',
          {
            message: 'Error adding item!',
            type: 'error'
          },
          { root: true }
        )
      }
    },
    async updateList(context, { dataObj, dataType }) {
      const existingData = context.state[dataType]
      try {
        const res = await axios.patch(
          process.env.VUE_APP_API_ENDPOINT + `/${dataType}/${dataObj.id}`,
          dataObj
        )
        if (!res.data) return false

        const updatedData = UpdateArrayByKey(existingData, 'id', dataObj)

        if (dataType === 'categories') {
          context.commit('UPDATE_CATEGORIES', updatedData)
        }
        if (dataType === 'types') {
          context.commit('UPDATE_TYPES', updatedData)
        }
      } catch (error) {
        context.dispatch(
          'utils/floatingMessages',
          {
            message: 'Error updating item!',
            type: 'error'
          },
          { root: true }
        )
      }
    },
    async deleteById(context, { dataId, dataType }) {
      if (!dataId || !dataType) return false
      try {
        await axios.delete(
          process.env.VUE_APP_API_ENDPOINT + `/${dataType}/${dataId}`
        )
        const filteredList = context.state[dataType]?.filter(
          (i) => i.id !== dataId
        )

        if (dataType === 'categories') {
          context.commit('UPDATE_CATEGORIES', filteredList)
        }
        if (dataType === 'types') {
          context.commit('UPDATE_TYPES', filteredList)
        }
      } catch (error) {
        context.dispatch(
          'utils/floatingMessages',
          {
            message: 'Error Deleting Item!',
            type: 'error'
          },
          { root: true }
        )
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
