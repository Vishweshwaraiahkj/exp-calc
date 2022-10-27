<style lang="scss" scoped>
.pagination {
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0;

  &-item {
    display: inline-block;
    margin-left: 0.25rem;
    box-shadow: boxShadow(dark);

    button.btn {
      height: 100%;
      min-width: px2rem(45);
    }
  }

  .active {
    background-color: var(--item-color-active);
    color: var(--item-color);
  }
}
</style>
<template lang="html">
  <ul :class="contentWrapper">
    <li class="pagination-item">
      <button
        :class="`btn btn-${btnsVariant}`"
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
      >
        <MasterIcon
          size="x-small"
          svgName="first"
          fillColor="var(--bg-color)"
        />
      </button>
    </li>
    <li class="pagination-item">
      <button
        :class="`btn btn-${btnsVariant}`"
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        <MasterIcon
          size="x-small"
          svgName="previous"
          fillColor="var(--bg-color)"
        />
      </button>
    </li>
    <!-- Visible Buttons Start -->
    <li class="pagination-item" v-for="p in pages" :key="p.number">
      <button
        :class="`btn btn-${btnsVariant} ${isPageActive(p.number)}`"
        type="button"
        :disabled="p.disabled"
        @click="onClickPage(p.number)"
      >
        {{ p.number }}
      </button>
    </li>
    <!-- Visible Buttons End -->
    <li class="pagination-item">
      <button
        :class="`btn btn-${btnsVariant}`"
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
      >
        <MasterIcon size="x-small" svgName="next" fillColor="var(--bg-color)" />
      </button>
    </li>
    <li class="pagination-item">
      <button
        :class="`btn btn-${btnsVariant}`"
        type="button"
        @click="onClickLastPage"
        :disabled="isInLastPage"
      >
        <MasterIcon size="x-small" svgName="last" fillColor="var(--bg-color)" />
      </button>
    </li>
  </ul>
</template>
<script setup>
import { computed } from 'vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'

const props = defineProps({
  numBtnsCount: {
    type: Number,
    required: false,
    default: 3
  },
  totalPages: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  class: {
    type: String,
    default: null
  },
  btnsVariant: {
    type: String,
    default: 'primary'
  }
})

const maxBtns = computed(() => {
  return props.totalPages < props.numBtnsCount
    ? props.totalPages
    : props.numBtnsCount
})

const pages = computed(() => {
  const half = Math.floor(maxBtns.value / 2)
  let to = maxBtns.value

  if (props.currentPage + half >= props.totalPages) {
    to = props.totalPages
  } else if (props.currentPage > half) {
    to = props.currentPage + half
  }

  const from = to - maxBtns.value

  const pagesArray = Array.from({ length: maxBtns.value }, (_, i) => {
    const pageName = i + 1 + from
    return {
      number: pageName,
      disabled: pageName === props.currentPage
    }
  })
  return pagesArray
})

const isInFirstPage = computed(() => {
  return props.currentPage === 1
})

const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages
})

const emit = defineEmits(['pageChanged'])

const onClickFirstPage = () => {
  emit('pageChanged', 1)
}

const onClickPreviousPage = () => {
  emit('pageChanged', props.currentPage - 1)
}

const onClickPage = (page) => {
  emit('pageChanged', page)
}

const onClickNextPage = () => {
  emit('pageChanged', props.currentPage + 1)
}

const onClickLastPage = () => {
  emit('pageChanged', props.totalPages)
}

const isPageActive = (page) => {
  if (props.currentPage === page) {
    return 'active'
  } else {
    return ''
  }
}

const contentWrapper = computed(() => {
  return `pagination ${props.class}`
})
</script>
