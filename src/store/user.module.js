import fs from 'fs'
import * as path from 'path'
import { IsValidObject } from '@/utils/globals'

export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    GET_USER_DETAILS(state, payload) {
      state.user = payload
    },
    UPDATE_USER_DETAILS(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async updateUserData(context, payload) {
      const udPath = context.rootGetters['utils/getUserPath']
      if (!IsValidObject(payload)) return false
      const dbPath = path.resolve(udPath + '/data/users.json')
      fs.writeFile(
        dbPath,
        JSON.stringify(payload, null, 2),
        { flag: 'w+' },
        (error) => {
          if (error) {
            return context.dispatch(
              'utils/floatingMessages',
              {
                message: 'Error updating user!',
                type: 'error'
              },
              { root: true }
            )
          }
          context.commit('UPDATE_USER_DETAILS', payload)
          context.dispatch(
            'utils/floatingMessages',
            {
              message: 'Successfully updated user details!',
              type: 'success'
            },
            { root: true }
          )
        }
      )
    },
    async fetchUserDetails(context) {
      const udPath = context.rootGetters['utils/getUserPath']
      if (IsValidObject(context.state.user)) return false
      const dbPath = path.resolve(udPath + '/data/users.json')
      if (udPath) {
        fs.readFile(dbPath, 'utf8', (err, data) => {
          if (err) {
            context.dispatch(
              'utils/floatingMessages',
              {
                message: 'Error getting existing user details!',
                type: 'error'
              },
              { root: true }
            )
          }
          if (!data) return
          const userData = JSON.parse(data)
          context.commit('GET_USER_DETAILS', userData)
        })
      }
    }
  },
  getters: {
    userDetails: (state) => {
      return state.user
    }
  }
}
