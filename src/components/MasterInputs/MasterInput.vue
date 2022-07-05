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
      />
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
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
    }
  },
  setup (props, { emit }) {
    const updateInput = (event) => {
      emit('update:inputValue', event.target.value)
    }

    return {
      updateInput
    }
  }
})
</script>
