<template lang="html">
  <MasterModal
    :triggerId="triggerId"
    modalId="expensesModal"
    modalSize="medium"
    btnClasses="add-btn"
    :footerConfirm="addItem"
    :footerCancel="addCancel"
    :footerBtns="['confirm', 'cancel']"
  >
    <template #trigger>
      <MasterIcon
        :size="triggerIconSize"
        :svg-name="triggerIcon"
        :fill-color="colorFill"
      />
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
              inputId="descriptionId"
              inputLabel="Description"
              inputName="description"
              inputPlaceholder="Add description"
              inputType="text"
              v-model:inputValue="description"
              inputWidth="100%"
              :inputRequired="true"
            />
          </div>
          <div class="form-group col-6">
            <MasterSelect
              @emitSelected="getCheckedCats"
              selectWidth="100%"
              selectLabel="Categories"
              selectPlaceholder="Select a category"
              :selectOptions="listOfCategories"
              :inputRequired="true"
              :resetTrue="resetInput"
              :defaultSelects="defaultCats"
              :allSelectable="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-6">
            <MasterInput
              inputId="typeofAmount"
              inputLabel="Amount"
              inputName="amount"
              inputPlaceholder="Add your amount"
              inputType="number"
              v-model:inputValue="amount"
              inputWidth="100%"
              :inputRequired="true"
            />
          </div>
          <div class="form-group col-6">
            <MasterSelect
              @emitSelected="getCheckedTypes"
              selectWidth="100%"
              selectLabel="Type"
              selectPlaceholder="Select a type"
              :selectOptions="listOfTypes"
              :singleSelect="true"
              :inputRequired="true"
              :resetTrue="resetInput"
              :defaultSelects="defaultTypes"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-6">
            <MasterPicker
              inputPlaceholder="Add date here"
              inputLabel="Date"
              @emitDateTime="getDateTime"
              v-model:inputDate="addeddate"
            />
          </div>
        </div>
      </form>
    </template>
    <template #footer> </template>
  </MasterModal>
</template>

<script setup>
import { ref, watchEffect, computed, inject } from 'vue'
import { useStore } from 'vuex'
import { v4 as uuids4 } from 'uuid'
import { IsValidObject } from '@/utils/globals.js'
import MasterSelect from '@/components/MasterInputs/MasterSelect.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'
import MasterModal from '@/components/MasterUtils/MasterModal.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterPicker from '@/components/MasterInputs/MasterPicker.vue'

const props = defineProps({
  defaultsObj: {
    default: () => {},
    type: Object
  },
  triggerIcon: {
    default: 'add-square',
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
  },
  colorFill: {
    default: '',
    type: String
  }
})

const emits = defineEmits(['emitDataUpdate'])
const store = useStore()

const listOfCategories = computed(() => {
  return store.getters['utils/getAllCategories']
})

const listOfTypes = computed(() => {
  return store.getters['utils/getAllTypes']
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

const getDateTime = (dateTime) => {
  addeddate.value = dateTime
}

const masterCategories = inject('categories')?.value
const masterTypes = inject('types')?.value

const getCats = (categoryIds) => {
  const objList = categoryIds.map((i) => {
    const catObj = masterCategories?.find((k) => k.id === i)
    return catObj
  })
  return objList
}

const getTypes = (typeIds) => {
  const objList = typeIds.map((i) => {
    const typeObj = masterTypes?.find((k) => k.id === i)
    return typeObj
  })
  return objList
}

const defaultCats = ref([])
const defaultTypes = ref([])

watchEffect(() => {
  if (IsValidObject(props.defaultsObj)) {
    description.value = props.defaultsObj.description
    amount.value = props.defaultsObj.amount
    addeddate.value = props.defaultsObj.date
    defaultCats.value = getCats(props.defaultsObj.category)
    defaultTypes.value = getTypes(props.defaultsObj.type)
  }
})

const clearForm = () => {
  // clear inputs after object is constructed
  description.value = undefined
  typeList.value = undefined
  categoryList.value = undefined
  amount.value = undefined
  addeddate.value = undefined
  resetInput.value = true
}

const updateData = (type) => {
  const allInputs = [
    description.value,
    categoryList.value?.length,
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

  const updateObj = {
    id: type === 'update' ? props.defaultsObj?.id : uuids4(),
    categoryList: categoryList.value.map((i) => i.id).filter((i) => i),
    typeList: typeList.value.map((i) => i.id).filter((i) => i),
    description: description.value,
    amount: amount.value,
    addeddate: addeddate.value
  }

  emits('emitDataUpdate', updateObj, type)
  if (type === 'add') clearForm()
  return true
}

const addItem = () => {
  return updateData(props.actionType)
}

const addCancel = () => {
  if (props.actionType === 'add') {
    clearForm()
  }
}

document.onkeydown = function (e) {
  if (e.key === 'n' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()

    document.getElementById('addExp').click()
  }
}
</script>
