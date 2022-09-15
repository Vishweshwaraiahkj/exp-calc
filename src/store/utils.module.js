import { IsValidObject, UpdateArrayByKey } from '@/utils/globals'
import fs from 'fs'
import * as path from 'path'

const categoriesPath = path.join(process.cwd(), 'src/data/categories.json')
const typesPath = path.join(process.cwd(), 'src/data/types.json')

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

      let dbPath
      if (type === 'types') {
        dbPath = typesPath
      } else {
        dbPath = categoriesPath
      }

      const updatedData = UpdateArrayByKey(existingData, 'id', updatedItem)

      fs.writeFile(dbPath, JSON.stringify(updatedData, null, 2), (error) => {
        if (error) {
          context.dispatch(
            'utils/floatingMessages',
            {
              message: 'Error updating item!',
              type: 'error'
            },
            { root: true }
          )
          return
        }
        context.dispatch(
          'utils/floatingMessages',
          {
            message: 'Successfully updated!',
            type: 'success'
          },
          { root: true }
        )
        if (type === 'categories') {
          context.commit('UPDATE_CATEGORIES', updatedData)
        }
        if (type === 'types') {
          context.commit('UPDATE_TYPES', updatedData)
        }
      })
    },
    async fetchAllCategories(context) {
      if (context.state.categories?.length) return false
      fs.readFile(categoriesPath, 'utf8', (err, data) => {
        if (err) {
          context.dispatch(
            'utils/floatingMessages',
            {
              message: 'Error getting existing categories!',
              type: 'error'
            },
            { root: true }
          )
        }
        const dbData = JSON.parse(data)
        context.commit('UPDATE_CATEGORIES', dbData)
      })
    },
    async fetchAllTypes(context) {
      if (context.state.types?.length) return false
      fs.readFile(typesPath, 'utf8', (err, data) => {
        if (err) {
          context.dispatch(
            'utils/floatingMessages',
            {
              message: 'Error getting existing types!',
              type: 'error'
            },
            { root: true }
          )
        }
        const dbData = JSON.parse(data)
        context.commit('UPDATE_TYPES', dbData)
      })
    },
    async addToList(context, { dataObj, dataType }) {
      const existingData = context.state[dataType]

      const updatedData = [...existingData, dataObj]

      let dbPath
      if (dataType === 'types') {
        dbPath = typesPath
      } else {
        dbPath = categoriesPath
      }

      fs.writeFile(dbPath, JSON.stringify(updatedData, null, 2), (error) => {
        if (error) {
          context.dispatch(
            'utils/floatingMessages',
            {
              message: 'Error adding item!',
              type: 'error'
            },
            { root: true }
          )
          return
        }
        context.dispatch(
          'utils/floatingMessages',
          {
            message: 'Successfully updated!',
            type: 'success'
          },
          { root: true }
        )
        if (dataType === 'categories') {
          context.commit('UPDATE_CATEGORIES', updatedData)
        }
        if (dataType === 'types') {
          context.commit('UPDATE_TYPES', updatedData)
        }
      })
    },
    async updateList(context, { dataObj, dataType }) {
      const existingData = context.state[dataType]

      const updatedData = UpdateArrayByKey(existingData, 'id', dataObj)

      let dbPath
      if (dataType === 'types') {
        dbPath = typesPath
      } else {
        dbPath = categoriesPath
      }

      fs.writeFile(dbPath, JSON.stringify(updatedData, null, 2), (error) => {
        if (error) {
          context.dispatch(
            'utils/floatingMessages',
            {
              message: 'Error updating item!',
              type: 'error'
            },
            { root: true }
          )
          return
        }
        context.dispatch(
          'utils/floatingMessages',
          {
            message: 'Successfully updated!',
            type: 'success'
          },
          { root: true }
        )
        if (dataType === 'categories') {
          context.commit('UPDATE_CATEGORIES', updatedData)
        }
        if (dataType === 'types') {
          context.commit('UPDATE_TYPES', updatedData)
        }
      })
    },
    async deleteById(context, { dataId, dataType }) {
      if (!dataId || !dataType) return false

      const filteredList = context.state[dataType]?.filter(
        (i) => i.id !== dataId
      )

      let dbPath
      if (dataType === 'types') {
        dbPath = typesPath
      } else {
        dbPath = categoriesPath
      }

      fs.writeFile(dbPath, JSON.stringify(filteredList, null, 2), (error) => {
        if (error) {
          context.dispatch(
            'utils/floatingMessages',
            {
              message: 'Error deleting item!',
              type: 'error'
            },
            { root: true }
          )
          return
        }
        context.dispatch(
          'utils/floatingMessages',
          {
            message: 'Successfully updated!',
            type: 'success'
          },
          { root: true }
        )
        if (dataType === 'categories') {
          context.commit('UPDATE_CATEGORIES', filteredList)
        }
        if (dataType === 'types') {
          context.commit('UPDATE_TYPES', filteredList)
        }
      })
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
