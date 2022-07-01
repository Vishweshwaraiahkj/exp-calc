<template>
  <div class="col-8 pt-3">
    <h2>Add Expenses</h2>
    <form class="col-12">
      <div class="row">
        <div class="form-group col-6">
          <MasterInput
            input-id="descriptionId"
            input-label="Description"
            input-name="description"
            input-placeholder="Add description"
            input-type="text"
            input-value=""
            input-width="100%"
          />
        </div>
        <div class="form-group col-6">
          <MasterSelect
            select-width="100%"
            select-label="Categories"
            select-placeholder="Select a category"
          />
        </div>
      </div>
      <div class="row">
        <div class="form-group col-6">
          <MasterInput
            input-id="expenseAmount"
            input-label="Expense"
            input-name="expense"
            input-placeholder="Add your expense"
            input-type="number"
            input-value=""
            input-width="100%"
          />
        </div>
        <div class="form-group col-6">
          <MasterInput
            input-id="incomeAmount"
            input-label="Income"
            input-name="income"
            input-placeholder="Add your income"
            input-type="number"
            input-value=""
            input-width="100%"
          />
        </div>
      </div>
      <button type="button" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
import MasterSelect from '@/components/MasterInputs/MasterSelect.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'
export default {
  name: 'AddExpenses',
  components: { MasterSelect, MasterInput }
}
</script>
