<style lang="scss" scoped>
.btn-header {
  padding-bottom: 0;
}
.title {
  display: flex;
  align-items: center;
}
</style>
<template lang="html">
  <div class="dashboard">
    <h1 class="p-1"></h1>
    <div class="container shadow-dark my-2">
      <div class="btn-header">
        <h3 class="px-1 title">Categories</h3>
        <AddSelectable
          trigger-id="categories"
          @emit-data-update="updateData"
          action-type="add"
          data-type="categories"
          fillColor="var(--item-color)"
        />
      </div>
      <div v-if="categories.length" class="grid-container">
        <div
          v-for="category in categories"
          :key="category.id"
          class="grid-item"
        >
          <ItemCard
            :item="category"
            @toggleFavorite="changeFavorite"
            type="categories"
          />
        </div>
      </div>
      <div v-else class="grid-container"><h3>No data found!</h3></div>

      <div class="btn-header">
        <h3 class="px-1 title">Types</h3>
        <AddSelectable
          trigger-id="types"
          @emitDataUpdate="updateData"
          actionType="add"
          dataType="types"
          fillColor="var(--item-color)"
        />
      </div>
      <div v-if="types.length" class="grid-container">
        <div v-for="type in types" :key="type.id" class="grid-item">
          <ItemCard
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
import ItemCard from '@/components/ItemCard.vue'
import AddSelectable from '@/components/MasterUtils/AddSelectable.vue'

const store = useStore()

const categories = computed(() => {
  return store.getters['utils/getAllCategories']
})
const types = computed(() => {
  return store.getters['utils/getAllTypes']
})

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
