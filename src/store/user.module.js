export default {
  namespaced: true,
  state: {
    firstName: 'Vishweshwarayya',
    middleName: 'Kallappa',
    lastName: 'Janagoud'
  },
  getters: {
    fullName: (state) => {
      return `${state.firstName} ${state.middleName} ${state.lastName}`
    }
  }
}
