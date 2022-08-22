<template>
  <div class="dashboard">
    <h1 class="p-3">{{ $store.getters['user/fullName'] }}</h1>
    <div class="container shadow-dark my-2">
      <div class="btn-header">
        <h3>Categories</h3>
        <MasterIcon size="medium" svg-name="add" />
      </div>
      <div v-if="categories.length" class="grid-container">
        <div
          v-for="category in categories"
          :key="category.id"
          class="grid-item"
        >
          <item-card
            :item="category"
            @toggleFavorite="changeFavorite"
            type="categories"
          />
        </div>
      </div>
    </div>
    <div class="container shadow-dark my-2">
      <div class="btn-header">
        <h3>Types</h3>
        <MasterIcon size="medium" svg-name="add" />
      </div>
      <div v-if="types.length" class="grid-container">
        <div v-for="type in types" :key="type.id" class="grid-item">
          <item-card
            :item="type"
            @toggleFavorite="changeFavorite"
            type="types"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { customSort } from '@/utils/globals'
import ItemCard from '@/components/ItemCard.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'

const categories = computed(() => {
  const unsortedCats = store.getters['utils/getAllCategories']
  return customSort(unsortedCats)
})
const types = computed(() => {
  const unsortedTypes = store.getters['utils/getAllTypes']
  return customSort(unsortedTypes)
})
const store = useStore()

const changeFavorite = (item, key) => {
  store.dispatch('utils/toggleFavorite', {
    item,
    key
  })
}

onMounted(() => {
  if (!categories.value?.length) {
    store.dispatch('utils/fetchAllCategories')
  }
  if (!types.value?.length) {
    store.dispatch('utils/fetchAllTypes')
  }
})
</script>
