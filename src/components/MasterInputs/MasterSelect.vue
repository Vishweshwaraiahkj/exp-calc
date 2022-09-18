<style lang="scss" scoped>
.input-group {
  width: v-bind(selectBoxWidth);

  .multiselect {
    position: relative;
    width: 100%;
    box-shadow: boxShadow();

    .dropdown-arrow {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: px2rem(45);
    }

    &.active,
    &.err {
      .dropdown-arrow {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
      }
    }

    &.active,
    &.active.err {
      button.menu-btn {
        z-index: 200;
      }
    }

    &.inactive {
      .dropdown-arrow {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
      }
    }

    .menu-btn {
      padding: px2rem(2) px2rem(10);
      background: var(--white);
      width: 100%;
      text-align: left;
      color: var(--dark);
      border: 0;
    }

    .backDrop {
      display: block;
      position: fixed;
      z-index: 100;
      padding-top: px2rem(100);
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0 0 0 / 25%);
    }

    .optionsBox {
      width: 100%;
      padding-top: 0;
      left: 0;
      z-index: 200;
      margin-top: px2rem(4);
      background-color: white;
      position: absolute;
      max-height: 20rem;
      overflow: auto;
      @include hideScroll();

      &.top {
        bottom: px2rem(36);
        box-shadow: boxShadow(top);
      }

      &.bottom {
        top: px2rem(36);
        box-shadow: boxShadow(bottom);
      }

      .menu-option {
        align-items: center;
        margin: px2rem(5);

        &.gray-bg {
          background-color: var(--light-gray);
        }

        label {
          margin-top: 0.5rem;
          display: flex;
          justify-content: flex-start;
          width: 100%;
          align-items: center;
          cursor: pointer;

          .check-box {
            margin-right: 1rem;
            margin-left: 1rem;
          }
        }

        input {
          display: none;
        }
      }

      .select-input {
        display: inline-block;
        margin-bottom: 0.5rem;
        margin-right: 1rem;

        &[type='checkbox'] {
          width: auto;
          margin-left: 1rem;
        }
      }
    }
  }
}
</style>

<template lang="html">
  <div :class="mainWrapper">
    <label v-if="selectLabel" class="input-label">
      {{ selectLabel }}
    </label>
    <div :class="inputWrapper">
      <div
        v-if="isVisible"
        class="backDrop"
        @mouseenter="(e) => dropDown(e, 'close')"
      ></div>
      <button
        class="menu-btn"
        type="button"
        @click="(e) => dropDown(e, 'open')"
      >
        {{ selectedCountText || selectPlaceholder }}
        <span class="dropdown-arrow">
          <span class="down-arrow" />
        </span>
      </button>
      <div
        v-if="isVisible"
        @mouseleave="(e) => dropDown(e, 'open')"
        :class="`optionsBox animate ${alignDropdown}`"
      >
        <span
          v-for="opt in propOptions"
          :key="opt.id"
          class="d-flex menu-option"
          :class="isCheckedItem(opt.optValue) && `gray-bg`"
        >
          <input
            :id="opt.optValue"
            type="checkbox"
            class="select-input"
            :value="opt.optValue"
            v-model="checkedValues"
            @click="filterData"
          />
          <label :for="opt.optValue">
            <MasterIcon
              :size="`small`"
              :classes="`check-box`"
              :key="getSvgName(opt.optValue)"
              :svgName="getSvgName(opt.optValue)"
            />
            {{ opt.optName }}
          </label>
        </span>
      </div>
    </div>
    <span class="err" v-if="!validInput && isRequired">
      {{ errMessage }}
    </span>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue'
import { RemoveMultiSpaces } from '@/utils/globals'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'

const emits = defineEmits(['emitSelected'])

const props = defineProps({
  selectWidth: {
    default: '20rem',
    type: String
  },
  selectLabel: {
    default: '',
    type: String
  },
  selectPlaceholder: {
    default: '',
    type: String
  },
  selectOptions: {
    default: () => [],
    type: Array,
    required: true
  },
  singleSelect: {
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
  resetTrue: {
    default: false,
    type: Boolean
  },
  defaultSelects: {
    default: () => [],
    type: Array
  },
  selectText: {
    default: true,
    type: Boolean
  },
  labelPos: {
    default: 'top',
    type: String
  },
  allSelectable: {
    default: false,
    type: Boolean
  }
})

const checkedValues = ref([])
const selectBoxWidth = ref(props.selectWidth ?? undefined)
const isSingleSelect = ref(props.singleSelect)
const errMessage = ref(props.inputErrMessage)
const validInput = ref(true)
const isRequired = ref(props.inputRequired)
const isVisible = ref(false)
const isIntermediate = ref(false)
const alignDropdown = ref('bottom')
const propOptions = computed(() => {
  if (props.allSelectable) {
    return [
      {
        id: 'select_all',
        optValue: 'select_all',
        optName: 'Select All',
        checked: false
      },
      ...props.selectOptions
    ]
  }
  return props.selectOptions
})

const toggleVisibility = (action) => {
  if (action === 'open') {
    isVisible.value = true
  } else if (action === 'close') {
    isVisible.value = false
  } else {
    isVisible.value = !isVisible.value
  }
}

const getFullObject = (key, values) => {
  const returnObject = values?.map((value) => {
    const x = propOptions.value?.find((i) => {
      return i[key] === value
    })
    return x
  })
  return returnObject
}

let renderCount = 0
watchEffect(() => {
  renderCount = renderCount + 1
  const validInputs = checkedValues.value?.length
  const selectedValues = checkedValues.value?.filter((i) => i !== 'select_all')
  const returnObj = getFullObject('optValue', selectedValues)
  if (validInputs && returnObj) {
    emits('emitSelected', returnObj)
  }
  if (renderCount > 1) validInput.value = validInputs
})

onMounted(() => {
  if (props.defaultSelects.length) {
    checkedValues.value = props.defaultSelects.map((i) => i.optValue)
  }
  if (props.resetTrue) {
    isRequired.value = false
    checkedValues.value = []
  }
})

const isCheckedItem = (current) => {
  if (current === 'select_all' && checkedValues.value?.length) {
    return true
  }
  return checkedValues.value.includes(current)
}

const getSvgName = (current) => {
  const opts = propOptions.value?.length
  const selects = checkedValues.value?.length
  if (current === 'select_all' && selects) {
    if (selects === opts) {
      return 'checked-round'
    } else {
      return 'intermediate-round'
    }
  } else {
    return checkedValues.value.includes(current)
      ? 'checked-round'
      : 'unchecked-round'
  }
}

const dropDown = (e, action) => {
  const posTop = window.innerHeight - e.clientY
  if (posTop < 150) alignDropdown.value = 'top'
  toggleVisibility(action)
  const collection = document.querySelectorAll('.multiselect')
  for (const elm of collection) {
    elm.classList.remove('active')
    elm.classList.add('inactive')
  }
  if (isVisible.value && action === 'open') {
    e.target.parentElement.classList.add('active')
    e.target.parentElement.classList.remove('inactive')
  }
}

const filterData = (e) => {
  const targetValue = e?.target?.value
  const targetChecked = e?.target?.checked
  if (isSingleSelect.value) {
    checkedValues.value = [targetValue]
  }
  if (targetValue === 'select_all') {
    const allValues = propOptions.value?.map((i) => i.optValue)
    checkedValues.value = targetChecked ? allValues : []
  } else {
    isIntermediate.value = true
  }
}

const selectedCountText = computed(() => {
  const validData = checkedValues.value?.filter((i) => i !== 'select_all')
  const optionsObj = getFullObject('optValue', validData)
  if (isSingleSelect.value && validData.length) {
    return props.selectText
      ? `${optionsObj[0]?.optName} is selected.`
      : optionsObj[0]?.optName
  } else if (validData.length) {
    return `${optionsObj.length} item(s) are selected.`
  } else {
    return false
  }
})

const mainWrapper = computed(() => {
  const defClasses = 'input-group'
  const labelPos = `label-${props.labelPos}`
  const combined = `${defClasses} ${labelPos}`
  return RemoveMultiSpaces(combined)
})

const inputWrapper = computed(() => {
  const defClasses = 'input-span form-control multiselect'
  const isValid = !validInput.value && isRequired.value
  const errClass = isValid ? 'err active' : ''
  const combined = `${defClasses} ${errClass}`
  return RemoveMultiSpaces(combined)
})
</script>
