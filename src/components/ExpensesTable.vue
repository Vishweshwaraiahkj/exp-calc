<style lang="scss">
.filter-box {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 0.625rem;
}

.match-space {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
}

table.table {
  margin-bottom: 1rem;
  padding: 0.625rem;

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

.total-rows {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  background: var(--white);
  color: var(--dark);
  height: px2rem(38);
  font-size: px2rem(14);
  font-weight: 400;
  line-height: 1.5;
  white-space: nowrap;
  box-shadow: boxShadow();
}
</style>
<template lang="html">
  <div class="col-12">
    <BriefBoard
      v-if="totalData.length"
      :totalData="totalData"
      :dataList="finalData"
    />
    <div class="filter-box mt-2">
      <MasterInput
        input-id="searchId"
        input-name="search"
        input-placeholder="Search the table!"
        input-type="text"
        input-width="25%"
        hasIcon="search"
        v-model:input-value="searchKey"
      />
      <div class="flex-center">
        <div :key="v4()">
          <MasterDonut v-if="totalData.length" :donutData="totalData" />
        </div>
        <MasterSwitch
          input-id="showAll"
          input-label="Show all"
          label-pos="left"
          input-name="all-rows"
          input-type="checkbox"
          input-width="9rem"
          v-model:input-value="allRows"
          @change="filterRows"
        />
        <MasterInput
          v-if="!allRows"
          input-id="monthlyData"
          input-name="monthly"
          input-placeholder="Select a month"
          input-type="month"
          input-width="15rem"
          v-model:input-value="selectedMonth"
          @change="filterRows"
          :isClearable="false"
        />
        <FiltersModal
          :dataArray="finalData"
          :monthly="selectedMonth"
          :allRows="allRows"
          :key="v4()"
        />
      </div>
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
        <tr v-for="item in visibleData" :key="item.id">
          <td>
            <template v-for="type in item.type" :key="type.id">
              <ColoredCard :item="type" classes="type" />
            </template>
          </td>
          <td class="amount">
            {{ Number(item.amount).toLocaleString('en-IN') }}
          </td>
          <td class="categories">
            <template v-for="cat in item.category" :key="cat.id">
              <ColoredCard :item="cat" classes="category" />
            </template>
          </td>
          <td class="description">{{ item.description }}</td>
          <td class="date">
            <MasterDates
              format="YYYY-MM-DD HH:MM"
              :date-str="item.date"
              :key="item.date"
            />
          </td>
          <td>
            <div class="actions">
              <span class="action update">
                <AddExpenses
                  @emitDataUpdate="updateList"
                  :defaultsObj="item"
                  actionType="update"
                  triggerIcon="edit"
                  triggerIconSize="x-small"
                  triggerId="triggerEdit"
                  colorFill="#ffffff"
                />
              </span>
              <span class="action delete">
                <DeleteModal
                  :current-item="item"
                  title="Delete Expense"
                  desc="Do you want to proceed with deleting an Expense"
                  delete-type="expenses"
                  triggerIconSize="x-small"
                />
              </span>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="6">No entries for the Search!</td>
        </tr>
      </tbody>
    </table>
    <div class="match-space">
      <div class="flex-center">
        <MasterSelect
          @emitSelected="getCheckedTypes"
          :selectPlaceholder="perPageOptions[0].optName"
          :selectOptions="filteredPerPage"
          :singleSelect="true"
          :selectWidth="`15rem`"
          :selectText="false"
        />
        <span class="total-rows">Total Rows: {{ finalData?.length }}</span>
      </div>
      <MasterPaginate
        v-if="visibleData.length"
        :totalPages="totalPages"
        :perPage="perPage"
        :currentPage="pageNumber"
        :numBtnsCount="visibleBtns"
        :btns-variant="`dark`"
        @pageChanged="onPageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { v4 } from 'uuid'
import { CustomSort, SearchTheData, CustomDates } from '@/utils/globals'
import { tableHeaders } from '@/constants/TableData'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterPaginate from '@/components/MasterUtils/MasterPaginate.vue'
import AddExpenses from '@/components/AddExpenses.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'
import FiltersModal from '@/components/FiltersModal.vue'
import ColoredCard from '@/components/MasterUtils/ColoredCard.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import MasterSelect from '@/components/MasterInputs/MasterSelect.vue'
import MasterDates from '@/components/MasterUtils/MasterDates.vue'
import MasterSwitch from '@/components/MasterInputs/MasterSwitch.vue'
import BriefBoard from '@/components/BriefBoard.vue'
import MasterDonut from '@/components/MasterUtils/MasterDonut.vue'

const props = defineProps({
  totalData: {
    type: Array,
    default: () => [],
    required: true
  },
  dataArray: {
    type: Array,
    default: () => [],
    required: true
  },
  showAll: {
    type: Boolean,
    default: false
  },
  defaultRows: {
    type: Number,
    default: 10
  }
})

const emits = defineEmits(['emitDataToShow'])

const store = useStore()
const pageNumber = ref(1)
const perPage = ref(props.defaultRows)
const sortBy = ref('date')
const sortType = ref('desc')
const visibleBtns = ref(5)
const searchKey = ref('')
const finalData = ref([])
const selectedMonth = ref(CustomDates('YYYY-MM'))
const allRows = ref(props.showAll)
const filteredPerPage = ref([])

const getCheckedTypes = (data) => {
  const selects = data[0]?.optValue
  if (selects && selects === 'all') {
    perPage.value = props.dataArray?.length
  } else {
    const selectedCnt = Number(data[0]?.optValue) || props.defaultRows
    perPage.value = selectedCnt
  }
}

const perPageOptions = computed(() => {
  const objArray = []
  const pageCnt = props.defaultRows
  for (let i = 1; i <= 10; i++) {
    objArray.push({
      id: `id_${i}`,
      optValue: `${i * pageCnt}`,
      optName: `Show ${i * pageCnt} rows`,
      sortKey: `${i * pageCnt}`,
      checked: i === 1
    })
  }
  return objArray
})

const validData = () => {
  return props.dataArray?.filter((i) => {
    return i.id && i.type && i.category && i.amount && i.date
  })
}

const sortedData = computed(() =>
  CustomSort(validData(), sortBy.value, sortType.value)
)

const searchedData = computed(() =>
  SearchTheData(sortedData.value, searchKey.value)
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

  const x = perPageOptions.value?.filter((i) => {
    const count = Number(i.optValue)
    const dataCount = finalData.value?.length
    if (dataCount >= count || isNaN(count)) {
      return i
    }
    return false
  })
  filteredPerPage.value = x
})

const filterRows = () => {
  if (allRows.value) {
    emits('emitDataToShow', 'ShowAll')
  } else {
    emits('emitDataToShow', selectedMonth.value)
  }
}

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

  store.dispatch('expenses/updateExpensesList', updatedObj)
}
</script>
