<style lang="scss">
header.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 0;
  height: 4rem;
  z-index: 9;

  .app-controls {
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;

    .top-btn {
      -webkit-app-region: no-drag;
      background: transparent;
      border: 2px solid transparent;

      &:hover {
        background: var(--dark);
        border: 2px solid var(--dark);
      }

      svg:hover {
        background: var(--dark);
        fill: var(--light);
      }
    }
  }
}
</style>
<template lang="html">
  <header class="header">
    <div class="app-controls">
      <button @click="minApp" class="top-btn app-minimize" title="Minimize">
        <MasterIcon size="x-small" svgName="minimize" fill-color="white" />
      </button>
      <button @click="maxApp" :class="`top-btn ${maxClass}`" :title="maxTitle">
        <MasterIcon
          v-if="isMaximized"
          size="x-small"
          svgName="restore"
          fill-color="white"
        />
        <MasterIcon
          v-else
          size="x-small"
          svgName="maximize"
          fill-color="white"
        />
      </button>
      <button @click="closeApp" class="top-btn app-close" title="Close">
        <MasterIcon size="x-small" svgName="close-filled" fill-color="white" />
      </button>
    </div>
    <MasterIcon size="large" svgName="master-logo" />
    <slot></slot>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'

const isMaximized = ref(true)
const maxClass = ref('app-maximize')
const maxTitle = ref('Maximize')

const ipc = window.ipcRenderer

const closeApp = () => {
  ipc.send('CloseApp')
}

const minApp = () => {
  ipc.send('MinimizeApp')
}

const maxApp = () => {
  ipc.send('MaximizeApp')
}

const changeMaxBtn = (isMax) => {
  if (isMax) {
    isMaximized.value = true
    maxClass.value = 'app-maximize'
    maxTitle.value = 'Maximize'
  } else {
    isMaximized.value = false
    maxClass.value = 'app-restore'
    maxTitle.value = 'Restore'
  }
}

ipc.on('isMaximized', () => changeMaxBtn(true))
ipc.on('isRestored', () => changeMaxBtn(false))
</script>
