<style lang="scss">
.filter-box {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 0.625rem;
}

.master__table {
  margin-bottom: px2rem(16);
  padding: px2rem(10);
  box-shadow: boxShadow();

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
      border-radius: var(--radius-default);
    }

    .sort-icon {
      fill: var(--white);
    }
  }

  tbody tr {
    td {
      min-width: 20%;
      max-width: 20%;

      &:last-child {
        text-align: center;
      }
    }

    &.table-tools td {
      padding: 0;
    }

    .picker-container {
      text-align: left;
    }
  }

  .description {
    cursor: pointer;
  }
}

.list-view {
  .sort__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .header-sort,
    .sort-block {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      border-radius: var(--radius-default);
      padding: var(--table-cell-padding);
      background-color: var(--item-color);
      color: var(--bg-color);
      flex: 1;
    }

    .sort-icon {
      fill: var(--white);
    }
  }

  .item-row {
    padding: px2rem(16);
    margin-bottom: px2rem(16);
    box-shadow: boxShadow();
    border-radius: var(--radius-default);

    .left-box {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      width: 80%;

      .desc-box {
        padding: 0 px2rem(10);
        display: flex;
        flex-direction: column;

        .description {
          font-weight: bold;
          font-size: 1rem;
        }

        .date {
          color: var(--text-secondary);
        }
      }
    }

    .right-box {
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
      width: 20%;

      .type-details {
        padding: px2rem(10);
        border-radius: var(--radius-default);
        height: px2rem(36);
        align-items: center;
        display: inline-flex;
        margin-right: 1rem;
        min-width: px2rem(80);
      }

      .price-box {
        margin-right: 1rem;
        display: inline-flex;
        align-items: center;
        gap: px2rem(5);
      }
    }

    &__icon {
      padding: px2rem(10);
      border-radius: var(--radius-default);
      background-color: var(--success-lt);
    }

    &__category {
      padding: px2rem(10);
      border-radius: var(--radius-default);
      margin-right: px2rem(10);
    }
  }
}

.actions {
  display: inline-flex;
  height: px2rem(36);

  .action {
    margin: 0 px2rem(3);
    border-radius: var(--radius-default);
    &.delete,
    &.update {
      min-width: px2rem(25);
      min-height: px2rem(25);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.match-space {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: px2rem(2) solid var(--item-color);
  margin: px2rem(10) 0 0 0;
  padding-top: px2rem(10);
}

@media only screen and (min-width: 768px) and (max-width: 960px) {
  .match-space {
    //flex-direction: column;
    gap: 1rem;

    div,
    ul {
      width: 100%;
    }

    .pagination {
      justify-content: space-between;
      width: 100%;
      padding: 0;

      .pagination-item,
      .pagination-item > button.btn {
        width: 100%;
      }
    }
  }
}

.total-rows {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  background: var(--input-bg-color);
  color: var(--item-color);
  height: px2rem(40);
  font-size: px2rem(14);
  font-weight: 400;
  line-height: 1.5;
  white-space: nowrap;
  box-shadow: boxShadow(dark);
  border-radius: var(--radius-default);
}

.view__switcher {
  padding: 0 px2rem(3);
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
        leftIcon="search"
        v-model:input-value="searchStr"
      />
      <div class="flex-center">
        <div :key="v4()">
          <MasterDonut v-if="finalData.length" :donutData="finalData" />
        </div>
        <MasterSwitch
          input-label="Show all"
          label-pos="left"
          input-width="3rem"
          v-model:inputValue="allRows"
          @click="filterRows"
        />
        <MasterPicker
          v-if="!allRows"
          inputPlaceholder="Add date here"
          pickerType="month-picker"
          :isRequired="false"
          v-model:inputDate="selectedMonth"
          inputWidth="15rem"
          @emitDateTime="getDateTime"
          :isClearable="false"
        />
        <FiltersModal
          :dataArray="finalData"
          :monthly="selectedMonth"
          :allRows="allRows"
          :key="v4()"
        />
        <MasterSwitch
          labelPos="left"
          inputWidth="1.75rem"
          v-model:inputValue="toggleView"
          trueIcon="list-header"
          falseIcon="table-header"
          class="view__switcher"
        />
      </div>
    </div>
    <div v-if="viewTable" class="table-view">
      <table class="table master__table table-striped table-hover shadow-dark">
        <thead v-if="tableHeaders.length">
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
                class="sort-icon"
                fillColor="var(--bg-color)"
              />
            </th>
          </tr>
        </thead>
        <tbody v-if="visibleData.length">
          <tr v-for="item in visibleData" :key="item.id">
            <td>
              <template v-for="type in item.type" :key="type?.id">
                <MasterBadge
                  :item="type"
                  class="type"
                  textColor="var(--glob-light)"
                />
              </template>
            </td>
            <td class="amount">
              {{ Number(item.amount).toLocaleString('en-IN') }}
            </td>
            <td class="categories">
              <CategoryList :catList="item.category" />
            </td>
            <td class="description">
              <MasterPopover
                :trigger="descSubstr(item, 31)"
                :description="item.description"
              />
            </td>
            <td class="date">
              <MasterDates
                format="YYYY-MM-DD HH:MM"
                :dateStr="item.date"
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
                    fillColor="var(--item-color)"
                  />
                </span>
                <span class="action delete">
                  <DeleteModal
                    :current-item="item"
                    title="Delete Expense"
                    desc="Do you want to proceed with deleting an Expense"
                    delete-type="expenses"
                    triggerIconSize="x-small"
                    fillColor="var(--item-color)"
                  />
                </span>
              </div>
            </td>
          </tr>
          <tr class="table-tools no-effects">
            <td :colspan="tableHeaders.length">
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
                  <span class="total-rows">
                    Total Rows: {{ finalData?.length }}
                  </span>
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
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6">No entries for the Search!</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="list-view">
      <div class="sort__btns" v-if="sortableHeaders.length">
        <span
          v-for="item in sortableHeaders"
          :key="item.name"
          @click="headerActions(item.actionType)"
          :class="sortBy === item.actionType ? 'header-sort' : 'sort-block'"
        >
          <span>{{ item.name }}</span>
          <MasterIcon
            v-if="item.sort && sortBy === item.actionType"
            size="small"
            :svgName="sortType === 'asc' ? 'chevron-up' : 'chevron-down'"
            :key="sortType"
            class="sort-icon"
            fillColor="var(--bg-color)"
          />
        </span>
      </div>
      <div v-if="visibleData.length" class="list-wrapper">
        <div
          v-for="item in visibleData"
          :key="item.id"
          class="item-row flex-center"
        >
          <div class="left-box">
            <CategoryList :catList="item.category" listType="icons" />
            <div class="desc-box">
              <span class="description">
                <MasterPopover
                  :trigger="descSubstr(item, 100)"
                  :description="item.description"
                />
              </span>
              <span class="date">
                {{ item.date }}
              </span>
            </div>
          </div>
          <div class="right-box">
            <div class="price-box">
              <MasterIcon
                size="x-small"
                svgName="indian-rupees"
                :key="item.id"
                fillColor="var(--item-color)"
              />
              {{ Number(item.amount).toLocaleString('en-IN') }}
            </div>
            <MasterBadge
              :item="item.type[0]"
              class="type-details"
              textColor="var(--glob-light)"
            />
            <div class="actions">
              <span class="action update item-row__icon">
                <AddExpenses
                  @emitDataUpdate="updateList"
                  :defaultsObj="item"
                  actionType="update"
                  triggerIcon="edit"
                  triggerIconSize="x-small"
                  fillColor="var(--glob-light)"
                />
              </span>
              <span class="action delete item-row__icon">
                <DeleteModal
                  :current-item="item"
                  title="Delete Expense"
                  desc="Do you want to proceed with deleting an Expense"
                  delete-type="expenses"
                  triggerIconSize="x-small"
                  fillColor="var(--glob-light)"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="list-wrapper">No entries for the Search!</div>
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
          <span class="total-rows"> Total Rows: {{ finalData?.length }} </span>
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
  </div>
</template>

<script setup>
import { computed, ref, inject, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { v4 } from 'uuid'
import { CustomSort, SearchObjectsArray, CustomDates } from '@/utils/globals'
import { tableHeaders } from '@/constants/TableData'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterPaginate from '@/components/MasterUtils/MasterPaginate.vue'
import AddExpenses from '@/components/AddExpenses.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'
import FiltersModal from '@/components/FiltersModal.vue'
import MasterBadge from '@/components/MasterUtils/MasterBadge.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import MasterSelect from '@/components/MasterInputs/MasterSelect.vue'
import MasterDates from '@/components/MasterUtils/MasterDates.vue'
import MasterSwitch from '@/components/MasterInputs/MasterSwitch.vue'
import BriefBoard from '@/components/BriefBoard.vue'
import MasterDonut from '@/components/MasterUtils/MasterDonut.vue'
import MasterPicker from '@/components/MasterInputs/MasterPicker.vue'
import MasterPopover from '@/components/MasterUtils/MasterPopover.vue'
import CategoryList from '@/components/MasterUtils/CategoryList.vue'

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
const searchStr = ref('')
const finalData = ref([])
const selectedMonth = ref(CustomDates('MMMM YYYY'))
const allRows = ref(props.showAll)
const filteredPerPage = ref([])
const toggleView = ref(false)
const windowSize = computed(() => store.getters['utils/getWindowSize'])

const viewTable = computed(() => {
  return windowSize.value > 960 && toggleView.value
})

const masterCategories = inject('categories')?.value
const masterTypes = inject('types')?.value

const getCats = (categoryIds) => {
  const objList = categoryIds.reduce((acc, i) => {
    const catObj = masterCategories?.find((k) => k.id === i)
    if (catObj) acc.push(catObj)
    return acc
  }, [])
  return objList
}

const getTypes = (typeIds) => {
  const objList = typeIds.reduce((acc, i) => {
    const typeObj = masterTypes?.find((k) => k.id === i)
    if (typeObj) acc.push(typeObj)
    return acc
  }, [])
  return objList
}

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

const descSubstr = (item, max) => {
  const descStr = item.description
  if (descStr.length > max) {
    return descStr.substr(0, max) + '...'
  } else {
    return descStr
  }
}

const validData = () => {
  const validArray = props.dataArray?.filter((i) => {
    return i.id && i.type && i.category && i.amount && i.date
  })

  const objsData = validArray?.map((i) => {
    const catsObjs = getCats(i.category)
    const typesObjs = getTypes(i.type)
    const fullObj = {
      ...i,
      category: catsObjs,
      type: typesObjs
    }
    return fullObj
  })

  return objsData
}

const sortedData = computed(() =>
  CustomSort(validData(), sortBy.value, sortType.value)
)

const searchedData = computed(() =>
  SearchObjectsArray(sortedData.value, searchStr.value)
)

const totalPages = computed(() => {
  return Math.ceil(finalData.value?.length / perPage.value)
})

watchEffect(() => {
  finalData.value = sortedData.value
  if (searchStr.value) {
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

  if (!allRows.value) emits('emitDataToShow', selectedMonth.value)
  store.dispatch('expenses/updateExpensesList', updatedObj)
}

const getDateTime = (dateTime) => {
  selectedMonth.value = dateTime
  filterRows()
}

const sortableHeaders = computed(() => {
  return tableHeaders.filter((i) => i.sort)
})
</script>
