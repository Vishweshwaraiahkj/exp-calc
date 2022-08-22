<style lang="scss" scoped>
.filters_container {
  display: flex;
}
</style>
<template lang="html">
  <div class="filters_container">
    <MasterModal
      triggerId="deleteItem"
      modalSize="small"
      btnClasses="delete-btn"
    >
      <template #trigger>
        <MasterIcon size="medium" svgName="filter" />
      </template>
      <template #default>
        <div class="p-3">Hello Boss!</div>
      </template>
    </MasterModal>
  </div>
</template>
<script setup>
import MasterModal from '@/components/MasterUtils/MasterModal.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
</script>
