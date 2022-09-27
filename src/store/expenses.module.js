import { PushUniqueObjects, IsValidObject } from '@/utils/globals'
import fs from 'fs'
import * as path from 'path'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    UPDATE_EXPENSES(state, payload) {
      state.list = payload
    }
  },
  actions: {
    async updateExpensesList(context, payload) {
      const udPath = context.rootGetters['utils/getUserPath']
      if (!IsValidObject(payload)) return false
      const dbPath = path.resolve(udPath + '/data/expenses.json')
      const fullList = context.state.list?.map((i) => {
        if (i.id === payload?.id) {
          return payload
        }
        return i
      })

      fs.writeFile(
        dbPath,
        JSON.stringify(fullList, null, 2),
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
          context.commit('UPDATE_EXPENSES', fullList)
          context.dispatch(
            'utils/floatingMessages',
            {
              message: 'Successfully updated!',
              type: 'success'
            },
            { root: true }
          )
        }
      )
    },
    async addToExpensesList(context, payload) {
      const udPath = context.rootGetters['utils/getUserPath']
      const fullList = PushUniqueObjects(context.state.list, payload)
      const dbPath = path.resolve(udPath + '/data/expenses.json')
      fs.writeFile(
        dbPath,
        JSON.stringify(fullList, null, 2),
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
          context.commit('UPDATE_EXPENSES', fullList)
          context.dispatch(
            'utils/floatingMessages',
            {
              message: 'Successfully Added!',
              type: 'success'
            },
            { root: true }
          )
        }
      )
    },
    async fetchExistingExpenses(context) {
      const udPath = context.rootGetters['utils/getUserPath']
      if (!udPath) return false
      if (context.state.list?.length) return false
      const dbPath = path.resolve(udPath + '/data/expenses.json')
      let data = ''
      const readStream = fs.createReadStream(dbPath, 'utf-8')
      readStream.on('error', () => {
        context.dispatch(
          'utils/floatingMessages',
          {
            message: 'Error getting existing data!',
            type: 'error'
          },
          { root: true }
        )
      })
      readStream.on('data', (chunk) => (data += chunk))
      readStream.on('end', () => {
        const dbData = JSON.parse(data)
        context.commit('UPDATE_EXPENSES', dbData)
      })
    },
    async deleteById(context, payload) {
      const udPath = context.rootGetters['utils/getUserPath']
      if (!payload) return false
      const dbPath = path.resolve(udPath + '/data/expenses.json')
      const filteredList = context.state.list?.filter(
        (item) => item.id !== payload
      )
      fs.writeFile(
        dbPath,
        JSON.stringify(filteredList, null, 2),
        { flag: 'w+' },
        (e) => {
          if (e) {
            context.dispatch(
              'utils/floatingMessages',
              {
                message: 'Error Deleting Item!',
                type: 'error'
              },
              { root: true }
            )
            return
          }
          context.commit('UPDATE_EXPENSES', filteredList)
        }
      )
    }
  },
  getters: {
    getExpenses: (state) => {
      return state.list
    }
  }
}
