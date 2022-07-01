<template>
  <div class="row">
    <h2>ExpensesTable</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Type</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredUsers" :key="item.id">
          <td>{{ `type` }}</td>
          <td>{{ `amount` }}</td>
          <td>{{ `date` }}</td>
          <td>{{ `category` }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ExpensesTable',
  props: ['users'],
  computed: {
    filteredUsers () {
      return this.users?.filter(
        (u) => u.id && (u.firstName || u.lastName || u.email)
      )
    }
  }
}
</script>
