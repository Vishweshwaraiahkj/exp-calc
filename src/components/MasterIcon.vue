<template lang="html">
    <div class="svg-holder">
        <svg :width="iconSize" :height="iconSize">
            <use :href="`${iconsPath}#${iconName}`" />
        </svg>
    </div>
</template>
<script>
import { ref, computed } from 'vue'

export default {
  name: 'MasterIcon',
  props: {
    size: {
      default: 'medium',
      type: String
    },
    svgName: {
      default: '',
      type: String
    }
  },
  setup (props) {
    const iconName = ref(props.svgName)
    const iconSize = ref(null)

    const iconsPath = computed(() => {
      return require(`@/assets/icons/${iconName.value}.svg`)
    })

    if (props.size === 'large') {
      iconSize.value = '64'
    } else if (props.size === 'small') {
      iconSize.value = '16'
    } else {
      iconSize.value = '32'
    }

    return {
      iconSize,
      iconsPath,
      iconName
    }
  }
}
</script>
<style lang="scss">
    .svg-holder {
        display: inline-flex;
    }
</style>
