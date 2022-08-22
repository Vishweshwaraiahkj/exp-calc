<style lang="scss" scoped>
.category {
  color: v-bind('theme.color');
  background: v-bind('theme.bgColor');
}
</style>
<template>
  <span class="category">
    {{ item.optionName }}
  </span>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
    required: true
  }
})
const theme = {
  color: '#fdfdfd',
  bgColor: props.item?.colorFill || '#0d0d0d'
}
</script>
