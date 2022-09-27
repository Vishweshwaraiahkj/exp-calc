import { IsValidObject, UpdateArrayByKey } from '@/utils/globals'
import fs from 'fs'
import * as path from 'path'

export default {
  namespaced: true,
  state: {
    globalMessage: {
      type: '',
      message: ''
    },
    categories: [],
    types: [],
    user_path: ''
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
    },
    SET_USER_PATH(state, payload) {
      state.user_path = payload
    }
  },
  actions: {
    floatingMessages(context, payload) {
      context.commit('UPDATE_MESSAGE', payload)
    },
    async toggleFavorite(context, { item, type }) {
      const udPath = context.rootGetters['utils/getUserPath']
      if (!IsValidObject(item)) return false
      const existingData = context.state[type]
      const favStatus = item.favorite
      const updatedItem = {
        ...item,
        favorite: !favStatus
      }
      let dbPath
      if (type === 'types') {
        dbPath = path.resolve(udPath + '/data/types.json')
      } else {
        dbPath = path.resolve(udPath + '/data/categories.json')
      }
      const updatedData = UpdateArrayByKey(existingData, 'id', updatedItem)
      fs.writeFile(
        dbPath,
        JSON.stringify(updatedData, null, 2),
        { flag: 'w+' },
        (error) => {
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
        }
      )
    },
    async fetchAllCategories(context) {
      const udPath = context.rootGetters['utils/getUserPath']
      if (context.state.categories?.length) return false
      if (udPath) {
        const dbPath = path.resolve(udPath + '/data/categories.json')
        fs.readFile(dbPath, 'utf8', (err, data) => {
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
      }
    },
    async fetchAllTypes(context) {
      const udPath = context.rootGetters['utils/getUserPath']
      if (context.state.types?.length) return false
      const dbPath = path.resolve(udPath + '/data/types.json')
      if (udPath) {
        fs.readFile(dbPath, 'utf8', (err, data) => {
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
      }
    },
    async addToList(context, { dataObj, dataType }) {
      const udPath = context.rootGetters['utils/getUserPath']
      const existingData = context.state[dataType]
      const updatedData = [...existingData, dataObj]
      let dbPath
      if (dataType === 'types') {
        dbPath = path.resolve(udPath + '/data/types.json')
      } else {
        dbPath = path.resolve(udPath + '/data/categories.json')
      }
      fs.writeFile(
        dbPath,
        JSON.stringify(updatedData, null, 2),
        { flag: 'w+' },
        (error) => {
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
        }
      )
    },
    async updateList(context, { dataObj, dataType }) {
      const udPath = context.rootGetters['utils/getUserPath']
      const existingData = context.state[dataType]
      const updatedData = UpdateArrayByKey(existingData, 'id', dataObj)
      let dbPath
      if (dataType === 'types') {
        dbPath = path.resolve(udPath + '/data/types.json')
      } else {
        dbPath = path.resolve(udPath + '/data/categories.json')
      }
      fs.writeFile(
        dbPath,
        JSON.stringify(updatedData, null, 2),
        { flag: 'w+' },
        (error) => {
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
        }
      )
    },
    async deleteById(context, { dataId, dataType }) {
      const udPath = context.rootGetters['utils/getUserPath']
      if (!dataId || !dataType) return false
      const filteredList = context.state[dataType]?.filter(
        (i) => i.id !== dataId
      )
      let dbPath
      if (dataType === 'types') {
        dbPath = path.resolve(udPath + '/data/types.json')
      } else {
        dbPath = path.resolve(udPath + '/data/categories.json')
      }
      fs.writeFile(
        dbPath,
        JSON.stringify(filteredList, null, 2),
        { flag: 'wx' },
        (error) => {
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
        }
      )
    },
    setUserPath(context, payload) {
      if (payload) {
        context.commit('SET_USER_PATH', payload)
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
    },
    getUserPath: (state) => {
      return state.user_path
    }
  }
}
