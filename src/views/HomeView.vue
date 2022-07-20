<template>
  <div class="dashboard">
    <AppHeader />
    <h1 class="p-3">{{ $store.getters["user/fullName"] }}</h1>
    <div class="container grid-container">
      <div
        v-for="airport in airports"
        :key="airport.abbreviation"
        class="grid-item"
      >
        <airport-card
          :airport="airport"
          @click="$store.dispatch('airports/addToFavourites', airport)"
        />
      </div>
    </div>
    <h2 v-if="$store.state?.airports?.favourites?.length">Favourites</h2>
    <div class="container grid-container">
      <div
        v-for="airport in $store.state.airports.favourites"
        :key="airport.abbreviation"
        class="grid-item"
      >
        <airport-card
          :airport="airport"
          @click="$store.dispatch('airports/removeFromFavourites', airport)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import allAirports from '@/data/airports.js'
import AirportCard from '@/components/AirportCard.vue'

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    AirportCard
  },
  setup () {
    const airports = ref(allAirports)
    return { airports }
  }
}
</script>
