<template>
  <div class="dashboard">
    <div class="container mt-3 card shadow-dark">
      <div class="row">
        <AddExpenses />
        <BriefBoard :balance-amount="200" />
      </div>
      <div class="row">
        <ExpensesTable v-if="expensesObject.length" :expensesObject="expensesObject" />
      </div>
    </div>
  </div>
</template>

<script>
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
    const expensesObject = [
      {
        type: 'expense',
        amount: 5000,
        date: '01-07-2022',
        category: 'Self'
      },
      {
        type: 'expense',
        amount: 17000,
        date: '30-06-2022',
        category: 'House construction'
      },
      {
        type: 'income',
        amount: 500000,
        date: '10-06-2022',
        category: 'Loan'
      },
      {
        type: 'expense',
        amount: 8700,
        date: '05-05-2022',
        category: 'Car service'
      }
    ]

    return {
      expensesObject
    }
  }
}
</script>
