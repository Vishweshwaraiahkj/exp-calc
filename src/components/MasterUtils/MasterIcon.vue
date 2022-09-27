<style lang="scss">
.svg-holder {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template lang="html">
  <div class="svg-holder" :class="classes">
    <svg
      class="shadow-svg"
      :fill="fillColor"
      :width="getSize"
      :height="getSize"
    >
      <use :href="fullPath" />
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
    default: 'smiling',
    type: String
  },
  classes: {
    default: '',
    type: String
  },
  fillColor: {
    default: '',
    type: String
  }
})

const iconName = ref(props.svgName || 'edit')

const iconsPath = computed(() => {
  return require(`@/assets/icons/${iconName.value}.svg`)
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

const fullPath = computed(() => {
  return iconsPath.value + '#' + iconName.value
})
</script>
