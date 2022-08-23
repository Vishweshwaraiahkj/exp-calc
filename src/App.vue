<template>
  <MasterNotifier
    v-if="toastMsgs.message"
    :key="toastKey"
    :type="toastMsgs.type"
    position="top-center"
    :message="toastMsgs.message"
    :timeout="3000"
  />
  <AppHeader>
    <nav class="menu">
      <router-link to="/">Home</router-link> |
      <router-link to="/tools">Tools</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </AppHeader>
  <router-view />
  <AppFooter />
</template>
<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import MasterNotifier from '@/components/MasterUtils/MasterNotifier.vue'
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const toastMsgs = ref({})
const toastKey = ref(0)

watchEffect(() => {
  toastMsgs.value = store.getters['utils/getGlobalMsgs']
  toastKey.value = toastKey.value + 1
})
</script>
<style lang="scss">
@import '@/assets/styles/_global.scss';
</style>
