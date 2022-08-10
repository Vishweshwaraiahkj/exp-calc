<template>
  <div class="dashboard">
    <div class="container my-3">
      <div class="row details-box relative">
        <AddExpenses
          @emitChangeList="addToList"
          triggerId="addExp"
        />
        <BriefBoard v-if="dataArray.length" />
      </div>
      <div class="row list-box">
        <ExpensesTable
          v-if="dataArray.length"
          :dataArray="dataArray"
        />
        <h3 v-else class="no-data-text">No data added yet! Add some now.</h3>
      </div>
    </div>
    <MasterNotifier
      v-if="showMessage"
      type="info"
      position="top-center"
      message="Page loaded successfully!"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import AddExpenses from '@/components/AddExpenses.vue'
import BriefBoard from '@/components/BriefBoard.vue'
import ExpensesTable from '@/components/ExpensesTable.vue'
import MasterNotifier from '@/components/MasterUtils/MasterNotifier.vue'
import { pushUniqueObjects } from '@/utils/globals'

const store = useStore()
const showMessage = ref(false)
const dataArray = computed(() => store.state.expenses.list)

const addToList = (dataList) => {
  const newObj = {
    id: dataList.id,
    description: dataList.description,
    type: dataList.typeList,
    amount: dataList.amount,
    date: dataList.addeddate,
    category: dataList.categoryList
  }

  dataArray.value = pushUniqueObjects(dataArray.value, newObj)
  store.dispatch('expenses/addToExpensesList', newObj)
}

</script>
