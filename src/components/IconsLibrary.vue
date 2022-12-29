<style lang="scss" scoped>
.icons-grid {
  background: transparent;

  .icon-holder {
    position: relative;
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
  <div class="grid-container grids_5 icons-grid">
    <div
      v-for="icon in iconsList"
      :key="icon.fileName"
      class="grid-item icon-holder"
    >
      <MasterCopy :copyStr="icon.fileStr" />
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
import MasterCopy from '@/components/MasterUtils/MasterCopy.vue'
defineProps({
  iconsList: {
    default: () => [],
    type: Array
  }
})
</script>
