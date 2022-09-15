import { PushUniqueObjects, IsValidObject } from '@/utils/globals'
import fs from 'fs'
import * as path from 'path'

const dbPath = path.join(process.cwd(), 'src/data/expenses.json')

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
      if (!IsValidObject(payload)) return false

      const fullList = context.state.list?.map((i) => {
        if (i.id === payload?.id) {
          return payload
        }
        return i
      })

      fs.writeFile(dbPath, JSON.stringify(fullList, null, 2), (error) => {
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
      })
    },
    async addToExpensesList(context, payload) {
      const fullList = PushUniqueObjects(context.state.list, payload)
      fs.writeFile(dbPath, JSON.stringify(fullList, null, 2), (error) => {
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
      })
    },
    async fetchExistingExpenses(context) {
      if (context.state.list?.length) return false
      fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
          context.dispatch(
            'utils/floatingMessages',
            {
              message: 'Error getting existing data!',
              type: 'error'
            },
            { root: true }
          )
        }
        const dbData = JSON.parse(data)
        context.commit('UPDATE_EXPENSES', dbData)
      })
    },
    async deleteById(context, payload) {
      if (!payload) return false

      const filteredList = context.state.list?.filter(
        (item) => item.id !== payload
      )

      fs.writeFile(dbPath, JSON.stringify(filteredList, null, 2), (error) => {
        if (error) {
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
      })
    }
  },
  getters: {
    getExpenses: (state) => {
      return state.list
    }
  }
}
