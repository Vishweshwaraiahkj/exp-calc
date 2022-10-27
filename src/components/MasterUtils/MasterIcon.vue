<style lang="scss">
.svg-holder {
  display: flex;
  align-items: center;
  justify-content: center;

  &.hover-inverse {
    &:hover svg {
      fill: var(--bg-color);
    }
  }
}
</style>
<template lang="html">
  <div :class="svgWrapper">
    <svg
      class="shadow-svg-dark"
      :fill="fillColor"
      :width="getSize"
      :height="getSize"
    >
      <use :href="iconsPath" />
    </svg>
  </div>
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
  } else if (props.size === 'small') {
    return '20'
  } else if (props.size === 'x-small') {
    return '16'
  } else if (props.size === 'medium') {
    return '32'
  } else {
    return props.size
  }
})
</script>
