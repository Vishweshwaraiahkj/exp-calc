<style lang="scss">
.items-holder {
  height: 100%;

  .items {
    margin: 0.625rem;
    font-size: 1rem;
    font-weight: bold;
    border: px2rem(2) solid var(--item-color);
    color: v-bind('itemColor');
    background: v-bind('itemBg');
    box-shadow: boxShadow(dark);

    .card-body .item-label,
    .card-body .item-name {
      color: var(--glob-light);
    }

    .actions-box {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: px2rem(2) solid var(--white);
      padding: 0;

      &:hover {
        fill: var(--red);
      }

      > * {
        border-right: px2rem(2) solid var(--white);
        padding: px2rem(20) 0;
        flex: 1;

        &:last-child {
          border-right: 0;
        }
      }

      button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 0;

        &:focus {
          outline: 0;
        }

        @include transformSvg();
      }
    }
  }
}
</style>
<template lang="html">
  <div class="items-holder">
    <div class="items card">
      <div class="card-header noBg hover-transform">
        <MasterIcon
          :svgName="item?.optIcon"
          :key="item?.optIcon"
          :extraPath="`categories`"
          size="100"
          fillColor="var(--glob-light)"
        />
      </div>
      <div class="card-body">
        <label class="item-label">{{ itemType }}</label>
        <h4 class="item-name">{{ item?.optName }}</h4>
      </div>
      <div class="card-footer noBg actions-box">
        <AddSelectable
          :defaultsObj="item"
          @emitDataUpdate="updateData"
          actionType="update"
          :dataType="type"
          triggerIcon="edit"
          triggerIconSize="24"
          fillColor="var(--glob-light)"
          btnClasses="update_item"
        />
        <DeleteModal
          :currentItem="item"
          :title="`Delete ${itemType}`"
          desc="Do you want to proceed with deleting an item"
          triggerIconSize="24"
          :deleteType="type"
          fillColor="var(--glob-light)"
        />
        <button class="btn fav-btn" @click="toggleFavorites">
          <MasterIcon
            :key="isFavorite"
            :svgName="isFavorite"
            class="act-icon favorite"
            size="24"
            fillColor="var(--glob-light)"
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

const itemBg = ref()
const itemColor = ref()

watchEffect(() => {
  itemBg.value = props.item?.colorFill
})

const itemType = computed(() => {
  if (props.type === 'types') {
    return 'Type'
  } else {
    return 'Category'
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
