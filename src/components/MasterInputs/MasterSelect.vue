<template>
<div class="">
  <label class="input-label">
    {{ selectLabel }}
  </label>
  <div
    class="d-flex form-control multiselect-dropdown"
    :style="{ width: selectBoxWidth }"
  >
    <button class="menu-btn" type="button" @click="dropDown">
      {{ checkedValues?.length ? selectedCountText : selectPlaceholder }}
      <span class="arrow-down dropdown-arrow">&#9013;</span>
    </button>
    <div class="d-none shadow-medium optionsBox">
      <span
        v-for="opt in options"
        :key="opt.optionId"
        class="d-flex form-control menu-option"
      >
        <input
          :id="opt.optionValue"
          type="checkbox"
          class="select-input"
          :value="opt.optionValue"
          v-model="checkedValues"
        />
        <label :for="opt.optionValue">
          {{ opt.optionDname }}
        </label>
      </span>
    </div>
  </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { addBodyOverlay } from '@/utils/globals.js'
export default {
  name: 'MasterSelect',
  emits: ['selectedValues'],
  props: {
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
    }
  },
  setup (props, { emit }) {
    const checkedValues = ref([])
    const selectBoxWidth = ref(props.selectWidth ?? undefined)
    const options = computed(() => {
      return props.selectOptions
    })
    const dropDown = (event) => {
      event.target.parentElement
        .querySelector('.optionsBox')
        .classList.remove('d-none')
      const collection = document.querySelectorAll('.multiselect-dropdown')
      for (const elm of collection) {
        elm.classList.remove('active')
      }
      event.target.parentElement.classList.add('active')
      addBodyOverlay(event, 'optionsBox', 'dark')
    }

    watch(() => [...checkedValues.value], () => {
      emit('selectedValues', checkedValues)
    })

    const selectedCountText = computed(() => {
      return `${checkedValues.value.length} item(s) are selected.`
    })

    return {
      options,
      dropDown,
      selectBoxWidth,
      checkedValues,
      selectedCountText
    }
  }
}
</script>

<style lang="scss" scoped>
.multiselect-dropdown {
  &.active {
    z-index: 200;
  }

  .menu-btn {
    font: 300 13.3333px var(--global-font-family);
    padding: 2px 10px;
    background: transparent;
    width: 100%;
    border-radius: 2px;
    text-align: left;
    color: #757575;
  }

  .optionsBox {
    width: 100%;
    padding-top: 0;
    left: 0;
    top: calc(1.5rem + 0.75rem);
    z-index: 200;
    margin-top: 4px;
    background-color: white;
    position: absolute;

    .menu-option {
      align-items: center;
      margin: 5px;

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
