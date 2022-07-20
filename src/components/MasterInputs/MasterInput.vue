<template>
  <label :for="inputId" class="input-label">
    {{ inputLabel }}
  </label>
  <div :style="{ width: inputWidth }">
    <span class="d-flex form-control">
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

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'MasterInput',
  emits: ['update:inputValue'],
  props: {
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
  },
  setup (props, { emit }) {
    const errMessage = ref(props.inputErrMessage)
    const validInput = ref(true)
    const updateInput = (event) => {
      const inputData = event.target.value
      validInput.value = inputData
      emit('update:inputValue', inputData)
    }

    return {
      updateInput,
      errMessage,
      validInput
    }
  }
})
</script>
