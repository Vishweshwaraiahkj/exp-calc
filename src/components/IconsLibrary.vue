<style lang="scss" scoped>
.icons-grid {
  background: transparent;

  .icon-holder {
    padding: px2rem(48) px2rem(16);
    box-shadow: boxShadow();
    display: flex;
    flex-direction: column;
    @include transformContainer(1.1);

    .icon-name {
      color: var(--item-color);
      margin-top: px2rem(10);
    }
  }
}
</style>
<template lang="html">
  <div class="grid-container icons-grid">
    <div
      v-for="icon in iconsList"
      :key="icon.fileName"
      class="grid-item icon-holder"
    >
      <MasterIcon
        :svgName="icon.fileStr"
        :extraPath="icon.subDir"
        size="5rem"
        fillColor="var(--item-color)"
      />
      <span class="icon-name">{{ icon.fileStr }}</span>
    </div>
  </div>
</template>
<script setup>
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
defineProps({
  iconsList: {
    default: () => [],
    type: Array
  }
})
</script>
