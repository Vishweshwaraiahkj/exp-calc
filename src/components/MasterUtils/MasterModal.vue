<style lang="scss" scoped>
// Modal popup styles

.btn {
  &:focus {
    outline: none;
    box-shadow: none;
  }
}

/* The Modal (background) */
.modal {
  display: block;
  position: fixed;
  z-index: 200;
  padding-top: px2rem(100);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
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
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: px2rem(1) solid #888;
    width: 80%;
    -webkit-animation-name: animate-top;
    -webkit-animation-duration: 0.4s;
    animation-name: animate-top;
    animation-duration: 0.4s;
  }

  &-header {
    padding: px2rem(2) 1rem;
    color: white;
  }

  &-body {
    padding: px2rem(2) 1rem;
  }

  &-footer {
    padding: px2rem(2) 1rem;
    color: white;
    display: flex;
    justify-content: flex-end;
  }
}

/* Add Animation */
@-webkit-keyframes animate-top {
  from {
    top: px2rem(-300);
    opacity: 0;
  }

  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animate-top {
  from {
    top: px2rem(-300);
    opacity: 0;
  }

  to {
    top: 0;
    opacity: 1;
  }
}
</style>
<template>
  <button class="btn" :class="btnClasses" :id="triggerId" @click="toggleModal">
    <slot name="trigger"></slot>
  </button>
  <div id="myModal" :class="`modal ${size}`" v-if="isShow" @click="toggleModal">
    <div class="modal-content shadow-dark" @click.stop="">
      <span class="close medium" @click="toggleModal">
        <MasterIcon fill-color="green" size="x-small" svg-name="close-cross" />
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
          v-if="showAction('confirm')"
          class="btn btn-primary my-2 mr-2"
          @click="confirmAction"
        >
          Confirm
        </button>
        <button
          v-if="showAction('cancel')"
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
  },
  footerBtns: {
    default: () => [],
    type: Array
  }
})

const showAction = (btnName) => props.footerBtns.includes(btnName)

const emits = defineEmits(['footerConfirm', 'footerCancel'])

const slots = useSlots()

const isShow = ref(false)
const size = ref(props.modalSize)

const toggleModal = () => {
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
  toggleModal()
}

const cancelAction = () => {
  emits('footerCancel')
  toggleModal()
}
</script>
