<template>
  <div class="dashboard">
    <div class="container mt-3 card shadow-dark">
      <div class="row">
        <AddExpenses @addToExpIncList="addToList"/>
        <BriefBoard :balance-amount="200" />
      </div>
      <div class="row">
        <ExpensesTable v-if="dataArray.length" :dataArray="dataArray" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AddExpenses from './AddExpenses.vue'
import BriefBoard from './BriefBoard.vue'
import ExpensesTable from './ExpensesTable.vue'

export default {
  name: 'ExpenseDashboard',
  components: {
    AddExpenses,
    BriefBoard,
    ExpensesTable
  },
  setup () {
    const dataArray = ref([])

    const addToList = (dataList) => {
      dataArray.value.push({
        description: dataList.description,
        type: dataList.typeList,
        amount: dataList.amount,
        date: dataList.addeddate,
        category: dataList.selectedArray
      })
    }

    return {
      dataArray,
      addToList
    }
  }
}
</script>
