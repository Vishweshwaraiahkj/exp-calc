<style lang="scss">
.master-container {
  padding: 1rem;

  .name-title {
    * {
      text-shadow: boxShadow(text);
    }

    h1 {
      font-size: 5rem;
    }

    h2 {
      font-size: 4rem;
    }

    h3 {
      font-size: 3rem;
    }
  }

  #triggerUpdate {
    padding: 0;
  }

  .experience-details {
    margin-top: 2rem;
  }
}
</style>
<template lang="html">
  <div class="master-container">
    <MasterUserUpdater
      :defaultsObj="userDetails"
      :actionType="actionType"
      triggerId="triggerUpdate"
      @emitDataUpdate="updateUserData"
      btnClasses="editBtn"
      triggerIcon="edit-feather"
      title="Update user details"
    />
    <div v-if="userDetails.id" class="user_container">
      <div class="name-title">
        <h2>Hi There!</h2>
        <h1>I'm Mr. {{ userDetails.fullName }}</h1>
        <h3>A {{ userDetails.designation }}</h3>
      </div>
      <div class="experience-details">
        {{ userDetails.description }}
      </div>
    </div>
    <div v-else>No data exists! Please add.</div>
  </div>
</template>
<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { IsValidObject } from '@/utils/globals'
import MasterUserUpdater from '@/components/Personal/MasterUserUpdater.vue'

const store = useStore()
const actionType = ref('')

const userDetails = computed(() => store.getters['user/userDetails'])

watchEffect(() => {
  if (!IsValidObject(userDetails.value)) {
    actionType.value = 'add'
    store.dispatch('user/fetchUserDetails')
  } else {
    actionType.value = 'update'
  }
})

const updateUserData = (userData, type) => {
  const updatedObj = {
    id: userData.id,
    description: userData.description,
    fullName: userData.fullName,
    designation: userData.designation,
    selectedGender: userData.selectedGender,
    birthDate: userData.birthDate
  }

  store.dispatch('user/updateUserData', updatedObj)
}
</script>
