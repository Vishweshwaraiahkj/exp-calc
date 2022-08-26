<style lang="scss" scoped>
.multiselect {
  position: relative;
  box-shadow: boxShadow(default);

  &.active {
    .dropdown-arrow {
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }
  }
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

  .menu-btn {
    font: 300 px2rem(13.3333) var(--global-font-family);
    padding: px2rem(2) px2rem(10);
    background: transparent;
    width: 100%;
    border-radius: px2rem(2);
    text-align: left;
    color: #757575;
    border: 0;
  }

  .backDrop {
    display: block;
    position: fixed;
    z-index: 200;
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
    top: calc(1.5rem + 0.75rem);
    z-index: 200;
    margin-top: px2rem(4);
    background-color: white;
    position: absolute;

    .menu-option {
      align-items: center;
      margin: px2rem(5);

      label {
        width: 100%;
        text-align: left;
      }
    }

    .select-input {
      display: inline-block;
      margin-bottom: 0.5rem;
      margin-right: 1rem;
    }
  }
}
</style>
<template>
  <div class="">
    <label class="input-label">
      {{ selectLabel }}
    </label>
    <div
      class="d-flex form-control multiselect"
      :class="!validInput && isRequired ? 'err' : ''"
      :style="{ width: selectBoxWidth }"
    >
      <button class="menu-btn" type="button" @click="dropDown">
        {{ selectedCountText || selectPlaceholder }}
        <span class="dropdown-arrow">
          <span class="down-arrow" />
        </span>
      </button>
      <div v-if="isVisible" class="backDrop" @click="dropDown"></div>
      <div v-if="isVisible" class="shadow-default optionsBox animate">
        <span
          v-for="opt in options"
          :key="opt.id"
          class="d-flex form-control menu-option"
        >
          <input
            :id="opt.optionValue"
            type="checkbox"
            class="select-input"
            :value="opt.optionValue"
            :checked="opt.checked"
            v-model="checkedValues"
            @click="filterData"
          />
          <label :for="opt.optionValue">
            {{ opt.optionName }}
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
import { ref, watch, computed, watchEffect } from 'vue'

const emits = defineEmits(['emitSelected'])

const props = defineProps({
  selectWidth: {
    default: '',
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
    type: Array
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
  }
})

const checkedValues = ref([])
const selectBoxWidth = ref(props.selectWidth ?? undefined)
const isSingleSelect = ref(props.singleSelect)
const errMessage = ref(props.inputErrMessage)
const validInput = ref(true)
const isRequired = ref(props.inputRequired)
const isVisible = ref(false)
const propOptions = ref(props.selectOptions)

const toggleVisibility = (e) => {
  isVisible.value = !isVisible.value
}

watchEffect(() => {
  if (props.defaultSelects.length) {
    checkedValues.value = props.defaultSelects.map((i) => i.optionValue)
  }
  if (props.resetTrue) {
    isRequired.value = false
    checkedValues.value = []
  }
})

const options = computed(() => {
  return propOptions.value
})

const dropDown = (e) => {
  toggleVisibility()
  const collection = document.querySelectorAll('.multiselect')
  for (const elm of collection) {
    elm.classList.remove('active')
  }
  if (isVisible.value) {
    e.target.parentElement.classList.add('active')
  }
}

const filterData = (e) => {
  if (isSingleSelect.value) {
    checkedValues.value = [e?.target?.value]
  }
}

const getFullObject = (key, values) => {
  const returnObject = values.value?.map((value) => {
    const x = options.value?.find((i) => {
      return i[key] === value
    })
    return x
  })
  return returnObject
}

watch(
  () => [...checkedValues.value],
  (newData, oldData) => {
    validInput.value = checkedValues.value && checkedValues.value.length
    if (!validInput.value) return false
    emits('emitSelected', getFullObject('optionValue', checkedValues))
  }
)

const selectedCountText = computed(() => {
  const optionsObj = getFullObject('optionValue', checkedValues)
  if (isSingleSelect.value && checkedValues.value.length) {
    return `${optionsObj[0]?.optionName} is selected.`
  } else if (checkedValues.value.length) {
    return `${optionsObj.length} item(s) are selected.`
  } else {
    return false
  }
})
</script>
