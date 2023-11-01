import { createStore } from 'vuex'
import UserModule from '@/store/user.module'
import ExpensesModule from '@/store/expenses.module'
import UtilsModule from '@/store/utils.module'
import ToolsModule from '@/store/tools.module'

// create a new store instance
const store = createStore({
  modules: {
    user: UserModule,
    expenses: ExpensesModule,
    utils: UtilsModule,
    tools: ToolsModule
  }
})

export default store
