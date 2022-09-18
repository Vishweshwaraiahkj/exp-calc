<template lang="html">
  <div class="dashboard">
    <div v-if="dataArray" class="container my-3">
      <div class="row details-box relative">
        <div class="btn-header">
          <h1>Expenses Table</h1>
          <AddExpenses
            @emitDataUpdate="addToList"
            triggerId="addExp"
            actionType="add"
          />
        </div>
        <BriefBoard v-if="filteredData.length" :dataList="filteredData" />
      </div>
      <div class="row list-box">
        <ExpensesTable
          :dataArray="filteredData"
          :showAll="allRows"
          @emitDataToShow="dataToShow"
        />
      </div>
    </div>
    <div v-else>Loading Data...</div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { FilterByMonth } from '@/utils/globals'
import AddExpenses from '@/components/AddExpenses.vue'
import BriefBoard from '@/components/BriefBoard.vue'
import ExpensesTable from '@/components/ExpensesTable.vue'

const store = useStore()
const dataArray = computed(() => store.state.expenses.list)

const filteredData = ref([])
const allRows = ref(true)

watchEffect(() => {
  if (allRows.value) {
    filteredData.value = dataArray.value
  } else {
    filteredData.value = FilterByMonth(dataArray.value)
  }
})

const dataToShow = (value) => {
  if (value === 'ShowAll') {
    filteredData.value = dataArray.value
  } else {
    filteredData.value = FilterByMonth(dataArray.value, value)
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
