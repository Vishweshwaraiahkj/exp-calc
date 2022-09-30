<template lang="html">
  <MasterModal
    :triggerId="triggerId"
    modalId="selectableModal"
    modalSize="small"
    btnClasses="add-btn p-0"
    :footerConfirm="addItem"
    :footerCancel="addCancel"
    :footerBtns="['confirm', 'cancel']"
  >
    <template #trigger>
      <MasterIcon
        :size="triggerIconSize"
        :svgName="triggerIcon"
        :fillColor="fillColor"
      />
    </template>
    <template #header>
      <h3>Add an Item</h3>
    </template>
    <template #default>
      <form class="col-12" id="addExpIncForm">
        <div class="row">
          <div class="form-group col-6">
            <MasterInput
              input-id="displayNameId"
              input-label="Display Name"
              input-name="displayName"
              input-placeholder="Add Display Name"
              input-type="text"
              v-model:input-value="displayName"
              input-width="100%"
              :input-required="true"
            />
          </div>
          <div class="form-group col-6">
            <MasterInput
              input-id="sortKeyId"
              input-label="Sort Key"
              input-name="sortKey"
              input-placeholder="Add Sort Key"
              input-type="text"
              v-model:input-value="sortKey"
              input-width="100%"
              :input-required="true"
            />
          </div>
          <div class="form-group col-6">
            <MasterInput
              input-id="colorFillId"
              input-label="Color Fill"
              input-name="colorFill"
              input-placeholder="Add a color"
              input-type="color"
              v-model:input-value="colorFill"
              input-width="100%"
              :input-required="true"
            />
          </div>
          <div class="form-group col-6">
            <MasterInput
              input-id="iconId"
              input-label="Item Icon"
              input-name="optIcon"
              input-placeholder="Add an icon"
              input-type="text"
              v-model:input-value="optIcon"
              input-width="100%"
              :input-required="true"
            />
          </div>
        </div>
      </form>
    </template>
    <template #footer></template>
  </MasterModal>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { v4 as uuids4 } from 'uuid'
import { SpaceToUnderscore, IsValidObject } from '@/utils/globals'
import MasterModal from '@/components/MasterUtils/MasterModal.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'

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
    type: String,
    required: true
  },
  triggerIconSize: {
    default: 'medium',
    type: String
  },
  actionType: {
    default: 'add',
    type: String
  },
  dataType: {
    type: String,
    required: true
  },
  fillColor: {
    type: String,
    default: '#000000'
  }
})

const emits = defineEmits(['emitDataUpdate'])
const store = useStore()

const displayName = ref('')
const sortKey = ref('')
const colorFill = ref('#000000')
const optIcon = ref('')
const isChecked = ref(false)
const isFavorite = ref(false)

watchEffect(() => {
  if (IsValidObject(props.defaultsObj)) {
    displayName.value = props.defaultsObj.optName
    sortKey.value = props.defaultsObj.sortKey
    colorFill.value = props.defaultsObj.colorFill
    optIcon.value = props.defaultsObj.optIcon
    isChecked.value = props.defaultsObj.checked
    isFavorite.value = props.defaultsObj.favorite
  }
})

const clearForm = () => {
  // clear inputs after object is constructed
  displayName.value = undefined
  sortKey.value = undefined
  optIcon.value = undefined
}

const updateData = (type) => {
  const allInputs = [
    displayName.value,
    sortKey.value,
    colorFill.value,
    optIcon.value
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
    optValue: SpaceToUnderscore(displayName.value),
    optName: displayName.value,
    sortKey: sortKey.value,
    optIcon: optIcon.value,
    checked: isChecked.value,
    favorite: isFavorite.value,
    colorFill: colorFill.value || '#000000'
  }
  emits('emitDataUpdate', updateObj, props.dataType)
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
