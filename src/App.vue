<style lang="scss">
@import '@/assets/styles/global';
</style>
<template lang="html">
  <div v-if="isLoading">
    <MasterSpinner
      titleText="Loading page... Please be patient!"
      size="large"
    />
  </div>
  <div v-else :key="userPath">
    <MasterNotifier
      v-if="toastMsgs.message"
      :key="toastKey"
      :dataObj="toastMsgs"
    />
    <AppHeader>
      <nav class="menu">
        <router-link to="/">
          <MasterIcon
            svgName="home"
            size="x-small"
            :fillColor="getFillColor('home')"
          />
          Home
        </router-link>
        <span class="menu-separator">|</span>
        <router-link to="/tools">
          <MasterIcon
            svgName="settings"
            size="x-small"
            :fillColor="getFillColor('tools')"
          />
          Tools
        </router-link>
        <span class="menu-separator">|</span>
        <router-link to="/icons">
          <MasterIcon
            svgName="pointer"
            size="x-small"
            :fillColor="getFillColor('icons')"
          />
          Icons
        </router-link>
        <span class="menu-separator">|</span>
        <router-link to="/about">
          <MasterIcon
            svgName="user"
            size="x-small"
            :fillColor="getFillColor('about')"
          />
          About
        </router-link>
      </nav>
    </AppHeader>
    <router-view />
    <AppFooter />
  </div>
</template>
<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import MasterNotifier from '@/components/MasterUtils/MasterNotifier.vue'
import MasterSpinner from '@/components/MasterUtils/MasterSpinner.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'

const store = useStore()
const { currentRoute } = useRouter()

const toastMsgs = ref({})
const toastKey = ref(0)

const ipc = window.ipcRenderer

const userPath = ref('')

const isLoading = computed(() => store.getters['utils/getLoaderStatus'])

watchEffect(() => {
  toastMsgs.value = store.getters['utils/getGlobalMsgs']
  toastKey.value = toastKey.value + 1
})

ipc.on('isAppReady', (e, path) => {
  store.dispatch('utils/setUserPath', path)
  store.dispatch('utils/setLoaderStatus', false)
  userPath.value = path
})

const getFillColor = (routeName) => {
  return currentRoute.value.name === routeName
    ? 'var(--bg-color)'
    : 'var(--item-color)'
}
</script>
