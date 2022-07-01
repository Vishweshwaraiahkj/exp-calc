<template>
  <div class="col-4 pt-3">
    <h4 class="balance-box">Your Balance</h4>
    <h1 id="balance" class="balance-amount">Rs. {{ balanceMoney }}</h1>
    <div class="exp-container">
      <div>
        <h4>Income</h4>
        <p id="money-plus" class="money plus">Rs. +0.00</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p id="money-minus" class="money minus">Rs. -0.00</p>
      </div>
    </div>
    <div class="btn">
      <button type="button" class="btn btn-primary">Show All Expenses</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'BriefBoard',
  props: {
    balanceAmount: {
      default: 0,
      type: Number
    }
  },
  setup (props) {
    const balanceMoney = ref(props.balanceAmount)

    return {
      balanceMoney
    }
  }
}
</script>
