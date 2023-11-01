<style lang="scss">
.master-container {
  padding: 1rem;

  .flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .hire_btn {
      margin: 1rem 0;
    }
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
  .job_to,
  .job_skills {
    text-align: left;
    padding: px2rem(5);
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

  .simple-badge {
    background-color: green;
    padding: px2rem(5);
    border-radius: var(--radius-default);
    color: var(--bg-color);
  }

  span.jobcount-badge {
    padding: 0.625rem;
    background: black;
    color: white;
    border-radius: 0.625rem;
    font-family: fantasy;
    font-size: 2rem;
    width: 4rem;
    display: block;
    text-align: center;
    height: 4rem;
    position: absolute;
    top: 0;
    right: 0;
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
          <MasterButton
            class='hire_btn'
            :onClick='hireMe'
            variant='success'
            width='8rem'
            size='medium'
          >
            Hire Me!
          </MasterButton>
          <div v-for="item in commonSkills" :key='item'>
            <span class="simple-badge">{{ item }}</span>
          </div>
        </div>
        <MasterIcon
          size="350"
          svgName="technologist"
          class="profile-pic floating-dev"
          fillColor="var(--item-color)"
        />
      </div>
      <MasterPrintBreak />
      <h2 v-if="workHistory.length" class="mt-2">Work History</h2>
      <div class="grid-container grids_4 job_card mt-2">
        <div
          v-for="(item, idx) in workHistory"
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
            <div class="job_desc">
              <span class="simple-badge">Summary</span>
              {{ item.jobDesc }}
            </div>
            <div class="job_from">
              <span class="strong">
                <span class="simple-badge">From</span>
                </span> {{ item.jobFrom }}
            </div>
            <div class="job_to">
              <span class="strong">
                <span class="simple-badge">To</span>
              </span> {{ item.jobTo }}
            </div>
          </div>
          <div class='job_skills'>
            <span class="simple-badge">Skills</span>
            {{ item.jobSkills }}
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
          <span class='jobcount-badge'>
            {{ String(idx+1).padStart(2, '0') }}
          </span>
        </div>
      </div>
    </div>
    <div v-else>No data exists! Please add.</div>
  </div>
</template>
<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useStore } from 'vuex'
import { IsValidObject, openLink, CustomSort } from '@/utils/globals'
import MasterUserModal from '@/components/Personal/MasterUserModal.vue'
import WorkHistoryModal from '@/components/Personal/WorkHistoryModal.vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterPrintBreak from '@/components/MasterUtils/MasterPrintBreak.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import MasterButton from '@/components/MasterInputs/MasterButton.vue'

const store = useStore()
const actionType = ref('')

const userDetails = computed(() => store.getters['user/userDetails'])

watchEffect(() => {
  if (!IsValidObject(userDetails.value)) {
    actionType.value = 'add'
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

const workHistory = computed(() => {
  const workData = userDetails.value.workHistory
  return CustomSort(workData, 'jobFrom', 'asc')
})

const commonSkills = computed(() => {
  let skillsList = []
  workHistory.value.forEach((item, idx) => {
    const itemList = item.jobSkills?.split(',')
    skillsList = [...skillsList, ...itemList]
  })
  return [...new Set(skillsList)]
})

onMounted(() => {
  if (!userDetails.value.length) {
    store.dispatch('user/fetchUserDetails')
  }
})

const hireMe = () => {
  alert('Call me on: +917353333573')
}
</script>
