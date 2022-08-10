<template>
  <button
    class="btn"
    :class="btnClasses"
    :id="triggerId"
    @click="toggleModal"
  >
    <slot name="trigger"></slot>
  </button>
  <div
    id="myModal"
    :class='`modal ${size}`'
    v-if="isShow"
    @click="toggleModal"
  >
    <div class="modal-content shadow-dark" @click.stop="">
      <span class="close medium" @click="toggleModal">
        <MasterIcon size="x-small" svgName="close-cross"/>
      </span>
      <header v-if="headerSlot" class="modal-header">
        <slot name="header"></slot>
      </header>
      <main v-if="defaultSlot" class="modal-body">
        <slot></slot>
      </main>
      <footer v-if="footerSlot" class="modal-footer">
        <slot name="footer"></slot>
        <button
          class="btn btn-primary my-2 mr-2"
          @click="confirmAction"
        >
          Confirm
        </button>
        <button
          class="btn btn-danger my-2"
          @click="cancelAction"
        >
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, useSlots } from 'vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import { useStore } from 'vuex'

const props = defineProps({
  triggerId: {
    default: 'myBtn',
    type: String
  },
  modalSize: {
    default: 'medium',
    type: String
  },
  btnClasses: {
    default: '',
    type: String
  }
})

const store = useStore()

const emits = defineEmits(['footerConfirm', 'footerCancel'])

const slots = useSlots()

const isShow = ref(false)
const size = ref(props.modalSize)
const modalState = computed(() => store.getters['utils/getModalStatus'])

const toggleModal = (e) => {
  isShow.value = !isShow.value
}

const headerSlot = computed(() => {
  return !!slots.header
})

const defaultSlot = computed(() => {
  return !!slots.default
})

const footerSlot = computed(() => {
  return !!slots.footer
})

const confirmAction = () => {
  emits('footerConfirm')
  if (modalState.value === 'close') {
    toggleModal()
    store.dispatch('utils/changeModalStatus', '')
  }
}

const cancelAction = () => {
  emits('footerCancel')
  toggleModal()
}

</script>

<style lang="scss" scoped>
// Modal popup styles

/* The Modal (background) */
.modal {
  display         : block;
  position        : fixed;
  z-index         : 200;
  padding-top     : 100px;
  left            : 0;
  top             : 0;
  width           : 100%;
  height          : 100%;
  overflow        : auto;
  background-color: rgb(0 0 0 / 25%);

  &.small .modal-content {
    width: 30%;
  }

  &.medium .modal-content {
    width: 50%;
  }

  &.large .modal-content {
    width: 80%;
  }

  /* Modal Content */
  &-content {
    position                  : relative;
    background-color          : #fefefe;
    margin                    : auto;
    padding                   : 0;
    border                    : 1px solid #888;
    width                     : 80%;
    -webkit-animation-name    : animate-top;
    -webkit-animation-duration: 0.4s;
    animation-name            : animate-top;
    animation-duration        : 0.4s
  }

  &-header {
    padding         : 2px 16px;
    color           : white;
  }

  &-body {
    padding: 2px 16px;
  }

  &-footer {
    padding         : 2px 16px;
    color           : white;
    display: flex;
    justify-content: flex-end;
  }
}

/* Add Animation */
@-webkit-keyframes animate-top {
  from {
    top    : -300px;
    opacity: 0
  }

  to {
    top    : 0;
    opacity: 1
  }
}

@keyframes animate-top {
  from {
    top    : -300px;
    opacity: 0
  }

  to {
    top    : 0;
    opacity: 1
  }
}
</style>
