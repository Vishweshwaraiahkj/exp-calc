export default {
  namespaced: true,
  state: {
    firstName: 'Vish',
    middleName: 'K',
    lastName: 'J',
    designation: 'Web Developer'
  },
  getters: {
    userDetails: (state) => {
      return {
        fullName: `${state.firstName} ${state.middleName} ${state.lastName}`,
        designation: state.designation
      }
    }
  }
}
