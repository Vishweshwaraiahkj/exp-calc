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

.tabs__light {
  margin-bottom: 1rem;
  .tab {
    background-color: #fff;
  }
  li {
    background-color: #ddd;
    color: #aaa;
    &.tab__selected {
      background-color: #fff;
      color: #83ffb3;
    }
  }
}

.tabs__dark {
  margin-bottom: 1rem;
  .tab {
    background-color: #555;
    color: #eee;
  }

  li {
    background-color: var(--light-gray);
    color: var(--dark);

    &.tab__selected {
      background-color: #555;
      color: white;
    }
  }
}
</style>
<template>
  <div :class="{ tabs__light: mode === 'light', tabs__dark: mode === 'dark' }">
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
