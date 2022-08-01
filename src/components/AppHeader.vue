<template>
  <div class="header">
    <MasterIcon size="medium" svgName="happy" />
    <span class="px-10" />
    <MasterIcon size="medium" svgName="sad" />
  </div>
</template>

<script>
import MasterIcon from './MasterIcon.vue'
export default {
  name: 'AppHeader',
  components: { MasterIcon }
}
</script>
