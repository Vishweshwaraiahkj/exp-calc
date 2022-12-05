<style lang="scss">
.title {
  display: flex;
  align-items: center;
}

.icon-search {
  padding: 0;
  margin-bottom: 1rem;

  .form-control {
    height: px2rem(50);
  }
}

.icons-holder {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
<template lang="html">
  <div class="dashboard pt-3">
    <div class="container icon-search">
      <MasterInput
        input-id="iconSearchId"
        input-name="icon-search"
        input-placeholder="Search for an Icon!"
        input-type="text"
        input-width="100%"
        leftIcon="search"
        v-model:input-value="searchStr"
      />
    </div>
    <div class="container container-bg icons-holder">
      <IconsLibrary v-if="iconsList.length" :iconsList="searchedIcons" />
      <div v-else class="p-3">No icon files found in directory!</div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { GetDirFiles, CustomSort, SearchObjectsArray } from '@/utils/globals'
import IconsLibrary from '@/components/IconsLibrary.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'

const iconsList = ref([])
const searchStr = ref('')

const filesDir = '\\src\\assets\\icons'
let fullPath = process.cwd() + filesDir

if (process.env.VUE_APP_IS_PROD === 'true') {
  fullPath = process.resourcesPath + filesDir
}

GetDirFiles(fullPath).then((fileList) => {
  iconsList.value = CustomSort(fileList, 'fileName')
})

const searchedIcons = computed(() => {
  if (searchStr.value) {
    return SearchObjectsArray(iconsList.value, searchStr.value, 'searchKey')
  }
  return iconsList.value
})
</script>
