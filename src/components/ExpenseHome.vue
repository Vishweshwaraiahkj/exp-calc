<template lang="html">
  <div v-if="dataArray.length">
    <div class="row details-box relative">
      <div class="btn-header">
        <h1>Expenses Table</h1>
        <AddExpenses
          @emitDataUpdate="addToList"
          triggerId="addExp"
          actionType="add"
          fillColor="var(--item-color)"
        />
      </div>
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
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useStore } from 'vuex'
import { FilterByMonth } from '@/utils/globals'
import AddExpenses from '@/components/AddExpenses.vue'
import ExpensesTable from '@/components/ExpensesTable.vue'

const props = defineProps({
  dataArray: {
    default: () => [],
    type: Array
  }
})

const store = useStore()

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

onMounted(() => {
  filterValue.value = 'ShowAll'
  allRows.value = true
})
</script>
