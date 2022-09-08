<style lang="scss">
.items-holder {
  height: 100%;

  .items {
    position: relative;
    color: v-bind('itemColor');
    background: v-bind('itemBg');
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.625rem;
    padding: 1rem;
    font-size: 1rem;
    font-weight: bold;
    box-shadow: boxShadow(dark);

    .actions-box {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        fill: var(--red);
      }

      .delete-btn,
      > * {
        margin-left: px2rem(5);
      }

      button:focus {
        outline: 0;
      }
    }
  }
}
</style>
<template lang="html">
  <div class="items-holder">
    <div class="items">
      <span class="display-name">
        {{ item?.optName }}
      </span>
      <div class="actions-box">
        <add-selectable
          :trigger-id="type"
          :defaults-obj="item"
          @emit-data-update="updateData"
          action-type="update"
          :data-type="type"
          trigger-icon="edit"
          trigger-icon-size="x-small"
        />
        <delete-modal
          :current-item="item"
          :title="modalTitle"
          desc="Do you want to proceed with deleting an item"
          :delete-type="type"
        />
        <button class="btn p-0" @click="toggleFavorites">
          <master-icon
            :key="isFavorite"
            :svg-name="isFavorite"
            classes="act-icon favorite"
            size="x-small"
            fill-color="#ffffff"
            @click="toggleFavorites"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import AddSelectable from '@/components/MasterUtils/AddSelectable.vue'
import DeleteModal from '@/components/DeleteModal.vue'

const store = useStore()

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['toggleFavorite'])

const toggleFavorites = () => emits('toggleFavorite', props.item, props.type)

const itemBg = ref('#0d0d0d')
const itemColor = ref('#fdfdfd')

watchEffect(() => {
  itemBg.value = props.item?.colorFill
})

const modalTitle = computed(() => {
  if (props.type === 'types') {
    return 'Delete Type'
  } else {
    return 'Delete Category'
  }
})

const isFavorite = computed(() => {
  return props.item?.favorite ? 'heart-filled' : 'heart-empty'
})

const updateData = (dataObj, dataType) => {
  itemBg.value = dataObj?.colorFill
  store.dispatch('utils/updateList', { dataObj, dataType })
}
</script>
