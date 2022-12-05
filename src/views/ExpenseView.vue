<template lang="html">
  <div class="dashboard pt-3">
    <div class="container container-bg">
      <ExpenseHome
        v-if="ExpenseData?.length && Categories?.length && Types?.length"
        :dataArray="ExpenseData"
      />
      <MasterSpinner v-else :titleText="loaderTxt" size="large" noBg />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, provide, watchEffect } from 'vue'
import { useStore } from 'vuex'
import ExpenseHome from '@/components/ExpenseHome.vue'
import MasterSpinner from '@/components/MasterUtils/MasterSpinner.vue'

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
</script>
