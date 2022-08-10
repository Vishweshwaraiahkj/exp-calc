<template lang="html">
    <div class="svg-holder" :class="classes">
        <svg :width="iconSize" :height="iconSize">
            <use :href="`${iconsPath}#${iconName}`" />
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
    default: '',
    type: String
  },
  classes: {
    default: '',
    type: String
  }
})

const iconName = ref(props.svgName || 'edit')
const iconSize = ref(null)

const iconsPath = computed(() => {
  return require(`@/assets/icons/${iconName.value}.svg`)
})

if (props.size === 'x-large') {
  iconSize.value = '54'
} else if (props.size === 'large') {
  iconSize.value = '40'
} else if (props.size === 'small') {
  iconSize.value = '20'
} else if (props.size === 'x-small') {
  iconSize.value = '16'
} else {
  iconSize.value = '32'
}
</script>
<style lang="scss">
    .svg-holder {
        display: inline-flex;
    }
</style>
