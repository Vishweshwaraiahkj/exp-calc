<style lang="scss">
@import '@/assets/styles/global';

.main-container {
  position: relative;
  margin-bottom: px2rem(120);
  margin-top: px2rem(120);
}
</style>
<template lang="html">
  <MasterSpinner
    v-if="isLoading"
    titleText="Loading page... Please be patient!"
    size="large"
  />
  <div class="parent-container" v-else :key="userPath">
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
        <router-link to="/settings">
          <MasterIcon
            svgName="settings"
            size="x-small"
            :fillColor="getFillColor('settings')"
          />
          Settings
        </router-link>
        <span class="menu-separator">|</span>
        <router-link to="/tasks">
          <MasterIcon
            svgName="tasks-light"
            size="x-small"
            :fillColor="getFillColor('tasks')"
          />
          Tasks
        </router-link>
        <span class="menu-separator">|</span>
        <router-link to="/tools">
          <MasterIcon
            svgName="house-rent"
            size="x-small"
            :fillColor="getFillColor('tools')"
            extraPath="categories"
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
        <router-link to="/portfolio">
          <MasterIcon
            svgName="user"
            size="x-small"
            :fillColor="getFillColor('portfolio')"
          />
          Portfolio
        </router-link>
      </nav>
    </AppHeader>
    <router-view class="main-container p-2" />
    <AppFooter />
    <MasterScrollto />
  </div>
</template>
<script setup>
import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import MasterNotifier from '@/components/MasterUtils/MasterNotifier.vue'
import MasterSpinner from '@/components/MasterUtils/MasterSpinner.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterScrollto from '@/components/MasterUtils/MasterScrollto.vue'

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
    ? 'var(--glob-light)'
    : 'var(--glob-dark)'
}

onMounted(() => {
  document.title = 'Master Utils'
  window.addEventListener('resize', () => {
    store.dispatch('utils/setWindowSize', window.innerWidth)
  })
})
onUnmounted(() => {
  window.removeEventListener('resize', () => {
    store.dispatch('utils/setWindowSize', window.innerWidth)
  })
})
</script>
