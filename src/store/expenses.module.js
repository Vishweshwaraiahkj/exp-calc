import axios from 'axios'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    UPDATE_EXPENSES (state, payload) {
      state.list = payload
    }
  },
  actions: {
    async addToExpensesList (context, payload) {
      const res = await axios.post(
        process.env.VUE_APP_API_ENDPOINT + '/expenses', payload
      )
      const fullList = [...context.state.list, ...res.data]
      context.commit('UPDATE_EXPENSES', fullList)
    },
    removeFromExpensesList (context, payload) {
      const list = context.state.list
      const updatedExpenses = list.remove(
        'id',
        payload.id
      )
      context.commit('UPDATE_EXPENSES', updatedExpenses)
    },
    async fetchExistingExpenses (context) {
      if (!context.state.list?.length) {
        await axios
          .get(process.env.VUE_APP_API_ENDPOINT + '/expenses', {
            headers: {}
          })
          .then(response => response.data)
          .then(items => {
            context.commit('UPDATE_EXPENSES', items)
          })
      }
    },
    deleteById (context, payload) {
      if (context.state.list?.length && payload) {
        axios.delete(process.env.VUE_APP_API_ENDPOINT + `/expenses/${payload}`)
        const listOnFilter = context
          .state
          .list
          ?.filter(item => item.id !== payload)
        context.commit('UPDATE_EXPENSES', listOnFilter)
      } else {
        alert('Error Deleting Item!')
      }
    }
  },
  getters: {
    getExpenses: (state) => {
      return state.list
    }
  }
}
