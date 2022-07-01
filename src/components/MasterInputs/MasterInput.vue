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
        :value="inputValue"
        :placeholder="inputPlaceholder"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: 'MasterInput',
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
      default: '',
      type: String
    },
    inputName: {
      default: '',
      type: String
    },
    inputPlaceholder: {
      default: 'Add something',
      type: String
    }
  }
}
</script>
