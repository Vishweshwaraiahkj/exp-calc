<template lang="html">
  <div class="dashboard">
    <div v-if="dataArray.length" class="container my-3">
      <div class="row details-box relative">
        <div class="btn-header">
          <h1>Expenses Table</h1>
          <AddExpenses
            @emitDataUpdate="addToList"
            triggerId="addExp"
            actionType="add"
          />
        </div>
      </div>
      <div class="row list-box">
        <ExpensesTable
          :dataArray="filteredData"
          :showAll="allRows"
          :totalData="dataArray"
          @emitDataToShow="dataToShow"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
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
const allRows = ref(true)

watchEffect(() => {
  if (allRows.value) {
    filteredData.value = props.dataArray
  } else {
    filteredData.value = FilterByMonth(props.dataArray)
  }
})

const dataToShow = (value) => {
  if (value === 'ShowAll') {
    filteredData.value = props.dataArray
  } else {
    filteredData.value = FilterByMonth(props.dataArray, value)
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
</script>
