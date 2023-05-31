<template lang="html">
  <div
    class="container container-bg shadow-dark"
    v-if="ExpenseData?.length && Categories?.length && Types?.length"
  >
    <ExpenseHome :dataArray="ExpenseData" />
  </div>
  <MasterSpinner v-else :titleText="loaderTxt" size="large" noBg />
  <AddExpenses
    @emitDataUpdate="addToList"
    actionType="add"
    fillColor="var(--item-color)"
    triggerId="addExp"
  />
</template>

<script setup>
import { ref, onMounted, computed, provide, watchEffect } from 'vue'
import { useStore } from 'vuex'
import ExpenseHome from '@/components/ExpenseHome.vue'
import MasterSpinner from '@/components/MasterUtils/MasterSpinner.vue'
import AddExpenses from '@/components/AddExpenses.vue'

const store = useStore()
const loaderTxt = ref('Loading table data...!')

const ExpenseData = computed(() => store.getters['expenses/getExpenses'])
const Categories = computed(() => store.getters['utils/getAllCategories'])
const Types = computed(() => store.getters['utils/getAllTypes'])

watchEffect(() => {
  if (!ExpenseData.value.length) {
    loaderTxt.value = 'No results found, Please add some!'
  }
})

provide('categories', Categories)
provide('types', Types)

onMounted(() => {
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
