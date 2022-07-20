<template>
  <div class="dashboard">
    <div class="container mt-3 pb-3 card shadow-dark">
      <div class="row">
        <AddExpenses @addToExpIncList="addToList"/>
        <BriefBoard :balance-amount="200" />
      </div>
      <div class="row">
        <ExpensesTable
          v-if="dataArray.length"
          :dataArray="dataArray"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import AddExpenses from '@/components/AddExpenses.vue'
import BriefBoard from '@/components/BriefBoard.vue'
import ExpensesTable from '@/components/ExpensesTable.vue'
import { pushUniqueObjects } from '@/utils/globals'

export default {
  name: 'ExpenseDashboard',
  components: {
    AddExpenses,
    BriefBoard,
    ExpensesTable
  },
  setup () {
    const store = useStore()
    const dataArray = ref([])

    const addToList = (dataList) => {
      const newObj = {
        uid: dataList.uid,
        description: dataList.description,
        type: dataList.typeList,
        amount: dataList.amount,
        date: dataList.addeddate,
        category: dataList.categoryList
      }

      dataArray.value = pushUniqueObjects(dataArray.value, newObj)
      store.dispatch('expenses/addToExpensesList', dataArray.value)
    }

    return {
      dataArray: computed(() => store.state.expenses.list),
      addToList
    }
  }
}
</script>
