<style lang="scss">
@import '@/assets/styles/_global.scss';
</style>
<template lang="html">
  <div v-if="userPath" :key="userPath">
    <MasterNotifier
      v-if="toastMsgs.message"
      :key="toastKey"
      :type="toastMsgs.type"
      :position="`top-right`"
      :message="toastMsgs.message"
      :timeout="5000"
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
  </div>
  <div v-else>Loading page... Please be patient!</div>
</template>
<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import MasterNotifier from '@/components/MasterUtils/MasterNotifier.vue'

const store = useStore()
const toastMsgs = ref({})
const toastKey = ref(0)

const ipc = window.ipcRenderer

const userPath = ref('')

watchEffect(() => {
  toastMsgs.value = store.getters['utils/getGlobalMsgs']
  toastKey.value = toastKey.value + 1
  userPath.value = computed(() => store.getters['utils/getUserPath'])
})

ipc.on('isAppReady', (e, path) => {
  store.dispatch('utils/setUserPath', path)
})
</script>
