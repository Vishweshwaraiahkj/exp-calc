<style lang="scss" scoped>
@function calcPx($size) {
  $calcSize: calc($size/16);
  @return $calcSize + rem;
}

$box-size: v-bind(inputWidth);
$input-size: calc($box-size/2);

.input-group.master-switch {
  width: $box-size;

  .form-control {
    background: transparent;
    box-shadow: none;

    &.input-span {
      /* Checkbox Styles */
      input[type='checkbox'] {
        -webkit-appearance: none;
        outline: none;
        position: absolute;
        height: calc($input-size/2);
        width: $input-size;
        border: px2rem(5) solid var(--body);
        border-radius: calc($input-size/2);
        cursor: pointer;
        box-shadow: 9px 9px 16px rgba(189, 189, 189, 0.6),
          -9px -9px 16px rgba(255, 255, 255, 0.5),
          inset 10px 10px 15px -10px #c3c3c3, inset -10px -10px 15px -10px #fff;

        /* Toggle Indicator */
        &::before {
          content: '';
          height: px2rem(16);
          width: px2rem(16);
          background-color: var(--body);
          position: absolute;
          margin: auto;
          top: 0;
          left: px2rem(5);
          bottom: 0;
          border-radius: 50%;
          box-shadow: 7px 7px 15px #c3c3c3,
            9px 9px 16px rgba(189, 189, 189, 0.6);
          transition: 0.15s;
        }

        /* Label */
        &::after {
          content: 'Off';
          position: absolute;
          font-size: px2rem(16);
          top: px2rem(5);
          right: px2rem(5);
          color: var(--text-secondary);
          font-family: 'SF Pro Text', 'Helvetica Neue', 'Helvetica', 'Arial',
            sans-serif;
          font-weight: 400;
          letter-spacing: 0.004em;
        }

        /* Checked Styles */
        &:checked {
          background: #0071e3;
          box-shadow: 9px 9px 16px rgb(189 189 189 / 60%),
            -9px -9px 16px rgb(255 255 255 / 50%),
            inset 10px 10px 15px -10px #0047b9,
            inset -10px -10px 15px -10px #0047b9;
          border-color: var(--light-gray);

          &::before {
            right: px2rem(5);
            left: auto;
            box-shadow: none;
          }

          &::after {
            content: 'On';
            left: px2rem(5);
            right: auto;
            color: #f5f5f7;
          }
        }
      }
    }
  }

  &.label-left {
    white-space: nowrap;

    .input-label {
      margin: auto;
      margin-right: px2rem(10);

      &:after {
        content: ':';
      }
    }
  }

  .input-pad {
    padding: px2rem(5);
  }
}
</style>
<template lang="html">
  <div :class="mainWrapper">
    <label v-if="inputLabel" :for="inputId" class="input-label">
      {{ inputLabel }}
    </label>
    <span :class="inputWrapper">
      <input
        :class="`master-input`"
        :id="inputId"
        :type="`checkbox`"
        :name="inputName"
        :value="inputValue"
        :checked="inputValue"
        :required="inputRequired"
        @input="updateInput"
      />
    </span>
    <span class="err" v-if="!validInput && inputRequired">
      {{ errMessage }}
    </span>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { RemoveMultiSpaces } from '@/utils/globals'

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
    default: 'checkbox',
    type: String
  },
  inputValue: {
    default: false,
    type: Boolean
  },
  inputName: {
    default: '',
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
  isPadded: {
    default: false,
    type: Boolean
  },
  labelPos: {
    default: 'top',
    type: String
  }
})

const errMessage = ref(props.inputErrMessage)
const validInput = ref(true)

const inputWrapper = computed(() => {
  const defClasses = 'input-span form-control'
  const isInvalid = !validInput.value && props.inputRequired
  const errClass = isInvalid ? 'err' : ''
  const padClass = props.isPadded ? 'input-pad' : ''
  const combined = `${defClasses} ${errClass} ${padClass}`
  return RemoveMultiSpaces(combined)
})

const mainWrapper = computed(() => {
  const defClasses = 'input-group master-switch'
  const labelPos = `label-${props.labelPos}`
  const combined = `${defClasses} ${labelPos}`
  return RemoveMultiSpaces(combined)
})

const updateInput = (e) => {
  const checkedStatus = e.target.checked
  const inputType = e.target.type
  if (inputType === 'checkbox' || inputType === 'radio') {
    emits('update:inputValue', checkedStatus)
  } else {
    emits('update:inputValue', false)
  }
}
</script>
