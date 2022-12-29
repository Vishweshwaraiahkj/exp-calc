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
      <h3 v-if="actionType === 'add'" class="py-2">Add user details</h3>
      <h3 v-if="actionType === 'update'" class="py-2">Update user details</h3>
    </template>
    <template #default>
      <form class="col-12" id="updateForm">
        <div class="row">
          <div class="form-group col-6">
            <MasterInput
              inputId="userFullName"
              inputLabel="Full Name"
              inputName="fullName"
              inputPlaceholder="Add your full name"
              inputType="text"
              v-model:inputValue="fullName"
              inputWidth="100%"
              :inputRequired="true"
            />
          </div>
          <div class="form-group col-6">
            <MasterInput
              inputId="userDesignation"
              inputLabel="Designation"
              inputName="designation"
              inputPlaceholder="Add your Designation"
              inputType="text"
              v-model:inputValue="designation"
              inputWidth="100%"
              :inputRequired="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-6">
            <MasterPicker
              inputPlaceholder="Add date of birth"
              inputLabel="Date of birth"
              @emitDateTime="getDateTime"
              v-model:inputDate="birthDate"
            />
          </div>
          <div class="form-group col-6">
            <MasterSelect
              @emitSelected="getSelectedGender"
              selectWidth="100%"
              selectLabel="Gender"
              selectPlaceholder="Select your gender"
              :selectOptions="genders"
              :singleSelect="true"
              :inputRequired="true"
              :resetTrue="resetInput"
              :defaultSelects="selectedGender"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12">
            <MasterInput
              inputId="descriptionId"
              inputLabel="Description"
              inputName="description"
              inputPlaceholder="Add description"
              inputType="textarea"
              v-model:inputValue="description"
              inputWidth="100%"
              :inputRequired="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-6">
            <MasterInput
              inputId="userFacebook"
              inputLabel="Facebook"
              inputName="fb_link"
              inputPlaceholder="Add your Facebook url"
              inputType="text"
              v-model:inputValue="fbLink"
              inputWidth="100%"
              :inputRequired="true"
            />
          </div>
          <div class="form-group col-6">
            <MasterInput
              inputId="userLinkedIn"
              inputLabel="LinkedIn"
              inputName="lkdIn_link"
              inputPlaceholder="Add your LinkedIn url"
              inputType="text"
              v-model:inputValue="lkdInLink"
              inputWidth="100%"
              :inputRequired="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-6">
            <MasterInput
              inputId="userInstagram"
              inputLabel="Instagram"
              inputName="insta_link"
              inputPlaceholder="Add your Instagram url"
              inputType="text"
              v-model:inputValue="instaLink"
              inputWidth="100%"
              :inputRequired="true"
            />
          </div>
          <div class="form-group col-6">
            <MasterInput
              inputId="userTwitter"
              inputLabel="Twitter"
              inputName="tweet_link"
              inputPlaceholder="Add your Twitter url"
              inputType="text"
              v-model:inputValue="tweetLink"
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
import MasterSelect from '@/components/MasterInputs/MasterSelect.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'
import MasterModal from '@/components/MasterUtils/MasterModal.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterPicker from '@/components/MasterInputs/MasterPicker.vue'
import { genders } from '@/constants/Genders.js'

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

const fullName = ref(null)
const description = ref(null)
const designation = ref(null)
const birthDate = ref(null)
const selectedGender = ref(null)
const fbLink = ref('')
const lkdInLink = ref('')
const instaLink = ref('')
const tweetLink = ref('')

const resetInput = ref(false)

const getDateTime = (dateTime) => {
  birthDate.value = dateTime
}

const getSelectedGender = (data) => {
  selectedGender.value = data
}

watchEffect(() => {
  if (IsValidObject(props.defaultsObj)) {
    description.value = props.defaultsObj.description
    fullName.value = props.defaultsObj.fullName
    designation.value = props.defaultsObj.designation
    selectedGender.value = props.defaultsObj.selectedGender
    birthDate.value = props.defaultsObj.birthDate
    fbLink.value = props.defaultsObj.fbLink
    lkdInLink.value = props.defaultsObj.lkdInLink
    instaLink.value = props.defaultsObj.instaLink
    tweetLink.value = props.defaultsObj.tweetLink
  }
})

const clearForm = () => {
  // clear inputs after object is constructed
  description.value = undefined
  fullName.value = undefined
  designation.value = undefined
  selectedGender.value = undefined
  birthDate.value = undefined
  fbLink.value = undefined
  lkdInLink.value = undefined
  instaLink.value = undefined
  tweetLink.value = undefined

  resetInput.value = true
}

const updateData = (type) => {
  const allInputs = [
    description.value,
    fullName.value,
    designation.value,
    selectedGender.value,
    birthDate.value,
    fbLink.value,
    lkdInLink.value,
    instaLink.value,
    tweetLink.value
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
    description: description.value,
    fullName: fullName.value,
    designation: designation.value,
    selectedGender: selectedGender.value,
    birthDate: birthDate.value,
    fbLink: fbLink.value,
    lkdInLink: lkdInLink.value,
    instaLink: instaLink.value,
    tweetLink: tweetLink.value
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
