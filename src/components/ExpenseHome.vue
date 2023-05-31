<template lang="html">
  <template v-if="dataArray.length">
    <div class="row details-box relative">
      <h1 class="btn-header">Expenses Table</h1>
    </div>
    <div class="row list-box">
      <ExpensesTable
        :dataArray="filteredData"
        :showAll="allRows"
        :totalData="dataArray"
        :defaultRows="5"
        @emitDataToShow="dataToShow"
      />
    </div>
  </template>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { FilterByMonth } from '@/utils/globals'
import ExpensesTable from '@/components/ExpensesTable.vue'

const props = defineProps({
  dataArray: {
    default: () => [],
    type: Array
  }
})

const filteredData = ref([])
const filterValue = ref('ShowAll')
const allRows = ref(true)

watchEffect(() => {
  if (allRows.value && filterValue.value === 'ShowAll') {
    filteredData.value = props.dataArray
  } else {
    filteredData.value = FilterByMonth(props.dataArray, filterValue.value)
  }
})

const dataToShow = (value) => {
  if (value === 'ShowAll') {
    allRows.value = true
    filterValue.value = value
  } else {
    allRows.value = false
    filterValue.value = value
  }
}

onMounted(() => {
  filterValue.value = 'ShowAll'
  allRows.value = true
})
</script>
