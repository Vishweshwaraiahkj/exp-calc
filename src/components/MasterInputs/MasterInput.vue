<template>
  <label v-if="inputLabel" :for="inputId" class="input-label">
    {{ inputLabel }}
  </label>
  <div :style="{ width: inputWidth }">
    <span
      class="d-flex form-control"
      :class="!validInput && inputRequired ? 'err' : ''"
    >
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
    </span>
    <span
      class="err"
      v-if="!validInput && inputRequired"
    >
      {{ errMessage }}
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
    type: [String, Date],
    default: ''
  },
  inputName: {
    default: '',
    type: String
  },
  inputPlaceholder: {
    default: 'Add something',
    type: String
  },
  inputRequired: {
    default: false,
    type: Boolean
  },
  inputErrMessage: {
    default: 'This is a required field',
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
</script>
