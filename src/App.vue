<template>
  <AppHeader>
    <nav class="menu">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/flights">Flights</router-link>
    </nav>
  </AppHeader>
  <router-view />
  <AppFooter />
</template>
<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>
<style lang="scss">
@import "@/assets/styles/_global.scss";
</style>
