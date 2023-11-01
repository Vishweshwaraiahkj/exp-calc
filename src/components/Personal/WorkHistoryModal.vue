<template lang="html">
  <MasterModal
    modalId="userUpdater"
    modalSize="medium"
    :btnClasses="btnClasses"
    :footerConfirm="addItem"
    :footerCancel="addCancel"
    :footerBtns="['confirm', 'cancel']"
  >
    <template #trigger>
      <MasterIcon
        :size="triggerIconSize"
        :svgName="triggerIcon"
        :fillColor="fillColor"
        :title="title"
      />
    </template>
    <template #header>
      <h3 v-if="actionType === 'add'" class="py-2">Add work details</h3>
      <h3 v-if="actionType === 'update'" class="py-2">Update work details</h3>
    </template>
    <template #default>
      <form class="col-12" id="updateWork">
        <div class="row">
          <div class="form-group col-6">
            <MasterInput
              v-model:inputValue="jobTitle"
              inputId="jobTitle"
              inputLabel="Job Title"
              inputName="jobTitle"
              inputPlaceholder="Add job title"
              inputType="text"
              inputWidth="100%"
              :inputRequired="true"
            />
          </div>
          <div class="form-group col-6">
            <MasterInput
              v-model:inputValue="jobCompany"
              inputId="jobCompany"
              inputLabel="Company Name"
              inputName="jobCompany"
              inputPlaceholder="Add worked company"
              inputType="text"
              inputWidth="100%"
              :inputRequired="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-6">
            <MasterPicker
              inputLabel="Start date"
              inputPlaceholder="Select start month"
              pickerType="month-picker"
              :isRequired="true"
              v-model:inputDate="jobFrom"
              inputWidth="100%"
              @emitDateTime="getDateFrom"
              :isClearable="false"
            />
          </div>
          <div class="form-group col-6">
            <MasterPicker
              inputLabel="End date"
              inputPlaceholder="Select end month"
              pickerType="month-picker"
              :isRequired="true"
              v-model:inputDate="jobTo"
              inputWidth="100%"
              @emitDateTime="getDateTo"
              :isClearable="false"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12">
            <MasterInput
              v-model:inputValue="jobSkills"
              inputId="jobSkills"
              inputLabel="Skills used"
              inputName="jobSkills"
              inputPlaceholder="Add skills used, seperated by comma"
              inputType="text"
              inputWidth="100%"
              :inputRequired="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12">
            <MasterInput
              v-model:inputValue="jobDesc"
              inputId="jobDesc"
              inputLabel="Job Description"
              inputName="jobDesc"
              inputPlaceholder="Write details about job, ex: skills, roles etc"
              inputType="textarea"
              inputWidth="100%"
              :inputRequired="true"
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
import { v4 } from 'uuid'
import { IsValidObject } from '@/utils/globals.js'
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
    default: 'update-user',
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
  fillColor: {
    default: 'var(--item-color)',
    type: String
  },
  btnClasses: {
    default: '',
    type: String
  },
  title: {
    default: '',
    type: String
  }
})

const emits = defineEmits(['emitDataUpdate'])
const store = useStore()

const jobTitle = ref('')
const jobCompany = ref('')
const jobFrom = ref('')
const jobTo = ref('')
const jobDesc = ref('')
const jobSkills = ref('')

const resetInput = ref(false)

watchEffect(() => {
  if (IsValidObject(props.defaultsObj)) {
    jobTitle.value = props.defaultsObj.jobTitle
    jobCompany.value = props.defaultsObj.jobCompany
    jobFrom.value = props.defaultsObj.jobFrom
    jobTo.value = props.defaultsObj.jobTo
    jobDesc.value = props.defaultsObj.jobDesc
    jobSkills.value = props.defaultsObj.jobSkills
  }
})

const clearForm = () => {
  // clear inputs after object is constructed
  jobTitle.value = undefined
  jobCompany.value = undefined
  jobFrom.value = undefined
  jobTo.value = undefined
  jobDesc.value = undefined
  jobSkills.value = undefined

  resetInput.value = true
}

const updateData = (type) => {
  const allInputs = [
    jobTitle.value,
    jobCompany.value,
    jobFrom.value,
    jobTo.value,
    jobDesc.value,
    jobSkills.value
  ]

  if (!allInputs.every((i) => i)) {
    store.dispatch('utils/floatingMessages', {
      message: 'You need to enter correct details!',
      type: 'error'
    })
    return false
  }

  const updateObj = {
    id: type === 'update' ? props.defaultsObj?.id : v4(),
    jobTitle: jobTitle.value,
    jobCompany: jobCompany.value,
    jobFrom: jobFrom.value,
    jobTo: jobTo.value,
    jobDesc: jobDesc.value,
    jobSkills: jobSkills.value
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

const getDateFrom = (dateTime) => {
  jobFrom.value = dateTime
}

const getDateTo = (dateTime) => {
  jobTo.value = dateTime
}
</script>
