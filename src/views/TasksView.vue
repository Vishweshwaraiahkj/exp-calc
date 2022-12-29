<template lang="html">
  <div class="container container-bg shadow-dark">
    <template v-if="tasksList.length">
      <TasksManager v-for="i in tasksList" :key="i.id" :taskItem="i" />
    </template>
    <template v-else>No tasks found!</template>
    <TaskModal actionType="add" @emitDataUpdate="addToList" btnClass="add_item">
      <MasterIcon
        svgName="add-round"
        size="medium"
        fillColor="var(--item-color)"
        title="Add a task"
      />
    </TaskModal>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import TasksManager from '@/components/TasksManager.vue'
import TaskModal from '@/components/MasterUtils/TaskModal.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon'

const store = useStore()

const tasksList = computed(() => {
  return store.getters['utils/getAllTasks']
})

const addToList = (dataObj, type) => {
  store.dispatch('utils/updateTasks', { dataObj, type })
}

onMounted(() => {
  if (!tasksList.value?.length) {
    store.dispatch('utils/fetchAllTasks')
  }
})
</script>
