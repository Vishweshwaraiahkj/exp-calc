<style lang="scss" scoped>
.task_manager {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: px2rem(1) solid var(--green);
  margin-bottom: px2rem(10);
  box-shadow: boxShadow();
  padding: 1rem;

  .complete {
    text-decoration: line-through;
    margin-left: 1rem;
    cursor: pointer;
  }

  .incomplete {
    text-decoration: none;
    margin-left: 1rem;
    cursor: pointer;
  }

  .delete,
  .edit {
    margin-left: 1rem;
  }

  .date {
    display: block;
    font-size: px2rem(12);
    color: var(--secondary);
    margin-left: 1rem;
  }
}
</style>
<template lang="html">
  <div class="task_manager">
    <MasterSwitch
      labelPos="left"
      input-width="2rem"
      v-model:inputValue="SwitchOn"
      @click="switchClick"
      trueIcon="checked-square"
      falseIcon="unchecked-square"
      class="theme-switcher"
    >
      <span :class="stateClass">{{ taskItem.description }}</span>
      <span class="date">{{ taskItem.updateDate }}</span>
    </MasterSwitch>
    <div class="actions">
      <TaskModal
        actionType="update"
        @emitDataUpdate="updateList"
        :defaultsObj="taskItem"
      >
        <MasterIcon
          class="edit"
          svgName="edit"
          size="2rem"
          fillColor="var(--item-color)"
        />
      </TaskModal>
      <DeleteModal
        :currentItem="taskItem"
        title="Delete Task"
        desc="Do you want to proceed with deleting a Task!"
        triggerIconSize="2rem"
        deleteType="tasks"
        fillColor="var(--item-color)"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import MasterSwitch from '@/components/MasterInputs/MasterSwitch.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import TaskModal from '@/components/MasterUtils/TaskModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'

const props = defineProps({
  taskItem: {
    default: () => {},
    type: Object
  }
})

const store = useStore()

const SwitchOn = ref(false)
const stateClass = ref('')

const switchClick = () => {
  if (SwitchOn.value) {
    stateClass.value = 'complete'
  } else {
    stateClass.value = 'incomplete'
  }
  const dataObj = {
    ...props.taskItem,
    status: stateClass.value
  }
  store.dispatch('utils/updateTasks', { dataObj, type: 'update' })
}

watchEffect(() => {
  const status = props.taskItem.status
  stateClass.value = status
  if (status === 'complete') {
    SwitchOn.value = true
  } else {
    SwitchOn.value = false
  }
})

const updateList = (dataObj, type) => {
  store.dispatch('utils/updateTasks', { dataObj, type })
}
</script>
