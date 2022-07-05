<template>
  <div class="col-12">
    <h2 class="m-2">Expenses Table</h2>
    <table class="table table-striped table-hover">
      <thead class="dark">
        <tr>
          <th>Type</th>
          <th>Amount(Rs)</th>
          <th>Category</th>
          <th>Date(yyyy-mm-dd)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData()" :key="item.id">
          <td><span :class="item.type">{{ item.type }}</span></td>
          <td>{{ item.amount }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ExpensesTable',
  props: {
    dataArray: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  setup (props) {
    const filteredData = () => {
      return props.dataArray?.value?.filter(
        (u) => u.type && u.category && u.amount && u.date
      )
    }
    return {
      filteredData
    }
  }
}
</script>
