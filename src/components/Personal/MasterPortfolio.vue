<style lang="scss">
.master-container {
  padding: 1rem;

  .flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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

  .social_link {
    cursor: pointer;
  }

  h4.job_title,
  h5.job_company,
  .job_desc,
  .job_from,
  .job_to {
    text-align: left;
    padding: px2rem(5);
    background: var(--light-gray);
    border-radius: var(--radius-default);
    margin: px2rem(5);
  }

  h4.job_title,
  h5.job_company {
    @include textEllipsis(1, 1.4);
  }

  .job_actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
<template lang="html">
  <div class="master-container">
    <MasterUserModal
      :defaultsObj="userDetails"
      :actionType="actionType"
      @emitDataUpdate="updateUserData"
      btnClasses="edit_item"
      triggerIcon="edit-feather"
      title="Update user details"
    />
    <WorkHistoryModal
      actionType="add"
      @emitDataUpdate="updateWork"
      btnClasses="jobs_add"
      triggerIcon="desktop"
      title="Add work details"
    />
    <div v-if="userDetails.id" class="user_container">
      <div class="flex-center mb-2">
        <MasterIcon
          class="fb_link social_link"
          svgName="fb-round"
          size="2rem"
          fillColor="var(--item-color)"
          @click="openLink(userDetails.fbLink)"
        />
        <MasterIcon
          class="lkdin_link social_link"
          svgName="lkdin-round"
          size="2rem"
          fillColor="var(--item-color)"
          @click="openLink(userDetails.lkdInLink)"
        />
        <MasterIcon
          class="insta_link social_link"
          svgName="insta-round"
          size="2rem"
          fillColor="var(--item-color)"
          @click="openLink(userDetails.instaLink)"
        />
        <MasterIcon
          class="tweet_link social_link"
          svgName="tweet-round"
          size="2rem"
          fillColor="var(--item-color)"
          @click="openLink(userDetails.tweetLink)"
        />
      </div>
      <div class="flex-container">
        <div class="name-title">
          <h2>Hi There!</h2>
          <h1>I'm Mr. {{ userDetails.fullName }}</h1>
          <h3>A {{ userDetails.designation }}</h3>
          <div class="experience-details">
            {{ userDetails.description }}
          </div>
        </div>
        <MasterIcon
          size="350"
          svgName="developer"
          class="profile-pic floating-dev"
          fillColor="var(--bg-color)"
        />
      </div>
      <MasterPrintBreak />
      <h2 v-if="userDetails.workHistory.length" class="mt-2">Work History</h2>
      <div class="grid-container grids_4 job_card mt-2">
        <div
          v-for="item in userDetails.workHistory"
          :key="item.id"
          class="grid-item"
        >
          <h4 class="job_title">
            <MasterIcon
              size="small"
              svgName="professional"
              fillColor="var(--item-color)"
            />
            {{ item.jobTitle }}
          </h4>
          <h5 class="job_company">
            <MasterIcon
              size="small"
              svgName="company"
              fillColor="var(--item-color)"
            />
            {{ item.jobCompany }}
          </h5>
          <div class="job_details">
            <div class="job_desc">{{ item.jobDesc }}</div>
            <div class="job_from">
              <span class="strong">From</span> {{ item.jobFrom }}
            </div>
            <div class="job_to">
              <span class="strong">To</span> {{ item.jobTo }}
            </div>
          </div>
          <div class="job_actions actions">
            <WorkHistoryModal
              :defaultsObj="item"
              actionType="update"
              @emitDataUpdate="updateWork"
              btnClasses="update_item"
              triggerIcon="edit"
              triggerIconSize="x-small"
              title="Add work details"
            />
            <DeleteModal
              :currentItem="item"
              title="Delete this job"
              desc="Do you want to proceed with deleting this job details?"
              deleteType="jobs"
              triggerIconSize="x-small"
              fillColor="var(--item-color)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>No data exists! Please add.</div>
  </div>
</template>
<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { IsValidObject } from '@/utils/globals'
import MasterUserModal from '@/components/Personal/MasterUserModal.vue'
import WorkHistoryModal from '@/components/Personal/WorkHistoryModal.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterPrintBreak from '@/components/MasterUtils/MasterPrintBreak.vue'
import DeleteModal from '@/components/DeleteModal.vue'

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
  store.dispatch('user/updateUserData', { userData, type })
}

const updateWork = (workData, type) => {
  store.dispatch('user/updateWorkData', { workData, type })
}

const openLink = (link) => {
  window.open(link, '_blank')
}
</script>
