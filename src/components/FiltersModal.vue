<style lang="scss">
.filters {
  display: flex;
  margin-left: 1rem;

  .grid-summary {
    display: inline-flex;
    padding: 0;
  }

  .category-card {
    display: inline-flex;
    box-shadow: boxShadow();
  }
}
</style>
<template>
  <div class="filters">
    <MasterModal
      triggerId="gridSummary"
      modalId="filtersModal"
      modalSize="medium"
      btnClasses="grid-summary"
    >
      <template #trigger>
        <MasterIcon size="medium" svgName="grid-light" />
      </template>
      <template #header><h1>Summary</h1></template>
      <template #default>
        <TabsGroup @emitStatus="activeStatus">
          <TabsItem title="Expenses" tabId="tab_one" :isActive="isActive">
            <div class="content-holder">
              <span
                v-for="iData in ExpensesObjects"
                :key="iData.optName"
                class="category-card m-1"
              >
                <ColoredCard
                  :item="iData"
                  titleKey="totalAmount"
                  classes="calc-card p-2"
                  dataKey="optName"
                  svgName="indian-rupees"
                />
              </span>
            </div>
          </TabsItem>
          <TabsItem title="Incomes" tabId="tab_two" :isActive="isActive">
            <div class="content-holder">
              <span
                v-for="iData in IncomesObjects"
                :key="iData.optName"
                class="category-card m-1"
              >
                <ColoredCard
                  :item="iData"
                  titleKey="totalAmount"
                  classes="calc-card p-2"
                  dataKey="optName"
                  svgName="indian-rupees"
                />
              </span>
            </div>
          </TabsItem>
          <TabsItem title="Credits" tabId="tab_three" :isActive="isActive">
            <div class="content-holder">
              <span
                v-for="iData in CreditsObjects"
                :key="iData.optName"
                class="category-card m-1"
              >
                <ColoredCard
                  :item="iData"
                  titleKey="totalAmount"
                  classes="calc-card p-2"
                  dataKey="optName"
                  svgName="indian-rupees"
                />
              </span>
            </div>
          </TabsItem>
        </TabsGroup>
      </template>
    </MasterModal>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { GroupByKey, UnderscoreToSpace } from '@/utils/globals'
import MasterModal from '@/components/MasterUtils/MasterModal.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import ColoredCard from '@/components/MasterUtils/ColoredCard.vue'
import TabsGroup from '@/components/MasterUtils/TabsGroup.vue'
import TabsItem from '@/components/MasterUtils/TabsItem.vue'

const store = useStore()
const isActive = ref('')

const dataArray = computed(() => store.state.expenses.list)

const groupedData = GroupByKey(dataArray.value, 'category')

const FilterData = (dataType) =>
  Object.keys(groupedData)
    ?.map((key) => {
      const computedData = groupedData[key]?.reduce((res, i) => {
        if (i.type[0].optValue === dataType) {
          res = res + Number(i.amount)
        }
        return res
      }, 0)
      return {
        totalAmount: computedData.toLocaleString('en-IN'),
        optName: UnderscoreToSpace(key),
        colorFill: groupedData[key][0]?.category.colorFill
      }
    })
    .filter((i) => i.totalAmount !== '0')

const ExpensesObjects = FilterData('expense')

const IncomesObjects = FilterData('income')

const CreditsObjects = FilterData('credits')

const activeStatus = (status) => {
  isActive.value = status
}
</script>
