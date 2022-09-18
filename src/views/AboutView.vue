<style lang="scss" scoped>
.dashboard.about {
  height: 90vh;
  width: 100vw;
  background-color: var(--dark);
  color: var(--white);
  margin-bottom: 0rem;
  margin-top: 4rem;
  .about-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;

    .name-title {
      display: flex;
      flex-direction: column;

      h2:first-child {
        font-size: 4rem;
        align-self: flex-start;
      }

      h1 {
        font-size: 5rem;
        padding: 1rem;
        border-radius: 1rem;
        border: 0.625rem solid var(--white);
      }

      h2:last-child {
        align-self: flex-end;
      }
    }

    .profile-pic {
      height: 80%;
      width: auto;
    }
  }
}
</style>
<template lang="html">
  <div class="dashboard about pt-3">
    <div class="about-container">
      <div class="name-title">
        <h2>Hello..., I'm</h2>
        <h1>Mr. {{ myName }}</h1>
        <h2>Working as a Web Developer</h2>
      </div>
      <MasterIcon size="500" svgName="man-vish" classes="profile-pic" />
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import MasterIcon from '@/components/MasterUtils/MasterIcon'
const store = useStore()
const myName = store.getters['user/fullName']
</script>
