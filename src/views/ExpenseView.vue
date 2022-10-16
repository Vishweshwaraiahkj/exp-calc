<template lang="html">
  <ExpenseHome
    v-if="ExpenseData?.length && Categories?.length && Types?.length"
    :dataArray="ExpenseData"
  />
  <div v-else>
    <MasterSpinner titleText="loading table data...!" size="large" noBg />
  </div>
</template>

<script setup>
import { onMounted, computed, provide } from 'vue'
import { useStore } from 'vuex'
import ExpenseHome from '@/components/ExpenseHome.vue'
import MasterSpinner from '@/components/MasterUtils/MasterSpinner.vue'

const store = useStore()

const ExpenseData = computed(() => store.getters['expenses/getExpenses'])
const Categories = computed(() => store.getters['utils/getAllCategories'])
const Types = computed(() => store.getters['utils/getAllTypes'])

provide('categories', Categories)
provide('types', Types)

onMounted(() => {
  document.title = 'Expenses Calculator'
  if (!ExpenseData.value.length) {
    store.dispatch('expenses/fetchExistingExpenses')
  }
  if (!Categories.value?.length) {
    store.dispatch('utils/fetchAllCategories')
  }
  if (!Types.value?.length) {
    store.dispatch('utils/fetchAllTypes')
  }
})
</script>
