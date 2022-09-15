<style lang="scss">
header.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 0;
  height: 4rem;
  z-index: 9;
  padding: 0;

  .controls-bar {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: px2rem(5);

    .top-btn {
      -webkit-app-region: no-drag;
      background: transparent;
      border: 2px solid transparent;
      width: px2rem(50);
      height: px2rem(40);
      outline: 0;

      &:hover {
        background: var(--dark);
        border: 2px solid var(--dark);
      }

      svg:hover {
        background: var(--dark);
        fill: var(--light);
      }

      &:focus {
        outline: 0;
      }
    }
  }

  .logo-menus {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    height: px2rem(50);

    .master-logo {
      -webkit-app-region: no-drag;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--menu-color);
      box-shadow: var(--menu-shadow) var(--black);
      padding: 0 1rem;
    }
  }
}
</style>
<template lang="html">
  <header class="header main">
    <div class="controls-bar">
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
    <div class="container-fluid logo-menus">
      <span class="master-logo">
        <router-link to="/">
          <MasterIcon size="large" svgName="master-logo" />
        </router-link>
      </span>
      <slot></slot>
    </div>
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
