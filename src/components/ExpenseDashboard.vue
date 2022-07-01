<template>
  <div class="dashboard">
    <div class="container mt-3 card shadow-dark">
      <div class="row">
        <AddExpenses />
        <DisplayBoard :balance-amount=200 />
      </div>
      <ExpensesTable />
    </div>
  </div>
</template>

<script>
import AddExpenses from './AddExpenses.vue'
import DisplayBoard from './DisplayBoard.vue'
import ExpensesTable from './ExpensesTable.vue'

export default {
  name: 'ExpenseDashboard',
  components: {
    AddExpenses,
    DisplayBoard,
    ExpensesTable
  }
}
</script>
