import { createStore } from 'vuex'
import UserModule from '@/store/user.module.js'
import AirportsModule from '@/store/airports.module.js'

// create a new store instance
const store = createStore({
  modules: {
    user: UserModule,
    airports: AirportsModule
  }
})

export default store
