<template lang="html">
    <ul class="pagination">
        <li class="pagination-item">
            <button
                class="btn btn-primary"
                type="button"
                @click="onClickFirstPage"
                :disabled="isInFirstPage"
            >
                First
            </button>
        </li>
        <li class="pagination-item">
            <button
                class="btn btn-primary"
                type="button"
                @click="onClickPreviousPage"
                :disabled="isInFirstPage"
            >
                Previous
            </button>
        </li>
        <!-- Visible Buttons Start -->
        <li
            class="pagination-item"
            v-for="page in pages"
            :key="page.name"
        >
            <button
                class="btn btn-primary"
                type="button"
                :disabled="page.isDisabled"
                @click="onClickPage(page.name)"
                :class="{ active: isPageActive(page.name) }"
            >
                {{ page.name }}
            </button>
        </li>
        <!-- Visible Buttons End -->
        <li class="pagination-item">
            <button
                class="btn btn-primary"
                type="button"
                @click="onClickNextPage"
                :disabled="isInLastPage"
            >
                Next
            </button>
        </li>
        <li class="pagination-item">
            <button
                class="btn btn-primary"
                type="button"
                @click="onClickLastPage"
                :disabled="isInLastPage"
            >
                Last
            </button>
        </li>
    </ul>
</template>
<script setup>
import { computed } from 'vue'

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
  }
})

const maxBtns = computed(() => {
  return props.totalPages < props.numBtnsCount
    ? props.totalPages
    : props.numBtnsCount
})

const startPage = computed(() => {
  // When on the first page
  if (props.currentPage === 1) {
    return 1
  }

  // When on the last page, if 0 then default to 1
  if (props.currentPage === props.totalPages) {
    return props.totalPages - maxBtns.value || 1
  }

  // When in-between
  return props.currentPage - 1
})

const pages = computed(() => {
  const range = []

  for (
    let i = startPage.value;
    i <= Math.min(startPage.value + maxBtns.value - 1, props.totalPages);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage
    })
  }

  return range
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
  return props.currentPage === page
}

</script>
<style lang="scss">
.pagination {
    list-style-type: none;
    display: flex;
    justify-content: flex-end;

    &-item {
        display: inline-block;
        margin-left: 0.25rem
    }

    .active {
        background-color: #4AAE9B;
        color: #ffffff;
    }
}
</style>
