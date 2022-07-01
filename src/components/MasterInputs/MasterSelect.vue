<template>
  <label class="input-label">
    {{ selectLabel }}
  </label>
  <div
    class="d-flex form-control multiselect-dropdown"
    :style="{ width: selectBoxWidth }"
  >
    <button class="menu-btn" type="button" @click="dropDown">
      {{ selectPlaceholder }} &#9013;
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
        />
        <label :for="opt.optionValue">
          {{ opt.optionDname }}
        </label>
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { addBodyOverlay } from '@/utils/globals.js'
export default {
  name: 'MasterSelect',
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
    }
  },
  setup (props) {
    const options = ref([])
    const selectBoxWidth = ref(props.selectWidth ?? undefined)
    options.value = [
      {
        optionId: 1,
        optionValue: 'houseconstruction',
        optionDname: 'House Construction',
        checked: false
      },
      {
        optionId: 2,
        optionValue: 'self',
        optionDname: 'Self',
        checked: false
      },
      {
        optionId: 3,
        optionValue: 'creditcard',
        optionDname: 'Credit Card',
        checked: false
      },
      {
        optionId: 4,
        optionValue: 'bankloan',
        optionDname: 'Bank Loan',
        checked: false
      },
      {
        optionId: 5,
        optionValue: 'travelfare',
        optionDname: 'Travel Fare',
        checked: false
      }
    ]

    const dropDown = (event) => {
      event.target.parentElement
        .querySelector('.optionsBox')
        .classList.remove('d-none')
      addBodyOverlay(event, 'optionsBox', 'dark')
    }

    return {
      options,
      dropDown,
      selectBoxWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.multiselect-dropdown {
  z-index: 200;

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
