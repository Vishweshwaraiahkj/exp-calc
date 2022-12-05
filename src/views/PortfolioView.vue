<style lang="scss">
.printBtn,
.editBtn {
  position: fixed;
  width: px2rem(60);
  height: px2rem(60);
  bottom: px2rem(40);
  background-color: var(--bg-color);
  border-radius: px2rem(50);
  text-align: center;
  box-shadow: boxShadow();
  z-index: 100;

  @include transformContainer(1.1);
}

.printBtn {
  left: px2rem(40);
}

.editBtn {
  left: px2rem(120);
}

.is-hidden {
  display: none;
}

.dashboard.about {
  height: 90vh;
  width: 100vw;
  background-color: var(--bg-color);
  color: var(--item-color);
  margin-bottom: 0rem;
  margin-top: 4rem;

  .about-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;

    .profile-pic {
      height: 80%;
      width: 30%;
      padding: px2rem(16);

      @include transformSvg(0.9);
    }
  }
}

.floating-dev {
  animation: floatAnim 6s ease-in-out infinite;
}
</style>
<template lang="html">
  <MasterNotifier
    v-if="toastMsgs.message"
    :key="toastKey"
    :dataObj="toastMsgs"
  />
  <button class="btn printBtn" @click="createPdf" title="Download as PDF">
    <MasterIcon
      svgName="download-styled"
      size="medium"
      fillColor="var(--item-color)"
    />
  </button>
  <div class="dashboard about pt-3">
    <div class="about-container">
      <MasterPortfolio />
      <MasterIcon
        size="500"
        svgName="developer"
        class="profile-pic floating-dev"
        fillColor="var(--bg-color)"
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon'
import MasterPortfolio from '@/components/Personal/MasterPortfolio'
import MasterNotifier from '@/components/MasterUtils/MasterNotifier.vue'

const ipc = window.ipcRenderer
const toastMsgs = ref({})
const toastKey = ref(0)

const createPdf = (event) => {
  document.querySelector('.main-header').classList.add('is-hidden')
  document.querySelector('.main-footer').classList.add('is-hidden')
  document.querySelector('.printBtn').classList.add('is-hidden')
  document.querySelector('.editBtn').classList.add('is-hidden')
  ipc.send('print-to-pdf')
}

ipc.on('execPdf', (event, pdfResponse) => {
  toastMsgs.value = {
    message: 'Pdf saved to Documents folder!',
    type: 'download',
    path: pdfResponse.path,
    timeout: 5000
  }
  toastKey.value = toastKey.value + 1
  document.querySelector('.main-header').classList.remove('is-hidden')
  document.querySelector('.main-footer').classList.remove('is-hidden')
  document.querySelector('.printBtn').classList.remove('is-hidden')
  document.querySelector('.editBtn').classList.remove('is-hidden')
})
</script>
