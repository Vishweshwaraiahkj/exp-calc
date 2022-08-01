<template>
  <div class="col-12">
    <h2 class="m-2">Expenses Table</h2>
    <table class="table table-striped table-hover shadow-dark">
      <thead class="dark">
        <tr>
          <th @click="headerActions('type')">Type</th>
          <th @click="headerActions('amount')">Amount(Rs)</th>
          <th @click="headerActions('category')">Category</th>
          <th @click="headerActions('description')">Description</th>
          <th @click="headerActions('date')">Date(YYYY-MM-DD)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) in visibleData"
          :key="item.id"
          :class="tdClass(item.type)"
        >
          <td>
            <span :class="item.type">{{ item.type.Capitalize() }}</span>
          </td>
          <td>{{ item.amount }}</td>
          <td>
            <span class="category" v-for="(cat, i) in item.category" :key="i">
              {{ cat }}
            </span>
          </td>
          <td>{{ item.description }}</td>
          <td>{{ item.date }}</td>
          <td>
            <div class="actions">
              <span class="action update">
                <MasterModal
                  triggerId="updateItem"
                  modalSize="small"
                  btnClasses="update-btn"
                  @footerConfirm="editItem"
                  @footerCancel="editCancel"
                >
                  <template #trigger>
                    <MasterIcon size="small" svgName="edit" />
                  </template>
                  <template #header>
                    <h3 class="py-2">Update this item</h3>
                  </template>
                  <template #default>
                    <p class="py-3">
                      Edit this item
                    </p>
                  </template>
                  <template #footer>
                  </template>
                </MasterModal>
              </span>
              <span class="action delete" @click="setCurrentId(item.id)">
                <MasterModal
                  triggerId="deleteItem"
                  modalSize="small"
                  btnClasses="delete-btn"
                  @footerConfirm="deleteItem"
                  @footerCancel="deleteCancel"
                >
                  <template #trigger>
                    <MasterIcon size="small" svgName="delete" />
                  </template>
                  <template #header>
                    <h3 class="py-2">Delete this item!</h3>
                  </template>
                  <template #default>
                    <p class="py-3">
                      Hey, Do you really want to delete this item?
                    </p>
                  </template>
                  <template #footer>
                  </template>
                </MasterModal>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <MasterPagination
      :totalPages="totalPages"
      :perPage="perPage"
      :currentPage="pageNumber"
      :maxVisibleBtns="visibleBtns"
      @pageChanged="onPageChange"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import MasterIcon from './MasterIcon.vue'
import MasterModal from '@/components/MasterModal.vue'
import MasterPagination from '@/components/MasterPagination.vue'

export default {
  name: 'ExpensesTable',
  components: {
    MasterIcon,
    MasterModal,
    MasterPagination
  },
  props: {
    dataArray: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const pageNumber = ref(1)
    const perPage = ref(4)
    const currentSort = ref('date')
    const sortBy = ref('desc')
    const visibleBtns = 3
    const currentId = ref('')

    const tdClass = (type) => {
      return type === 'income' ? 'plus' : 'minus'
    }

    const filteredData = () => {
      return props.dataArray?.filter((i) => {
        return i.id && i.type && i.category && i.amount && i.date
      })
    }

    const sortedData = computed(() => {
      return filteredData().sort((a, b) => {
        let modifier = 1
        if (sortBy.value === 'desc') modifier = -1
        if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier
        if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier
        return 0
      })
    })

    const visibleData = computed(() => {
      const start = (pageNumber.value - 1) * perPage.value || 0
      const end = pageNumber.value * perPage.value || perPage.value
      return sortedData.value?.slice(start, end)
    })

    const toggleSort = (value) => {
      sortBy.value = (sortBy.value === 'desc') ? 'asc' : 'desc'
    }

    const headerActions = (value) => {
      toggleSort(value)
      currentSort.value = value
    }

    const totalPages = computed(() => {
      return Math.round(sortedData.value?.length / perPage.value)
    })

    const onPageChange = (currentPage) => {
      pageNumber.value = currentPage
    }

    const setCurrentId = (id) => {
      currentId.value = id
    }

    const editItem = () => true

    const editCancel = () => true

    const deleteItem = () => {
      store.dispatch('expenses/deleteById', currentId.value)
      return false
    }

    const deleteCancel = () => true

    return {
      visibleData,
      editItem,
      deleteItem,
      editCancel,
      deleteCancel,
      headerActions,
      onPageChange,
      perPage,
      pageNumber,
      totalPages,
      visibleBtns,
      tdClass,
      setCurrentId
    }
  }
}
</script>
<style lang="scss" scoped>

table {
  thead tr th {
    min-width: 20%;
    white-space: nowrap;
    cursor: pointer;
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
