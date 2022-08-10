<template>
  <header class="header">
    <MasterIcon size="large" svgName="master-logo" />
    <span class="px-10" />
    <slot></slot>
  </header>
</template>

<script setup>
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
</script>
<style lang="scss" scoped>
  header.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin-top: 0;
    height: 4rem;
    z-index: 9;
  }
</style>
