<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
}
</style>
<template lang="html">
  <div class="dashboard pt-3">
    <div class="container container-bg">
      <IconsLibrary v-if="iconsList.length" :iconsList="iconsList" />
      <div v-else class="p-3">No icon files found in directory!</div>
    </div>
  </div>
  <MasterScrollto />
</template>
<script setup>
import { ref } from 'vue'
import { GetDirFiles, CustomSort } from '@/utils/globals'
import IconsLibrary from '@/components/IconsLibrary.vue'
import MasterScrollto from '@/components/MasterUtils/MasterScrollto.vue'

const iconsList = ref([])

const filesDir = '\\src\\assets\\icons'
let fullPath = process.cwd() + filesDir

if (process.env.VUE_APP_IS_PROD === 'true') {
  fullPath = process.resourcesPath + filesDir
}

GetDirFiles(fullPath).then((fileList) => {
  iconsList.value = CustomSort(fileList, 'fileName')
})
</script>
