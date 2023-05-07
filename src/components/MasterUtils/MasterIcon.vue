<style lang="scss">
.svg-holder {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: v-bind('bgColor');

  &.hover-inverse {
    &:hover svg {
      fill: var(--bg-color);
    }
  }

  .label-before,
  .label-after {
    margin: auto;
  }
}
</style>
<template lang="html">
  <span :class="svgWrapper">
    <label v-if="labelBefore" :class="`label-before ${size}`">{{
      labelBefore
    }}</label>
    <svg
      class="shadow-svg-dark"
      :fill="fillColor"
      :height="getSize"
      :width="getSize"
    >
      <use :href="iconsPath" />
    </svg>
    <label v-if="labelAfter" :class="`label-after ${size}`">{{
      labelAfter
    }}</label>
  </span>
</template>
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  size: {
    default: 'medium',
    type: String
  },
  svgName: {
    default: 'placeholder',
    type: String
  },
  class: {
    default: '',
    type: String
  },
  fillColor: {
    default: '',
    type: String
  },
  extraPath: {
    default: '',
    type: String
  },
  hoverInverse: {
    default: false,
    type: Boolean
  },
  bgColor: {
    default: '',
    type: String
  },
  labelAfter: {
    default: '',
    type: String
  },
  labelBefore: {
    default: '',
    type: String
  }
})

const iconName = ref(props.svgName)
const extraPath = ref(props.extraPath)

const svgWrapper = computed(() => {
  const defaults = `svg-holder`
  let userClasses = props.class
  if (props.hoverInverse) {
    userClasses += 'hover-inverse'
  }
  return `${defaults} ${userClasses}`
})

const iconsPath = computed(() => {
  let svgPath
  if (extraPath.value) {
    svgPath = `${extraPath.value}/${iconName.value}`
  } else {
    svgPath = `${iconName.value}`
  }
  let returnSvg
  try {
    returnSvg = require(`@/assets/icons/${svgPath}.svg`) + '#' + iconName.value
  } catch (e) {
    returnSvg = require(`@/assets/icons/placeholder.svg`) + '#placeholder'
  }
  return returnSvg
})

const getSize = computed(() => {
  if (props.size === 'x-large') {
    return '54'
  } else if (props.size === 'large') {
    return '40'
  } else if (props.size === 'medium') {
    return '32'
  } else if (props.size === 'small') {
    return '20'
  } else if (props.size === 'x-small') {
    return '16'
  } else {
    return props.size
  }
})
</script>
