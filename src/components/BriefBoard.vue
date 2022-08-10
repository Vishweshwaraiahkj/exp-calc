<template>
  <div v-if="expList" class="col-12">
    <div class="exp-container shadow-dark">
      <div class="balance-box">
        <h4>Your Balance</h4>
        <h1 id="balance" class="balance-amount">Rs. {{ balanceMoney }}</h1>
      </div>
      <div class="income-count">
        <h4 class="money plus">Income</h4>
        <p id="money-plus" class="money plus">Rs. +{{ incomeValue }}</p>
      </div>
      <div class="expense-count">
        <h4 class="money minus">Expense</h4>
        <p id="money-minus" class="money minus">Rs. -{{ expenseValue }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const balanceMoney = ref(0)
const expenseValue = ref(0)
const incomeValue = ref(0)
const expList = ref(store.state.expenses.list)

const filteredExpenses = expList.value?.filter((i) => {
  return i.type === 'expense'
})

const filteredIncomes = expList.value?.filter((i) => {
  return i.type === 'income'
})

expenseValue.value = filteredExpenses?.reduce((acc, item) => {
  return Number(acc) + Number(item.amount)
}, 0)

incomeValue.value = filteredIncomes?.reduce((acc, item) => {
  return Number(acc) + Number(item.amount)
}, 0)

balanceMoney.value = incomeValue.value - expenseValue.value

</script>
