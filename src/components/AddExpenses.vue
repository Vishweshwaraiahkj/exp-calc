<template>
  <div class="col-8 pt-3">
    <h2>Add Expense/Income</h2>
    <form class="col-12">
      <div class="row">
        <div class="form-group col-6">
          <MasterInput
            input-id="descriptionId"
            input-label="Description"
            input-name="description"
            input-placeholder="Add description"
            input-type="text"
            v-model:input-value="description"
            input-width="100%"
            />
        </div>
        <div class="form-group col-6">
          <MasterSelect
            @selectedValues="checkedCategories"
            select-width="100%"
            select-label="Categories"
            select-placeholder="Select a category"
            :selectOptions="listOfCategories"
          />
        </div>
      </div>
      <div class="row">
        <div class="form-group col-6">
          <MasterInput
            input-id="typeofAmount"
            input-label="Amount"
            input-name="amount"
            input-placeholder="Add your amount"
            input-type="number"
            v-model:input-value="amount"
            input-width="100%"
          />
        </div>
        <div class="form-group col-6">
          <MasterSelect
            @selectedValues="checkedTypes"
            select-width="100%"
            select-label="Type"
            select-placeholder="Select a type"
            :selectOptions="listOfTypes"
          />
        </div>
      </div>
      <div class="row">
        <div class="form-group col-6">
          <MasterInput
            input-id="addedDate"
            input-label="Date"
            input-name="addeddate"
            input-placeholder="Date of expense/income"
            input-type="date"
            v-model:input-value="addeddate"
            input-width="100%"
          />
        </div>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        @click="addExpenseOrIncome"
      >Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import MasterSelect from '@/components/MasterInputs/MasterSelect.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'
import allCategories from '@/data/categories.js'
import allTypes from '@/data/types.js'
export default {
  name: 'AddExpenses',
  components: { MasterSelect, MasterInput },
  emits: ['addToExpIncList'],
  setup (props, { emit }) {
    const listOfCategories = ref(allCategories)
    const listOfTypes = ref(allTypes)
    const description = ref(null)
    const amount = ref(null)
    const typeList = ref([])
    const addeddate = ref(null)
    const selectedArray = ref([])
    const checkedCategories = (data) => {
      selectedArray.value = data.value
    }
    const checkedTypes = (data) => {
      typeList.value = data.value
    }
    const addExpenseOrIncome = (e) => {
      const detailsObj = {
        selectedArray: selectedArray.value,
        description: description.value,
        typeList: typeList.value,
        amount: amount.value,
        addeddate: addeddate.value
      }
      emit('addToExpIncList', detailsObj)
    }
    return {
      description,
      amount,
      typeList,
      checkedTypes,
      addeddate,
      checkedCategories,
      selectedArray,
      addExpenseOrIncome,
      listOfCategories,
      listOfTypes
    }
  }
}
</script>
