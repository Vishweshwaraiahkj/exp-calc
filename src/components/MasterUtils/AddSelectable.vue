<style lang="scss" scoped>
.selectable {
  display: flex;
}
</style>
<template>
  <div class="selectable">
    <MasterModal
      :triggerId="triggerId"
      modalSize="small"
      btnClasses="add-btn"
      :footerConfirm="addItem"
      :footerCancel="addCancel"
      :footerBtns="['confirm', 'cancel']"
    >
      <template #trigger>
        <MasterIcon :size="triggerIconSize" :svgName="triggerIcon" />
      </template>
      <template #header>
        <h3>Add an Item</h3>
      </template>
      <template #default>
        <form class="col-12" id="addExpIncForm">
          <div class="row">
            <div class="form-group col-6">
              <MasterInput
                input-id="displayNameId"
                input-label="Display Name"
                input-name="displayName"
                input-placeholder="Add Display Name"
                input-type="text"
                v-model:input-value="displayName"
                input-width="100%"
                :input-required="true"
              />
            </div>
            <div class="form-group col-6">
              <MasterInput
                input-id="sortKeyId"
                input-label="Sort Key"
                input-name="sortKey"
                input-placeholder="Add Sort Key"
                input-type="text"
                v-model:input-value="sortKey"
                input-width="100%"
                :input-required="true"
              />
            </div>
            <div class="form-group col-6">
              <MasterInput
                input-id="colorFillId"
                input-label="Color Fill"
                input-name="colorFill"
                input-placeholder="Add a color"
                input-type="text"
                v-model:input-value="colorFill"
                input-width="100%"
                :input-required="true"
              />
            </div>
          </div>
        </form>
      </template>
      <template #footer></template>
    </MasterModal>
  </div>
</template>
<script setup>
import MasterModal from '@/components/MasterUtils/MasterModal.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'

const props = defineProps({
  defaultsObject: {
    default: () => {},
    type: Object
  },
  triggerIcon: {
    default: 'add',
    type: String
  },
  triggerId: {
    default: '',
    type: String
  },
  triggerIconSize: {
    default: 'medium',
    type: String
  },
  actionType: {
    default: 'add',
    type: String
  }
})

const addItem = () => {
  console.log('props', props)
  return true
}

const addCancel = () => {}
</script>
