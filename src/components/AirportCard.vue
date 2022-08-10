<template>
  <div class="airport card">
    <MasterIcon
      :key="isFavorite"
      :svgName="isFavorite"
      classes="heart-favorite"
      size="x-small"
      @click="toggleFavorites"
    />
    <p>{{ airport?.abbreviation }}</p>
    <p>{{ airport?.name }}</p>
    <p>{{ airport?.city }}, {{ airport?.state }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'

const props = defineProps({
  airport: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['toggleFavorite'])

const toggleFavorites = () => emits('toggleFavorite', props.airport)

const isFavorite = computed(() => {
  return props.airport?.favorite ? 'heart-filled' : 'heart-empty'
})
</script>

<style scoped lang="scss">
.airport {
  margin-bottom: 1rem;
  height: 100%;
  padding: 0.625rem;

  p {
    &:first-child {
      font-weight: bold;
      font-size: 1.5rem;
      margin: 0.5rem 0;
    }

    &:last-child {
      font-style: italic;
      font-size: 1rem;
    }
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
