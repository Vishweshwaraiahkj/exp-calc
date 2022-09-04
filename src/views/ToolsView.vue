<style lang="scss" scoped>
.btn-header {
  padding-bottom: 0;
}
.title {
  display: flex;
  align-items: center;
}
</style>
<template>
  <div class="dashboard">
    <h1 class="p-3">Categories and Types</h1>
    <div class="container shadow-dark my-2">
      <div class="btn-header">
        <h3 class="px-1 title">Categories</h3>
        <add-selectable
          trigger-id="categories"
          @emit-data-update="updateData"
          action-type="add"
          data-type="categories"
        />
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
      <div v-else class="grid-container"><h3>No data found!</h3></div>
    </div>
    <div class="container shadow-dark my-2">
      <div class="btn-header">
        <h3 class="px-1 title">Types</h3>
        <add-selectable
          trigger-id="types"
          @emitDataUpdate="updateData"
          actionType="add"
          dataType="types"
        />
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
      <div v-else class="grid-container"><h3>No data found!</h3></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { CustomSort } from '@/utils/globals'
import ItemCard from '@/components/ItemCard.vue'
import AddSelectable from '@/components/MasterUtils/AddSelectable.vue'

const categories = computed(() => {
  const unsortedCats = store.getters['utils/getAllCategories']
  return CustomSort(unsortedCats)
})
const types = computed(() => {
  const unsortedTypes = store.getters['utils/getAllTypes']
  return CustomSort(unsortedTypes)
})
const store = useStore()

const changeFavorite = (item, key) => {
  store.dispatch('utils/toggleFavorite', {
    item,
    type: key
  })
}

const updateData = (dataObj, dataType) => {
  store.dispatch('utils/addToList', { dataObj, dataType })
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
