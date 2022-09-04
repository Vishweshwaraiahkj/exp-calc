<template>
  <div class="dashboard">
    <div class="container my-3">
      <div class="row details-box relative">
        <div class="btn-header">
          <h1>Expenses Table</h1>
          <AddExpenses
            @emitDataUpdate="addToList"
            triggerId="addExp"
            actionType="add"
          />
        </div>
        <BriefBoard v-if="dataArray.length" />
      </div>
      <div class="row list-box">
        <ExpensesTable v-if="dataArray.length" :dataArray="dataArray" />
        <h3 v-else class="no-data-text">No data added yet! Add some now.</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AddExpenses from '@/components/AddExpenses.vue'
import BriefBoard from '@/components/BriefBoard.vue'
import ExpensesTable from '@/components/ExpensesTable.vue'

const store = useStore()
const dataArray = computed(() => store.state.expenses.list)

const addToList = (dataList, type) => {
  if (type !== 'add') return false
  const newObj = {
    id: dataList.id,
    description: dataList.description,
    type: dataList.typeList,
    amount: dataList.amount,
    date: dataList.addeddate,
    category: dataList.categoryList
  }

  store.dispatch('expenses/addToExpensesList', newObj)
}
</script>
