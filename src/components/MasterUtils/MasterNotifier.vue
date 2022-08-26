<template>
  <div v-if="isVisible" :class="`notification ${type} ${position}`">
    <header>
      <h6>{{ type.Capitalize() }}</h6>
      <span class="close small" @click="hideNotifier">
        <MasterIcon size="x-small" svgName="close-filled" />
      </span>
    </header>
    <main>
      <p class="message">{{ message }}</p>
    </main>
  </div>
</template>
<script setup>
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  type: {
    default: 'info',
    type: String
  },
  message: {
    default: 'Information',
    type: String
  },
  position: {
    default: 'top-right',
    type: String
  },
  timeout: {
    default: 5000,
    type: Number
  }
})

const isVisible = ref(true)

const hideNotifier = () => {
  isVisible.value = false
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false
  }, props.timeout)
})
</script>
