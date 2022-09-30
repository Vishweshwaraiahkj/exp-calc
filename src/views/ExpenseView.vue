<template lang="html">
  <ExpenseHome v-if="ExpenseData.length" :dataArray="ExpenseData" />
  <div v-else>
    <MasterSpinner titleText="loading table data...!" size="large" noBg />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import ExpenseHome from '@/components/ExpenseHome.vue'
import MasterSpinner from '@/components/MasterUtils/MasterSpinner.vue'

const store = useStore()
const ExpenseData = computed(() => store.getters['expenses/getExpenses'])

onMounted(() => {
  document.title = 'Expenses Calculator'
  if (!ExpenseData.value.length) {
    store.dispatch('expenses/fetchExistingExpenses')
  }
})
</script>
