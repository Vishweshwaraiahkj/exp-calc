<template>
  <ExpenseDashboard />
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import ExpenseDashboard from '@/components/ExpenseDashboard.vue'

const store = useStore()
onMounted(() => {
  document.title = 'Expenses Calculator'
  const ExpenseData = computed(() => store.getters['expenses/getExpenses'])
  if (!ExpenseData.value.length) {
    store.dispatch('expenses/fetchExistingExpenses')
  }
})
</script>
