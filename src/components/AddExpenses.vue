<template>
  <MasterModal
    :triggerId="triggerId"
    modalSize="medium"
    btnClasses="add-btn"
    :footerConfirm="addItem"
    :footerCancel="addCancel"
    :footerBtns="['confirm', 'cancel']"
  >
    <template #trigger>
      <MasterIcon :size="triggerIconSize" :svgName="triggerIcon" />
    </template>
    <template #header>
      <h3 v-if="actionType === 'add'" class="py-2">Add Expense/Income</h3>
      <h3 v-if="actionType === 'update'" class="py-2">Update Expense/Income</h3>
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
              @emitSelected="getCheckedCats"
              select-width="100%"
              select-label="Categories"
              select-placeholder="Select a category"
              :select-options="listOfCategories"
              :input-required="true"
              :reset-true="resetInput"
              :default-selects="defaultCats"
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
              @emitSelected="getCheckedTypes"
              select-width="100%"
              select-label="Type"
              select-placeholder="Select a type"
              :select-options="listOfTypes"
              :single-select="true"
              :input-required="true"
              :reset-true="resetInput"
              :default-selects="defaultTypes"
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
              input-type="datetime-local"
              v-model:input-value="addeddate"
              input-width="100%"
              :input-required="true"
            />
          </div>
        </div>
      </form>
    </template>
    <template #footer> </template>
  </MasterModal>
</template>

<script setup>
import { ref, watchEffect, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { v4 as uuids4 } from 'uuid'
import { isValidObject, customSort } from '@/utils/globals.js'
import MasterSelect from '@/components/MasterInputs/MasterSelect.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'
import MasterModal from '@/components/MasterUtils/MasterModal.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'

const props = defineProps({
  defaultsObject: {
    default: () => {},
    type: Object
  },
  triggerIcon: {
    default: 'add',
    type: String
  },
  triggerId: {
    default: '',
    type: String
  },
  triggerIconSize: {
    default: 'medium',
    type: String
  },
  actionType: {
    default: 'add',
    type: String
  }
})

const emits = defineEmits(['emitChangeList'])
const store = useStore()

const listOfCategories = computed(() => {
  const unsortedCategories = store.getters['utils/getAllCategories']
  return customSort(unsortedCategories, 'sortKey', 'asc')
})
const listOfTypes = computed(() => {
  const unsortedTypes = store.getters['utils/getAllTypes']
  return customSort(unsortedTypes, 'sortKey', 'asc')
})
const description = ref(null)
const amount = ref(null)
const typeList = ref([])
const addeddate = ref(null)
const categoryList = ref([])
const resetInput = ref(false)
const getCheckedCats = (data) => {
  categoryList.value = data
}
const getCheckedTypes = (data) => {
  typeList.value = data
}

const defaultCats = ref([])
const defaultTypes = ref([])

watchEffect(() => {
  if (isValidObject(props.defaultsObject)) {
    description.value = props.defaultsObject.description
    amount.value = props.defaultsObject.amount
    addeddate.value = props.defaultsObject.date
    const catsSelected = props.defaultsObject.category
    const typeSelected = props.defaultsObject.type
    defaultCats.value = catsSelected
    defaultTypes.value = typeSelected
  }
})

const clearForm = () => {
  // clear inputs after final object is constructed on submit
  description.value = undefined
  typeList.value = undefined
  categoryList.value = undefined
  amount.value = undefined
  addeddate.value = undefined
  resetInput.value = true
}

const changeTheList = (type) => {
  const allInputs = [
    categoryList.value?.length,
    description.value,
    typeList.value?.length,
    amount.value,
    addeddate.value
  ]

  if (!allInputs.every((i) => i)) {
    store.dispatch('utils/floatingMessages', {
      message: 'You need to enter correct details!',
      type: 'error'
    })
    return false
  }

  const changeDetailsObj = {
    id: type === 'update' ? props.defaultsObject.id : uuids4(),
    categoryList: categoryList.value,
    description: description.value,
    typeList: typeList.value,
    amount: amount.value,
    addeddate: addeddate.value
  }
  emits('emitChangeList', changeDetailsObj, type)
  if (type === 'add') clearForm()
  return true
}

const addItem = () => {
  return changeTheList(props.actionType)
}

const addCancel = () => {
  if (props.actionType === 'add') {
    clearForm()
  }
}

onMounted(() => {
  store.dispatch('utils/fetchAllCategories')
  store.dispatch('utils/fetchAllTypes')
})
</script>
