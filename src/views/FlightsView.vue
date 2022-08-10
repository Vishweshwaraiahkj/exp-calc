<template>
  <div class="dashboard">
    <h1 class="p-3">{{ $store.getters["user/fullName"] }}</h1>
    <div v-if="airports.length" class="container grid-container">
      <div
        v-for="airport in airports"
        :key="airport.abbreviation"
        class="grid-item"
      >
        <airport-card
          :airport="airport"
          @toggleFavorite="changeFavorite"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import AirportCard from '@/components/AirportCard.vue'

const airports = computed(() => store.getters['airports/getAirports'])
const store = useStore()

const changeFavorite = (airport) => {
  if (airport?.favorite) {
    store.dispatch(
      'airports/removeFavorite',
      airport.abbreviation
    )
  } else {
    store.dispatch(
      'airports/addFavorite',
      airport.abbreviation
    )
  }
}

onMounted(() => {
  if (!airports.value?.length) {
    store.dispatch('airports/fetchAirports')
  }
})

</script>
