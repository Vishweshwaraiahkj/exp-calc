<style lang="scss" scoped>
.item-card {
  color: v-bind('theme.color');
  background: v-bind('theme.bgColor');
}
</style>
<template lang="html">
  <div :class="cardWrapper">
    <div class="flex-center no-space" v-if="titleKey">
      <MasterIcon
        v-if="svgName"
        :svgName="svgName"
        fillColor="var(--glob-light)"
        size="small"
      />
      <h2>{{ item[titleKey] }}</h2>
    </div>
    <span v-if="dataKey">{{ item[dataKey] }}</span>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  textColor: {
    default: '',
    type: String
  },
  titleKey: {
    default: '',
    type: String
  },
  dataKey: {
    default: 'optName',
    type: String
  },
  class: {
    default: '',
    type: String
  },
  svgName: {
    default: '',
    type: String
  }
})

const theme = {
  color: props.textColor || 'var(--glob-light)',
  bgColor: props.item?.colorFill || 'var(--bg-color)'
}

const cardWrapper = computed(() => {
  return `item-card ${props.class}`
})
</script>
