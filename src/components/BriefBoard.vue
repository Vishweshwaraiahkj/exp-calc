<style lang="scss" scoped>
.exp-container {
  display: flex;
  justify-content: space-between;
  background-color: var(--white);
  margin: 1rem auto auto auto;

  & > div {
    flex: 1;
    text-align: center;
    padding: 0.5rem;
    border-right: px2rem(1) solid #dedede;

    &:last-of-type {
      border-right: 0;
    }
  }

  .balance-count {
    background-color: var(--blue);
    color: var(--white);
  }

  .money.minus,
  .money.plus,
  .balance-amount {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .money {
    font-size: px2rem(20);
    letter-spacing: px2rem(1);
    margin: px2rem(5) 0;
    white-space: nowrap;

    &.plus {
      color: var(--white);
    }

    &.minus {
      color: var(--white);
    }
  }
}

.income-count {
  background-color: var(--green);
}

.expense-count {
  background-color: var(--red);
}
</style>
<template>
  <div v-if="expList" class="col-12">
    <div class="exp-container shadow-dark">
      <div class="balance-count">
        <h4 class="balance-amount">Your Balance</h4>
        <h1 id="balance" class="balance-amount">
          <MasterIcon
            svgName="indian-rupees"
            fill-color="#ffffff"
            size="large"
          />
          {{ balanceMoney.toLocaleString('en-IN') }}
        </h1>
      </div>
      <div class="income-count">
        <h4 class="money plus">Income</h4>
        <h3 id="money-plus" class="money plus">
          <MasterIcon
            svgName="indian-rupees"
            fill-color="#ffffff"
            size="small"
          />
          +{{ incomeValue.toLocaleString('en-IN') }}
        </h3>
      </div>
      <div class="expense-count">
        <h4 class="money minus">Expense</h4>
        <h3 id="money-minus" class="money minus">
          <MasterIcon
            svgName="indian-rupees"
            fill-color="#ffffff"
            size="small"
          />
          -{{ expenseValue.toLocaleString('en-IN') }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'

const store = useStore()
const expList = computed(() => store.state.expenses.list)
const expenseValue = computed(() =>
  store.getters['expenses/getDataByType']('expense')
)
const incomeValue = computed(() =>
  store.getters['expenses/getDataByType']('income')
)

const balanceMoney = computed(() => incomeValue.value - expenseValue.value)
</script>
