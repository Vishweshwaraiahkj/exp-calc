import fs from 'fs'
import * as path from 'path'
import { IsValidObject } from '@/utils/globals'

export default {
  namespaced: true,
  state: {
    user: {
      workHistory: []
    }
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
    async updateUserData(context, { userData, type }) {
      const udPath = context.rootGetters['utils/getUserPath']
      if (!IsValidObject(userData)) return false
      if (!type) return false
      const dbPath = path.resolve(udPath + '/data/users.json')
      fs.writeFile(
        dbPath,
        JSON.stringify(userData, null, 2),
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
          context.commit('UPDATE_USER_DETAILS', userData)
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
    async updateWorkData(context, { workData, type }) {
      const udPath = context.rootGetters['utils/getUserPath']
      if (!IsValidObject(workData)) return false
      if (!type) return false
      const dbPath = path.resolve(udPath + '/data/users.json')
      const userDetails = context.state.user
      let workHistory = userDetails.workHistory || []
      if (type === 'update') {
        workHistory = workHistory?.map((i) => {
          if (i.id === workData.id) {
            return workData
          }
          return i
        })
      } else {
        workHistory.push(workData)
      }
      userDetails.workHistory = workHistory

      fs.writeFile(
        dbPath,
        JSON.stringify(userDetails, null, 2),
        { flag: 'w+' },
        (error) => {
          if (error) {
            return context.dispatch(
              'utils/floatingMessages',
              {
                message: 'Error updating work details!',
                type: 'error'
              },
              { root: true }
            )
          }
          context.commit('UPDATE_USER_DETAILS', userDetails)
          context.dispatch(
            'utils/floatingMessages',
            {
              message: 'Successfully updated work details!',
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
    },
    async deleteById(context, payload) {
      const udPath = context.rootGetters['utils/getUserPath']
      const dbPath = path.resolve(udPath + '/data/users.json')
      if (!payload) return false
      const userDetails = context.state.user
      const { workHistory } = userDetails
      const filteredList = workHistory?.filter((i) => i.id !== payload)
      userDetails.workHistory = filteredList

      fs.writeFile(
        dbPath,
        JSON.stringify(userDetails, null, 2),
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
          context.commit('UPDATE_USER_DETAILS', userDetails)
        }
      )
    }
  },
  getters: {
    userDetails: (state) => {
      return state.user
    }
  }
}
