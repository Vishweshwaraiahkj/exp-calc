import fs from 'fs'
import * as path from 'path'
import { UpdateArrayByKey, CustomSort } from '@/utils/globals'

export default {
  namespaced: true,
  state: {
    rent_data: []
  },
  mutations: {
    UPDATE_RENT_DATA(state, payload) {
      state.rent_data = payload
    }
  },
  actions: {
    async fetchRentData(context) {
      const udPath = context.rootGetters['utils/getUserPath']
      if (context.state.rent_data?.length) return false
      const dbPath = path.resolve(udPath + '/data/tools.json')
      if (udPath) {
        fs.readFile(dbPath, 'utf8', (err, data) => {
          if (err) {
            return context.dispatch(
              'utils/floatingMessages',
              {
                message: 'Error getting existing types!',
                type: 'error'
              },
              { root: true }
            )
          }
          if (!data) {
            return context.dispatch(
              'utils/floatingMessages',
              {
                message: 'No Rent data! Please add one.',
                type: 'info'
              },
              { root: true }
            )
          }
          const dbData = JSON.parse(data).rent_data
          context.commit('UPDATE_RENT_DATA', dbData)
        })
      }
    },
    async updateTasks(context, { dataObj, type }) {
      const udPath = context.rootGetters['utils/getUserPath']
      const existingData = context.state.tasks
      let updatedData = []
      if (type === 'update') {
        updatedData = UpdateArrayByKey(existingData, 'id', dataObj)
      } else {
        updatedData = [...existingData, dataObj]
      }

      const dbPath = path.resolve(udPath + '/data/tasks.json')
      fs.writeFile(
        dbPath,
        JSON.stringify(updatedData, null, 2),
        { flag: 'w+' },
        (error) => {
          if (error) {
            return context.dispatch(
              'utils/floatingMessages',
              {
                message: 'Error adding item!',
                type: 'error'
              },
              { root: true }
            )
          }
          context.dispatch(
            'utils/floatingMessages',
            {
              message: 'Successfully added/updated!',
              type: 'success'
            },
            { root: true }
          )

          context.commit('UPDATE_TASKS', updatedData)
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
      } else if (dataType === 'categories') {
        dbPath = path.resolve(udPath + '/data/categories.json')
      } else if (dataType === 'tasks') {
        dbPath = path.resolve(udPath + '/data/tasks.json')
      }

      fs.writeFile(
        dbPath,
        JSON.stringify(filteredList, null, 2),
        { flag: 'w+' },
        (error) => {
          if (error) {
            return context.dispatch(
              'utils/floatingMessages',
              {
                message: 'Error deleting item!',
                type: 'error'
              },
              { root: true }
            )
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
          if (dataType === 'tasks') {
            context.commit('UPDATE_TASKS', filteredList)
          }
        }
      )
    }
  },
  getters: {
    getRentData: (state) => {
      return CustomSort(state.rent_data)
    }
  }
}
