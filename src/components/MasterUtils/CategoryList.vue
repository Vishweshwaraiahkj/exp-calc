<style lang="scss" scoped>
.categories {
  &__more {
    cursor: pointer;
  }

  &__disabled {
    cursor: not-allowed;
  }
}
</style>
<template lang="html">
  <div class="categories">
    <template v-for="cat in textCats" :key="cat?.id">
      <MasterBadge :item="cat" class="category" textColor="var(--glob-light)" />
    </template>
    <MasterIcon
      v-for="cat in catsToShow"
      size="x-small"
      :svgName="cat.optIcon"
      extraPath="categories"
      :key="cat.id"
      class="item-row__category"
      fillColor="var(--glob-light)"
      :bgColor="cat.colorFill"
      :title="cat.optName"
    />
    <MasterIcon
      v-if="listType === 'icons'"
      size="x-small"
      svgName="more"
      :class="catList.length > 1 ? 'categories__more' : 'categories__disabled'"
      :fillColor="getFillColor()"
      @click="toggleMore"
    />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterBadge from '@/components/MasterUtils/MasterBadge.vue'

const props = defineProps({
  listType: {
    default: 'text',
    type: String
  },
  catList: {
    default: () => [],
    type: Array
  }
})

const showMore = ref(false)

const getFillColor = () => {
  return props.catList?.length > 1 ? 'green' : 'lightgray'
}

const catsToShow = computed(() => {
  if (props.listType === 'text') return false
  else if (showMore.value) return props.catList
  else return props.catList.slice(0, 1)
})

const textCats = computed(() => {
  if (props.listType === 'text') return props.catList
  else return false
})

const toggleMore = () => (showMore.value = !showMore.value)
</script>
