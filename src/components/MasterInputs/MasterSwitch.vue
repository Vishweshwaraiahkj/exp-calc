<style lang="scss">
$box-size: v-bind(inputWidth);

.input-group.master-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .input-span {
    width: $box-size;
    height: $box-size;
    box-shadow: none;
    position: relative;
    white-space: nowrap;
    cursor: pointer;

    .svg-holder {
      width: 100%;
    }
  }

  &.label-left {
    position: relative;
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
    <label v-if="inputLabel" class="input-label">
      {{ inputLabel }}
    </label>
    <span :class="inputWrapper">
      <MasterIcon
        :svgName="iconSvg"
        :key="iconSvg"
        size="100%"
        fillColor="var(--item-color)"
        @click="updateStatus"
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
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'

const emits = defineEmits(['update:inputValue'])

const props = defineProps({
  checkIcon: {
    default: 'switch-on',
    type: String
  },
  uncheckIcon: {
    default: 'switch-off',
    type: String
  },
  inputWidth: {
    default: 'auto',
    type: String
  },
  inputLabel: {
    default: '',
    type: String
  },
  inputValue: {
    default: false,
    type: Boolean
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
const switchStatus = ref(props.inputValue)

const inputWrapper = computed(() => {
  const defClasses = 'input-span'
  const isInvalid = !validInput.value && props.inputRequired
  const errClass = isInvalid ? 'err' : ''
  const padClass = props.isPadded ? 'input-pad' : ''
  const combined = `${defClasses} ${errClass} ${padClass}`
  return RemoveMultiSpaces(combined)
})

const mainWrapper = computed(() => {
  const defClasses = 'input-group master-switch'
  let labelPos = ''
  if (props.inputLabel) {
    labelPos = `label-${props.labelPos}`
  }
  const combined = `${defClasses} ${labelPos}`
  return RemoveMultiSpaces(combined)
})

const updateStatus = (e) => {
  const checkedStatus = !switchStatus.value
  switchStatus.value = checkedStatus
  emits('update:inputValue', checkedStatus)
}

const iconSvg = computed(() => {
  return switchStatus.value ? props.checkIcon : props.uncheckIcon
})
</script>
