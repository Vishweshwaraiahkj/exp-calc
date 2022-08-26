<style lang="scss">
.filter-box {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 0.625rem;

  input {
    box-shadow: boxShadow(default);
  }
}

.match-space {
  padding: 1rem 1.5rem;
  box-shadow: boxShadow(default);
  background-color: var(--white);
}

table {
  thead tr th {
    min-width: 20%;
    white-space: nowrap;
    cursor: pointer;

    &:last-child {
      text-align: center;
    }

    &.header-sort {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sort-icon {
      fill: var(--white);
    }
  }

  tbody tr td {
    min-width: 20%;
    max-width: 20%;

    &:last-child {
      text-align: center;
    }
  }
}

.actions {
  display: inline-flex;

  .action {
    padding: 0.5rem;
    margin: 0 px2rem(3);
    border-radius: px2rem(3);

    &.delete {
      background-color: red;
    }

    &.update {
      background-color: green;
    }
  }
}
</style>
<template>
  <div class="col-12 mt-3">
    <div class="filter-box">
      <MasterInput
        input-id="searchId"
        input-name="search"
        input-placeholder="Search the table!"
        input-type="text"
        v-model:input-value="searchKey"
        input-width="25%"
        hasIcon="search"
      />
      <FiltersModal />
    </div>
    <table class="table table-striped table-hover shadow-dark">
      <thead class="dark" v-if="tableHeaders.length">
        <tr>
          <th
            v-for="item in tableHeaders"
            :key="item.name"
            @click="headerActions(item.actionType)"
            :class="sortBy === item.actionType ? 'header-sort' : ''"
          >
            <span>{{ item.name }}</span>
            <MasterIcon
              v-if="item.sort && sortBy === item.actionType"
              size="small"
              :svgName="sortType === 'asc' ? 'chevron-up' : 'chevron-down'"
              :key="sortType"
              classes="sort-icon"
            />
          </th>
        </tr>
      </thead>
      <tbody v-if="visibleData.length">
        <tr
          v-for="item in visibleData"
          :key="item.id"
          :class="tdClass(item.type)"
        >
          <td class="type">
            <template v-for="type in item.type" :key="type.id">
              <LoopsRender :item="type" />
            </template>
          </td>
          <td class="amount">{{ item.amount }}</td>
          <td class="categories">
            <template v-for="cat in item.category" :key="cat.id">
              <LoopsRender :item="cat" />
            </template>
          </td>
          <td class="description">{{ item.description }}</td>
          <td class="date">{{ item.date }}</td>
          <td>
            <div class="actions">
              <span class="action update" @click="setCurrentItem(item)">
                <AddExpenses
                  @emitChangeList="updateList"
                  :defaultsObject="currentItem"
                  actionType="update"
                  triggerIcon="edit"
                  triggerIconSize="x-small"
                  triggerId="triggerEdit"
                />
              </span>
              <span class="action delete" @click="setCurrentItem(item)">
                <MasterModal
                  triggerId="deleteItem"
                  modalSize="small"
                  btnClasses="delete-btn"
                  :footerConfirm="deleteItem"
                  :footerCancel="deleteCancel"
                  :footerBtns="['confirm', 'cancel']"
                >
                  <template #trigger>
                    <MasterIcon size="x-small" svgName="delete" />
                  </template>
                  <template #header>
                    <h3 class="py-2">Delete this item!</h3>
                  </template>
                  <template #default>
                    <p class="py-2">
                      Hey, Do you really want to delete this item?
                    </p>
                  </template>
                  <template #footer></template>
                </MasterModal>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="6">No Data!</td>
        </tr>
      </tbody>
    </table>
    <MasterPaginate
      v-if="visibleData.length"
      :totalPages="totalPages"
      :perPage="perPage"
      :currentPage="pageNumber"
      :numBtnsCount="visibleBtns"
      @pageChanged="onPageChange"
      classes="match-space"
    />
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { customSort, searchData } from '@/utils/globals'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterModal from '@/components/MasterUtils/MasterModal.vue'
import MasterPaginate from '@/components/MasterUtils/MasterPaginate.vue'
import AddExpenses from '@/components/AddExpenses.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'
import FiltersModal from '@/components/FiltersModal.vue'
import LoopsRender from './MasterUtils/LoopsRender.vue'

const props = defineProps({
  dataArray: {
    type: Array,
    default: () => [],
    required: true
  }
})

const store = useStore()
const pageNumber = ref(1)
const perPage = ref(4)
const sortBy = ref('date')
const sortType = ref('desc')
const visibleBtns = ref(5)
const currentItem = ref({})
const searchKey = ref('')
const finalData = ref([])

const tableHeaders = [
  {
    name: 'Type',
    actionType: 'type',
    sort: true
  },
  {
    name: 'Amount(Rs)',
    actionType: 'amount',
    sort: true
  },
  {
    name: 'Category',
    actionType: 'category',
    sort: true
  },
  {
    name: 'Description',
    actionType: 'description',
    sort: true
  },
  {
    name: 'Date(YYYY-MM-DD)',
    actionType: 'date',
    sort: true
  },
  {
    name: 'Actions',
    actionType: '',
    sort: false
  }
]

const tdClass = (type) => {
  return type === 'income' ? 'plus' : 'minus'
}

const validData = () => {
  return props.dataArray?.filter((i) => {
    return i.id && i.type && i.category && i.amount && i.date
  })
}

const sortedData = computed(() =>
  customSort(validData(), sortBy.value, sortType.value)
)

const searchedData = computed(() =>
  searchData(sortedData.value, searchKey.value)
)

const totalPages = computed(() => {
  return Math.ceil(finalData.value?.length / perPage.value)
})

watchEffect(() => {
  finalData.value = sortedData.value
  if (searchKey.value) {
    finalData.value = searchedData.value
  }
  // passing page number as 1 if the data is less than current page number
  // This happens while filtering table with search
  if (pageNumber.value > totalPages.value) {
    pageNumber.value = 1
  }
})

const visibleData = computed(() => {
  const start = (pageNumber.value - 1) * perPage.value || 0
  const end = pageNumber.value * perPage.value || perPage.value
  if (finalData.value?.length > start) {
    return finalData.value?.slice(start, end)
  } else {
    return finalData.value?.slice(0, perPage.value)
  }
})

const toggleSort = () => {
  sortType.value = sortType.value === 'desc' ? 'asc' : 'desc'
}

const headerActions = (value) => {
  if (!value) return
  toggleSort()
  sortBy.value = value
}

const onPageChange = (currentPage) => {
  pageNumber.value = currentPage
}

const setCurrentItem = (item) => {
  currentItem.value = item
}

const deleteItem = () => {
  store.dispatch('expenses/deleteById', currentItem.value?.id)
  return false
}

const deleteCancel = () => true

const updateList = (dataList, type) => {
  if (type !== 'update') return false
  const updatedObj = {
    id: dataList.id,
    description: dataList.description,
    type: dataList.typeList,
    amount: dataList.amount,
    date: dataList.addeddate,
    category: dataList.categoryList
  }

  store.dispatch('expenses/updateToExpensesList', updatedObj)
}
</script>
