<template>
  <ExpenseDashboard />
</template>

<script>
import ExpenseDashboard from '@/components/ExpenseDashboard.vue'
export default {
  name: 'ExpenseView',
  components: { ExpenseDashboard },
  mounted () {
    document.title = 'Expenses Calculator'
  }
}
</script>
