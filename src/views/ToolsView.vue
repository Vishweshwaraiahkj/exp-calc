<style lang="scss" scoped>
.rentals-box {
  display: block;
  color: var(--item-color);

  .rent-receipt {
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 1rem;
  }

  .receipt-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;

    .receipt-title,
    .header-details {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    }

    .header-details {
      align-items: flex-end;
    }
  }

  .receipt-body {
    margin-bottom: 2rem;

    .house-address {
      font-weight: bolder;
      display: inline;

      span:not(:last-child)::after {
        content: ', ';
      }
    }
  }

  .receipt-footer {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: column;
  }
}
</style>
<template lang="html">
  <div class="container">
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
      @click="downloadReciepts"
      title="Download as PDF"
    />
    <TabsGroup @emitStatus="activeStatus">
      <TabsItem
        title="Rent Reciepts"
        tabId="tab_one"
        :isActive="isActive"
        class="rentals-box"
      >
        <div
          v-for="(receipt, i) in jsonData"
          :key="i"
          class="rent-receipt container-bg shadow-dark"
        >
          <div class="receipt-header">
            <div class="receipt-title">
              <h5>RENT RECEIPT</h5>
              <h6>of the month {{ receipt.rent_month }}</h6>
            </div>
            <div class="header-details">
              <span>Receipt No: {{ i + 1 }}</span>
              <span>Date: {{ receipt.signed_date }}</span>
            </div>
          </div>
          <div class="receipt-body">
            Received sum of INR
            <strong>Rs.{{ receipt.rent_amount }}</strong> from
            <strong>{{ receipt.tenant_name }}</strong> towards the rent of
            property located at
            <div class="house-address">
              <span>{{ receipt.house_number }}</span>
              <span>{{ receipt.house_name }}</span>
              <span>{{ receipt.address_line }}</span>
              <span>{{ receipt.city }}-{{ receipt.pincode }}</span>
            </div>
            for the period from <strong>{{ receipt.start_date }}</strong> to
            <strong>{{ receipt.end_date }}</strong>
          </div>
          <div class="receipt-footer">
            <span>{{ receipt.owner_name }}</span>
            <span>(Landlord)</span>
            <span> Pan: {{ receipt.owner_pan }} </span>
          </div>
          <MasterPrintBreak v-if="i + 1 < jsonData.length" />
        </div>
      </TabsItem>
    </TabsGroup>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon'
import MasterNotifier from '@/components/MasterUtils/MasterNotifier.vue'
import MasterPrintBreak from '@/components/MasterUtils/MasterPrintBreak.vue'
import TabsGroup from '@/components/MasterUtils/TabsGroup.vue'
import TabsItem from '@/components/MasterUtils/TabsItem.vue'

const ipc = window.ipcRenderer
const toastMsgs = ref({})
const toastKey = ref(0)
const isActive = ref('')

const downloadReciepts = (event) => {
  document.querySelector('.main-header').classList.add('d-none')
  document.querySelector('.main-footer').classList.add('d-none')
  document.querySelector('.add_item').classList.add('d-none')
  document.querySelector('.main-container').style.margin = 'auto'
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
  document.querySelector('.main-container').style.margin = ''
})

const jsonData = [
  {
    tenant_name: 'Vishweshwarayya K Janagoud',
    tenant_pan: 'AZIPJ0782H',
    owner_name: 'Savithri S J',
    owner_pan: 'EFAPS5088M',
    rent_amount: '30000',
    rent_month: 'November',
    house_number: '#8/1',
    house_name: 'Hema Nilaya',
    address_line:
      'Vidyanagar, Dombarahalli, Dasanapura Hobli, Lakshmipura Post',
    city: 'Bengaluru',
    pincode: '562123',
    start_date: '01-November-2022',
    end_date: '01-December-2022',
    signed_date: '01-January-2023'
  },
  {
    tenant_name: 'Vishweshwarayya K Janagoud',
    tenant_pan: 'AZIPJ0782H',
    owner_name: 'Savithri S J',
    owner_pan: 'EFAPS5088M',
    rent_amount: '30000',
    rent_month: 'December',
    house_number: '#8/1',
    house_name: 'Hema Nilaya',
    address_line:
      'Vidyanagar, Dombarahalli, Dasanapura Hobli, Lakshmipura Post',
    city: 'Bengaluru',
    pincode: '562123',
    start_date: '01-December-2022',
    end_date: '01-January-2023',
    signed_date: '01-January-2023'
  },
  {
    tenant_name: 'Vishweshwarayya K Janagoud',
    tenant_pan: 'AZIPJ0782H',
    owner_name: 'Savithri S J',
    owner_pan: 'EFAPS5088M',
    rent_amount: '30000',
    rent_month: 'January',
    house_number: '#8/1',
    house_name: 'Hema Nilaya',
    address_line:
      'Vidyanagar, Dombarahalli, Dasanapura Hobli, Lakshmipura Post',
    city: 'Bengaluru',
    pincode: '562123',
    start_date: '01-January-2023',
    end_date: '01-February-2023',
    signed_date: '01-January-2023'
  }
]

const activeStatus = (status) => {
  isActive.value = status
}
</script>
