<style lang="scss">
figure {
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  .chart {
    &-text {
      fill: var(--item-color);
      -moz-transform: translateY(0.25rem);
      -ms-transform: translateY(0.25rem);
      -webkit-transform: translateY(0.25rem);
      transform: translateY(0.25rem);
    }

    &-label {
      font-size: 0.6rem;
      line-height: 1;
      text-anchor: middle;
      -moz-transform: translateY(px2rem(-2));
      -ms-transform: translateY(px2rem(-2));
      -webkit-transform: translateY(px2rem(-2));
      transform: translateY(px2rem(-2));
    }

    &-number {
      font-size: 0.2rem;
      text-transform: uppercase;
      text-anchor: middle;
      -moz-transform: translateY(px2rem(3));
      -ms-transform: translateY(px2rem(3));
      -webkit-transform: translateY(px2rem(3));
      transform: translateY(px2rem(3));
    }
  }

  .figure-content,
  .figure-key {
    align-self: center;
  }

  .figure-content svg {
    height: auto;
  }

  .figure-key {
    [class*='shape-'] {
      margin-right: px2rem(6);
    }

    &-list {
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: px2rem(12);

      li {
        margin: 0 0 px2rem(8);
        padding: 0;

        span:first-child {
          box-shadow: boxShadow(svg-dark);
        }
      }
    }
  }

  .shape {
    &-circle {
      display: inline-block;
      vertical-align: middle;
      width: px2rem(32);
      height: px2rem(32);
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
    }

    &-expense {
      background-color: v-bind('colors.expense');
    }

    &-income {
      background-color: v-bind('colors.income');
    }

    &-credits {
      background-color: v-bind('colors.credits');
    }
  }

  .donut-segment {
    animation-name: fillIn;
    animation-fill-mode: forwards;
    animation-duration: 2000ms;
    animation-timing-function: ease-in-out;
    opacity: 0;
  }
}

@media (min-width: 768px) {
  figure {
    flex-direction: row;
  }
}
</style>
<template lang="html">
  <MasterModal
    triggerId="donutChart"
    modalId="donutChartModal"
    modalSize="medium"
    btnClasses="donut-chart"
  >
    <template #trigger>
      <MasterIcon
        size="30"
        svgName="donut-chart"
        fillColor="var(--item-color)"
      />
    </template>
    <template #header>
      <h1>
        <span>Donut Chart</span>
      </h1>
    </template>
    <template #default>
      <figure>
        <div class="figure-content">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 42 42"
            class="donut shadow-svg-light"
            role="img"
          >
            <g stroke-width="5">
              <circle
                class="donut-hole"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="var(--bg-color)"
                role="presentation"
              ></circle>
              <circle
                class="donut-ring"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="var(--bg-color)"
                role="presentation"
              ></circle>
              <circle
                v-for="i in donutArray"
                class="donut-segment"
                :key="i.strokeColor"
                cx="21"
                cy="21"
                r="15.91549430918954"
                :stroke-dasharray="`${i.dataPer} 100`"
                :stroke-dashoffset="i.offset"
                :stroke="i.strokeColor"
                fill="transparent"
              ></circle>
            </g>
            <g class="chart-text">
              <text x="50%" y="50%" class="chart-label">Total</text>
              <text x="50%" y="50%" class="chart-number">
                {{ totalAmount.toLocaleString('en-IN') }}
              </text>
            </g>
          </svg>
        </div>
        <figcaption class="figure-key">
          <ul class="figure-key-list" aria-hidden="true" role="presentation">
            <li>
              <span class="shape-circle shape-expense"></span>
              <span>
                <label>Expense:</label>
                {{ expenseAmount.toLocaleString('en-IN') }}
                ({{ getPercent(expenseAmount) }}%)
              </span>
            </li>
            <li>
              <span class="shape-circle shape-income"></span>
              <span>
                <label>Income:</label>
                {{ incomeAmount.toLocaleString('en-IN') }}
                ({{ getPercent(incomeAmount) }}%)
              </span>
            </li>
            <li>
              <span class="shape-circle shape-credits"></span>
              <span>
                <label>Credits:</label>
                {{ creditAmount.toLocaleString('en-IN') }}
                ({{ getPercent(creditAmount) }}%)
              </span>
            </li>
          </ul>
        </figcaption>
      </figure>
    </template>
  </MasterModal>
</template>
<script setup>
import { ref } from 'vue'
import MasterModal from '@/components/MasterUtils/MasterModal.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'

const props = defineProps({
  donutWidth: {
    default: '100%',
    type: String
  },
  donutData: {
    default: () => [],
    type: Array
  }
})

const totalAmount = props.donutData?.reduce((added, item) => {
  added = added + Number(item.amount)
  return added
}, 0)

const expenseAmount = props.donutData?.reduce((added, item) => {
  if (item.type[0].optValue === 'expense') {
    added = added + Number(item.amount)
  }
  return added
}, 0)

const incomeAmount = props.donutData?.reduce((added, item) => {
  if (item.type[0].optValue === 'income') {
    added = added + Number(item.amount)
  }
  return added
}, 0)

const creditAmount = props.donutData?.reduce((added, item) => {
  if (item.type[0].optValue === 'credits') {
    added = added + Number(item.amount)
  }
  return added
}, 0)

const getPercent = (amount) => {
  const percent = (amount * 100) / totalAmount
  return Math.round(percent)
}

const colors = {
  expense: 'var(--expense-color)',
  income: 'var(--income-color)',
  credits: 'var(--credit-color)'
}

const donutArray = ref([
  {
    strokeColor: colors.expense,
    offset: 0,
    dataPer: getPercent(expenseAmount)
  },
  {
    strokeColor: colors.income,
    offset: -getPercent(expenseAmount),
    dataPer: getPercent(incomeAmount)
  },
  {
    strokeColor: colors.credits,
    offset: -(getPercent(expenseAmount) + getPercent(incomeAmount)),
    dataPer: getPercent(creditAmount) + 1
  }
])
</script>
