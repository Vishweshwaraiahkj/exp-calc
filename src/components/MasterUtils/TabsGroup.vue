<style lang="scss">
ul {
  &.tabs__header {
    display: block;
    list-style: none;
    margin: 0 0 0 px2rem(10);
    padding: 0;

    > li {
      padding: 1rem px2rem(20);
      border-radius: px2rem(5);
      margin: 0;
      display: inline-block;
      margin-right: px2rem(5);
      cursor: pointer;

      &.tab__selected {
        font-weight: bold;
        border-radius: px2rem(5) px2rem(5) 0 0;
        border-bottom: px2rem(5) solid transparent;
      }
    }
  }
}

.tab {
  display: block;
  color: var(--black);
  padding: px2rem(10);
  border-radius: px2rem(5);
}

.tabs {
  text-align: center;
}

.tabs__light {
  @include TabsGroup(var(--light), var(--dark));
}

.tabs__dark {
  @include TabsGroup(var(--dark), var(--light));
}
</style>
<template lang="html">
  <div
    :class="{
      tabs: true,
      tabs__light: mode === 'light',
      tabs__dark: mode === 'dark'
    }"
  >
    <ul class="tabs__header">
      <li
        v-for="tab in tabs"
        :key="tab.props.title"
        @click="selectTab(tab.props.tabId)"
        :class="{ tab__selected: tab.props.tabId == selectedId }"
      >
        {{ tab.props.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>
<script setup>
import { onMounted, ref, useSlots } from 'vue'
const selectedId = ref('tab_one')
const mode = ref('dark')

const slots = useSlots()
const emits = defineEmits(['emitStatus'])

const tabs = slots.default().filter((i) => i.type.__name === 'TabsItem')

const selectTab = (id) => {
  selectedId.value = id
  emits('emitStatus', id)
}

onMounted(() => {
  selectTab('tab_one')
})
</script>
