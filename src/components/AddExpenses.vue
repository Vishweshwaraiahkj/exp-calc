<template>
  <div class="col-8 pt-3">
    <h2>Add Expense/Income</h2>
    <form class="col-12" id="addExpIncForm">
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
            :input-required="true"
            />
        </div>
        <div class="form-group col-6">
          <MasterSelect
            @selectedValues="checkedCategories"
            select-width="100%"
            select-label="Categories"
            select-placeholder="Select a category"
            :selectOptions="listOfCategories"
            :input-required="true"
            :resetTrue="resetInput"
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
            :input-required="true"
          />
        </div>
        <div class="form-group col-6">
          <MasterSelect
            @selectedValues="checkedTypes"
            select-width="100%"
            select-label="Type"
            select-placeholder="Select a type"
            :select-options="listOfTypes"
            :single-select="true"
            :input-required="true"
            :resetTrue="resetInput"
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
            :input-required="true"
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
import { v4 as uuidv4 } from 'uuid'
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
    const categoryList = ref([])
    const resetInput = ref(false)
    const checkedCategories = (data) => {
      categoryList.value = data
    }
    const checkedTypes = (data) => {
      typeList.value = data
    }
    const addExpenseOrIncome = (e) => {
      debugger
      const allInputs = [
        categoryList.value?.length,
        description.value,
        typeList.value?.length,
        amount.value,
        addeddate.value
      ]

      if (!allInputs.every(i => i)) {
        alert('You need to enter correct details!')
        return false
      }

      const detailsObj = {
        uid: uuidv4(),
        categoryList: categoryList.value,
        description: description.value,
        typeList: typeList.value,
        amount: amount.value,
        addeddate: addeddate.value
      }
      description.value = undefined
      typeList.value = undefined
      categoryList.value = undefined
      amount.value = undefined
      addeddate.value = undefined
      resetInput.value = true
      emit('addToExpIncList', detailsObj)
    }

    return {
      description,
      amount,
      typeList,
      checkedTypes,
      addeddate,
      checkedCategories,
      categoryList,
      addExpenseOrIncome,
      listOfCategories,
      listOfTypes,
      resetInput
    }
  }
}
</script>
