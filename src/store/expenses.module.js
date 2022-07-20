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
    addToExpensesList (context, payload) {
      context.commit('UPDATE_EXPENSES', payload)
    },
    removeFromExpensesList (context, payload) {
      const list = context.state.list
      const updatedExpenses = list.remove(
        'uid',
        payload.uid
      )
      context.commit('UPDATE_EXPENSES', updatedExpenses)
    }
  }
}
