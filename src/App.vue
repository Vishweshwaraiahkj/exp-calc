<template>
  <nav class="menu">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/flights">Flights</router-link>
  </nav>
  <AppHeader/>
  <router-view />
</template>
<script>
import AppHeader from '@/components/AppHeader.vue'
export default {
  name: 'App',
  components: { AppHeader }
}
</script>
<style lang="scss">
@import "@/assets/styles/_global.scss";
</style>
