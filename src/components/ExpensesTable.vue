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
      <MasterIcon size="medium" svgName="filter" />
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
            {{ item.name }}
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
          <td>
            <span
              v-for="type in item.type"
              :class="type.optionValue"
              :key="type.optionId"
            >
              {{ type.optionName }}
            </span>
          </td>
          <td>{{ item.amount }}</td>
          <td>
            <span
              class="category"
              v-for="cat in item.category"
              :key="cat.optionId"
            >
              {{ cat.optionName }}
            </span>
          </td>
          <td>{{ item.description }}</td>
          <td>{{ item.date }}</td>
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
                  @footerConfirm="deleteItem"
                  @footerCancel="deleteCancel"
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
    />
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterModal from '@/components/MasterUtils/MasterModal.vue'
import MasterPaginate from '@/components/MasterUtils/MasterPaginate.vue'
import AddExpenses from '@/components/AddExpenses.vue'
import MasterInput from './MasterInputs/MasterInput.vue'

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

const sortArrayObjects = (a, b) => {
  if (a.constructor.name !== 'Array' || b.constructor.name !== 'Array') {
    return false
  }
  let modifier = 1
  if (sortType.value === 'desc') {
    modifier = -1
  }
  if (a[0].optionName < b[0].optionName) {
    return -1 * modifier
  }
  if (a[0].optionName > b[0].optionName) {
    return 1 * modifier
  }
  return 0
}

const sortPrimitives = (a, b) => {
  let modifier = 1
  if (sortType.value === 'desc') {
    modifier = -1
  }
  if (a < b) {
    return -1 * modifier
  }
  if (a > b) {
    return 1 * modifier
  }
  return 0
}

const sortedData = computed(() => {
  return validData().sort((a, b) => {
    let itemA = a[sortBy.value]
    const itemB = b[sortBy.value]

    if (!isNaN(itemA)) itemA = Number(itemA)
    if (!isNaN(itemA)) itemA = Number(itemA)

    if (itemA.constructor.name === 'Array') {
      return sortArrayObjects(itemA, itemB)
    }
    return sortPrimitives(itemA, itemB)
  })
})

const trimString = (s) => {
  let l = 0
  let r = s.length - 1
  while (l < s.length && s[l] === ' ') l++
  while (r > l && s[r] === ' ') r -= 1
  return s.substring(l, r + 1)
}

const compareObjects = (o1, o2) => {
  let k = ''
  for (k in o1) {
    if (o1[k] !== o2[k]) return false
  }
  for (k in o2) {
    if (o1[k] !== o2[k]) return false
  }
  return true
}

const itemExists = (haystack, needle) => {
  for (let i = 0; i < haystack.length; i++) {
    if (compareObjects(haystack[i], needle)) return true
  }
  return false
}

const searchedData = computed(() => {
  const results = []
  const toSearch = trimString(searchKey.value).toLowerCase() // trim it
  for (let i = 0; i < sortedData.value.length; i++) {
    for (const key in sortedData.value[i]) {
      let searchItem = sortedData.value[i][key]
      if (typeof searchItem === 'string') {
        searchItem = searchItem.toLowerCase()
      }
      if (searchItem.indexOf(toSearch) !== -1) {
        if (!itemExists(results, sortedData.value[i])) {
          results.push(sortedData.value[i])
        }
      }
    }
  }
  return results
})

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
<style lang="scss">
.filter-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 0.625rem;

  .svg-holder {
    cursor: pointer;
  }

  input {
    box-shadow: var(--default-shadow);
  }
}

table {
  thead tr th {
    min-width: 20%;
    white-space: nowrap;
    cursor: pointer;

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
  }
}

.actions {
  display: inline-flex;

  .action {
    padding: 0.5rem;
    margin-right: 5px;
    border-radius: 3px;

    &.delete {
      background-color: red;
    }

    &.update {
      background-color: green;
    }
  }
}
</style>
