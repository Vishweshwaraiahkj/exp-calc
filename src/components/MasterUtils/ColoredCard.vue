<style lang="scss" scoped>
.item-card {
  color: v-bind('theme.color');
  background: v-bind('theme.bgColor');
}
</style>
<template>
  <div class="item-card" :class="classes">
    <div class="flex-center" v-if="titleKey">
      <MasterIcon
        v-if="svgName"
        :svgName="svgName"
        fill-color="#ffffff"
        size="small"
      />
      <h2>{{ item[titleKey] }}</h2>
    </div>
    <span v-if="dataKey">{{ item[dataKey] }}</span>
  </div>
</template>
<script setup>
import MasterIcon from './MasterIcon.vue'
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  textColor: {
    default: '#fdfdfd',
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
  classes: {
    default: '',
    type: String
  },
  svgName: {
    default: '',
    type: String
  }
})
const theme = {
  color: props.textColor,
  bgColor: props.item?.colorFill || '#0d0d0d'
}
</script>
