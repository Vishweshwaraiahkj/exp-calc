import axios from 'axios'
import { PushUniqueObjects, IsValidObject } from '@/utils/globals'

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
      try {
        const res = await axios.patch(
          process.env.VUE_APP_API_ENDPOINT + `/expenses/${payload.id}`,
          payload
        )
        const fullList = context.state.list?.map((i) => {
          if (i.id === res.data?.id) {
            return res.data
          }
          return i
        })
        context.commit('UPDATE_EXPENSES', fullList)
        context.dispatch(
          'utils/floatingMessages',
          {
            message: 'Successfully updated!',
            type: 'success'
          },
          { root: true }
        )
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
    async addToExpensesList(context, payload) {
      try {
        const res = await axios.post(
          process.env.VUE_APP_API_ENDPOINT + '/expenses',
          payload
        )
        const fullList = PushUniqueObjects(context.state.list, res.data)
        context.commit('UPDATE_EXPENSES', fullList)
        context.dispatch(
          'utils/floatingMessages',
          {
            message: 'Successfully Added!',
            type: 'success'
          },
          { root: true }
        )
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
    removeFromExpensesList(context, payload) {
      const list = context.state.list
      const updatedExpenses = list.remove('id', payload.id)
      context.commit('UPDATE_EXPENSES', updatedExpenses)
    },
    async fetchExistingExpenses(context) {
      if (context.state.list?.length) return false
      try {
        await axios
          .get(process.env.VUE_APP_API_ENDPOINT + '/expenses')
          .then((response) => response.data)
          .then((items) => {
            context.commit('UPDATE_EXPENSES', items)
          })
      } catch (error) {
        alert('Error getting existing data!')
      }
    },
    async deleteById(context, payload) {
      if (!payload) return false
      try {
        await axios.delete(
          process.env.VUE_APP_API_ENDPOINT + `/expenses/${payload}`
        )
        const filteredList = context.state.list?.filter(
          (item) => item.id !== payload
        )
        context.commit('UPDATE_EXPENSES', filteredList)
      } catch (error) {
        alert('Error Deleting Item!')
      }
    }
  },
  getters: {
    getExpenses: (state) => {
      return state.list
    },
    getDataByType: (state) => (type) => {
      const filteredData = state.list?.filter((i) => {
        return i.type[0]?.optValue === type
      })

      const dataValue = filteredData?.reduce((acc, item) => {
        return Number(acc) + Number(item.amount)
      }, 0)

      return dataValue
    }
  }
}
