<style lang="scss" scoped>
.detailsBoard {
  width: 100%;

  .exp-container {
    display: flex;
    justify-content: space-between;

    & > div {
      flex: 1;
      text-align: center;
      padding: 0.5rem;
      border-radius: var(--radius-default);
    }

    .balance-count {
      background-color: var(--blue);
      color: var(--white);
    }

    .income-count {
      background-color: var(--green);
    }

    .expense-count {
      background-color: var(--red);
    }

    .price-box {
      display: inline-flex;
      box-shadow: boxShadow(card);

      &:hover {
        box-shadow: boxShadow(card-hover);
      }

      > *:first-child {
        flex: 3;
      }

      > *:last-child {
        flex: 7;
      }

      h4 {
        margin-left: px2rem(5);
      }

      &:not(:last-child) {
        margin-right: 1rem;
      }
    }

    .money.minus,
    .money.plus,
    .balance-amount {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .money {
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

  .day-months {
    margin-bottom: 1rem;
    justify-content: space-around;

    .daily-card {
      padding: 1rem;
      background: var(--dark);
      color: var(--light);
      flex: 1;
    }
  }
}
</style>
<template lang="html">
  <div class="flex-center">
    <div class="detailsBoard">
      <div v-if="totalData" class="day-months flex-center">
        <div class="card daily-card">
          <label class="flex-center">Today's Expense:</label>
          <span class="flex-center">
            <MasterIcon
              svgName="indian-rupees"
              fill-color="#ffffff"
              size="small"
            />
            {{ todaysExpense.toLocaleString('en-IN') }}
          </span>
        </div>
        <div class="card daily-card">
          <label class="flex-center">Today's Income:</label>
          <span class="flex-center">
            <MasterIcon
              svgName="indian-rupees"
              fill-color="#ffffff"
              size="small"
            />
            {{ todaysIncome.toLocaleString('en-IN') }}
          </span>
        </div>
        <div class="card daily-card">
          <label class="flex-center">This Month's Expense:</label>
          <span class="flex-center">
            <MasterIcon
              svgName="indian-rupees"
              fill-color="#ffffff"
              size="small"
            />
            {{ monthsExpense.toLocaleString('en-IN') }}
          </span>
        </div>
        <div class="card daily-card">
          <label class="flex-center">This Month's Income:</label>
          <span class="flex-center">
            <MasterIcon
              svgName="indian-rupees"
              fill-color="#ffffff"
              size="small"
            />
            {{ monthsIncome.toLocaleString('en-IN') }}
          </span>
        </div>
      </div>
      <div v-if="expList" class="exp-container">
        <div class="balance-count price-box hover-transform">
          <MasterIcon
            svgName="cash-bag"
            size="x-large"
            fillColor="#fff"
            extraPath="categories"
          />
          <div class="details-box">
            <h4 class="balance-amount">Balance</h4>
            <h1 id="balance" class="balance-amount">
              <MasterIcon
                svgName="indian-rupees"
                fill-color="#ffffff"
                size="medium"
              />
              {{ balanceMoney.toLocaleString('en-IN') }}
            </h1>
          </div>
        </div>
        <div class="income-count price-box hover-transform">
          <MasterIcon
            svgName="money-plus"
            size="x-large"
            fillColor="#fff"
            extraPath="categories"
          />
          <div class="details-box">
            <h4 class="money plus">Income</h4>
            <h1 id="money-plus" class="money plus">
              <MasterIcon
                svgName="indian-rupees"
                fill-color="#ffffff"
                size="medium"
              />
              +{{ incomeValue.toLocaleString('en-IN') }}
            </h1>
          </div>
        </div>
        <div class="expense-count price-box hover-transform">
          <MasterIcon
            svgName="money-minus"
            size="x-large"
            fillColor="#fff"
            extraPath="categories"
          />
          <div class="details-box">
            <h4 class="money minus">Expense</h4>
            <h1 id="money-minus" class="money minus">
              <MasterIcon
                svgName="indian-rupees"
                fill-color="#ffffff"
                size="medium"
              />
              -{{ expenseValue.toLocaleString('en-IN') }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { FilterByDay, FilterByMonth } from '@/utils/globals'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'

const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
    required: true
  },
  totalData: {
    type: Array,
    default: () => [],
    required: true
  }
})

const expList = computed(() => props.dataList)

const todaysData = computed(() => FilterByDay(props.totalData))
const monthsData = computed(() => FilterByMonth(props.totalData))

const getDataByType = (dataArray, type) => {
  const filteredData = dataArray?.filter((i) => {
    const catObj = inject('types').value?.find((k) => k.id === i.type[0])
    return catObj?.optValue === type
  })

  const dataValue = filteredData?.reduce((acc, item) => {
    return Number(acc) + Number(item.amount)
  }, 0)

  return dataValue
}

const todaysExpense = computed(() => getDataByType(todaysData.value, 'expense'))
const todaysIncome = computed(() => getDataByType(todaysData.value, 'income'))

const monthsExpense = computed(() => getDataByType(monthsData.value, 'expense'))
const monthsIncome = computed(() => getDataByType(monthsData.value, 'income'))

const expenseValue = computed(() => getDataByType(expList.value, 'expense'))
const incomeValue = computed(() => getDataByType(expList.value, 'income'))

const balanceMoney = computed(() => incomeValue.value - expenseValue.value)
</script>
