<template>
  <AppHeader />
  <ExpenseDashboard />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import ExpenseDashboard from '@/components/ExpenseDashboard.vue'
export default {
  name: 'ExpenseView',
  components: { AppHeader, ExpenseDashboard },
  mounted () {
    document.title = 'Expenses Calculator'
  }
}
</script>
