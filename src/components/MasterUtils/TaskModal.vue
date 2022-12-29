<template lang="html">
  <MasterModal
    modalId="tasksModal"
    modalSize="small"
    :btnClasses="`action-btn ${btnClass}`"
    :footerConfirm="addItem"
    :footerCancel="addCancel"
    :footerBtns="['confirm', 'cancel']"
  >
    <template #trigger>
      <slot />
    </template>
    <template #header>
      <h3 v-if="actionType === 'add'" class="py-2">Add Task</h3>
      <h3 v-if="actionType === 'update'" class="py-2">Update Task</h3>
    </template>
    <template #default>
      <form id="addTaskForm" class="py-2">
        <div class="row">
          <div class="form-group col-12">
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
        </div>
      </form>
    </template>
    <template #footer> </template>
  </MasterModal>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { v4 } from 'uuid'
import { IsValidObject } from '@/utils/globals.js'
import MasterModal from '@/components/MasterUtils/MasterModal.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'

const props = defineProps({
  actionType: {
    default: 'add',
    type: String
  },
  defaultsObj: {
    default: () => {},
    type: Object
  },
  btnClass: {
    default: '',
    type: String
  }
})

const emits = defineEmits(['emitDataUpdate'])
const store = useStore()

const description = ref('')
const status = ref('incomplete')

watchEffect(() => {
  if (IsValidObject(props.defaultsObj)) {
    description.value = props.defaultsObj.description
  }
})

const clearForm = () => {
  description.value = undefined
}

const updateData = (type) => {
  if (!description.value) {
    store.dispatch('utils/floatingMessages', {
      message: 'You need to enter correct details!',
      type: 'error'
    })
    return false
  }

  const updateObj = {
    id: type === 'update' ? props.defaultsObj?.id : v4(),
    description: description.value,
    status: status.value
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
</script>
