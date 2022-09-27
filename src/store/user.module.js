export default {
  namespaced: true,
  state: {
    firstName: 'Vish',
    middleName: 'K',
    lastName: 'J'
  },
  getters: {
    fullName: (state) => {
      return `${state.firstName} ${state.middleName} ${state.lastName}`
    }
  }
}
