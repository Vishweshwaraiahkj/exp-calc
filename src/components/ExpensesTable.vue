<template>
  <div class="col-12">
    <h2 class="m-2">Expenses Table</h2>
    <table class="table table-striped table-hover">
      <thead class="dark">
        <tr>
          <th>Type</th>
          <th>Amount(Rs)</th>
          <th>Category</th>
          <th>Description</th>
          <th>Date(YYYY-MM-DD)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData()" :key="item.uid">
          <td><span :class="item.type">{{ item.type.Capitalize() }}</span></td>
          <td>{{ item.amount }}</td>
          <td>
            <span class="category" v-for="(caty, i) in item.category" :key="i">
              {{ caty }}
            </span>
          </td>
          <td>{{ item.description }}</td>
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
      return props.dataArray?.filter(
        (i) => i.uid && i.type && i.category && i.amount && i.date
      )
    }
    return {
      filteredData
    }
  }
}
</script>
