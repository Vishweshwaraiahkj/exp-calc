<template>
  <div class="col-12">
    <h2>ExpensesTable</h2>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Type</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData()" :key="item.id">
          <td>{{ item.type }}</td>
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
    expensesObject: {
      type: Array,
      default: () => { },
      required: true
    }
  },
  setup (props) {
    const filteredData = () => {
      return props.expensesObject?.filter(
        (u) => u.type && u.category && u.amount && u.date
      )
    }
    return {
      filteredData
    }
  }
}
</script>
