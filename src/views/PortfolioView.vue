<style lang="scss">
.main-container.about {
  width: 100vw;
  background-color: var(--bg-color);
  color: var(--item-color);

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

.job_card {
  position: relative;
  min-width: 0;

  .grid-item {
    background-color: var(--bg-color);
    word-wrap: break-word;
    background-clip: border-box;
    border-radius: var(--radius-default);
    box-shadow: boxShadow(card);
    padding: 1rem;
  }
}
</style>
<template lang="html">
  <div class="about">
    <MasterNotifier
      v-if="toastMsgs.message"
      :key="toastKey"
      :dataObj="toastMsgs"
    />
    <MasterIcon
      svgName="download-styled"
      size="medium"
      fillColor="var(--item-color)"
      class="add_item"
      @click="createPdf"
      title="Download as PDF"
    />
    <div class="about-container">
      <MasterPortfolio />
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
  document.querySelector('.main-header').classList.add('d-none')
  document.querySelector('.main-footer').classList.add('d-none')
  document.querySelector('.add_item').classList.add('d-none')
  document.querySelector('.edit_item').classList.add('d-none')
  document.querySelector('.jobs_add').classList.add('d-none')
  document.querySelector('.job_actions').classList.add('d-none')
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
  document.querySelector('.main-header').classList.remove('d-none')
  document.querySelector('.main-footer').classList.remove('d-none')
  document.querySelector('.add_item').classList.remove('d-none')
  document.querySelector('.edit_item').classList.remove('d-none')
  document.querySelector('.jobs_add').classList.remove('d-none')
  document.querySelector('.job_actions').classList.remove('d-none')
})
</script>
