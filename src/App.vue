<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/expenses">Expenses</router-link>
  </nav>
  <router-view />
</template>
<style lang="scss">
@import "@/assets/styles/_global.scss";
</style>
