<template>
  <MasterModal
    triggerId="addExp"
    modalSize="medium"
    btnClasses="add-btn"
    @footerConfirm="addItem"
    @footerCancel="addCancel"
  >
    <template #trigger>
      <MasterIcon size="medium" svgName="add"/>
    </template>
      <template #header>
      <h2>Add Expense/Income</h2>
    </template>
    <template #default>
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
      </form>
    </template>
    <template #footer>
    </template>
  </MasterModal>
</template>

<script>
import { ref } from 'vue'
import { v4 as uuids4 } from 'uuid'
import MasterSelect from '@/components/MasterInputs/MasterSelect.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'
import MasterModal from '@/components/MasterModal.vue'
import MasterIcon from './MasterIcon.vue'
import allCategories from '@/data/categories'
import allTypes from '@/data/types'
export default {
  name: 'AddExpenses',
  components: {
    MasterSelect,
    MasterInput,
    MasterModal,
    MasterIcon
  },
  emits: ['addToExpIncList'],
  setup (props, context) {
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
        id: uuids4(),
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
      context.emit('addToExpIncList', detailsObj)
      return true
    }

    const addItem = () => {
      const res = addExpenseOrIncome()
      return res
    }

    const addCancel = () => {}

    return {
      description,
      amount,
      typeList,
      checkedTypes,
      addeddate,
      checkedCategories,
      categoryList,
      listOfCategories,
      listOfTypes,
      resetInput,
      addItem,
      addCancel
    }
  }
}
</script>
