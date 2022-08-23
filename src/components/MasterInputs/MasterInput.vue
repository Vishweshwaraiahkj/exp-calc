<template>
  <label v-if="inputLabel" :for="inputId" class="input-label">
    {{ inputLabel }}
  </label>
  <div :style="{ width: inputWidth }">
    <span
      class="d-flex form-control"
      :class="!validInput && inputRequired ? 'err' : ''"
    >
      <MasterIcon
        v-if="hasIcon"
        size="small"
        :svgName="hasIcon"
        classes="input-icon"
      />
      <input
        :id="inputId"
        :type="inputType"
        :name="inputName"
        class="master-input"
        @input="updateInput"
        :value="inputValue"
        :placeholder="inputPlaceholder"
        :required="inputRequired"
      />
      <MasterIcon
        @click="clearInput"
        v-if="inputValue"
        size="small"
        svgName="close-filled"
        classes="clear-icon"
      />
    </span>
    <span class="err" v-if="!validInput && inputRequired">
      {{ errMessage }}
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'

const emits = defineEmits(['update:inputValue'])

const props = defineProps({
  inputWidth: {
    default: 'auto',
    type: String
  },
  inputId: {
    default: '',
    type: String
  },
  inputLabel: {
    default: '',
    type: String
  },
  inputType: {
    default: 'text',
    type: String
  },
  inputValue: {
    type: [String, Date, Number],
    default: null
  },
  inputName: {
    default: '',
    type: String
  },
  inputPlaceholder: {
    default: 'Type something',
    type: String
  },
  inputRequired: {
    default: false,
    type: Boolean
  },
  inputErrMessage: {
    default: 'This is a required field',
    type: String
  },
  hasIcon: {
    default: '',
    type: String
  }
})

const errMessage = ref(props.inputErrMessage)
const validInput = ref(true)
const updateInput = (event) => {
  const inputData = event.target.value
  validInput.value = inputData
  emits('update:inputValue', inputData)
}

const clearInput = () => {
  emits('update:inputValue', '')
}
</script>
<style lang="scss" scoped>
.input-icon,
.clear-icon {
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  box-shadow: boxShadow(default);
}
</style>
