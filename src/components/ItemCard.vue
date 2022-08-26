<style scoped lang="scss">
.item {
  height: 100%;

  p {
    position: relative;
    color: v-bind('theme.color');
    background: v-bind('theme.bgColor');
    margin: 0.625rem;
    padding: 0.625rem;
    font-size: 1rem;
    font-weight: bold;
    font-style: italic;
  }

  .heart-favorite {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.5rem;
    cursor: pointer;

    &:hover {
      padding-top: 0.625rem;
    }
  }
}
</style>
<template>
  <div class="item">
    <p class="card">
      <MasterIcon
        :key="isFavorite"
        :svgName="isFavorite"
        classes="heart-favorite"
        size="x-small"
        fillColor="#ffffff"
        @click="toggleFavorites"
      />
      {{ item?.optionName }}
    </p>
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
  type: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['toggleFavorite'])

const toggleFavorites = () => emits('toggleFavorite', props.item, props.type)

const isFavorite = computed(() => {
  return props.item?.favorite ? 'heart-filled' : 'heart-empty'
})

const theme = {
  color: '#fdfdfd',
  bgColor: props.item?.colorFill || '#0d0d0d'
}
</script>
