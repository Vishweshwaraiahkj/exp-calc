import { createStore } from 'vuex'
import UserModule from '@/store/user.module'
import AirportsModule from '@/store/airports.module'
import ExpensesModule from '@/store/expenses.module'
import UtilsModule from '@/store/utils.module'

// create a new store instance
const store = createStore({
  modules: {
    user: UserModule,
    airports: AirportsModule,
    expenses: ExpensesModule,
    utils: UtilsModule
  }
})

export default store
