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
      border: 2rem solid var(--light);
      border-radius: 2rem;
    }
  }
}
</style>
<template>
  <div class="dashboard about pt-3">
    <div class="about-container">
      <div class="name-title">
        <h2>Hello, I'm</h2>
        <h1>{{ myName }}</h1>
        <h2>Working as a Web Developer</h2>
      </div>
      <img src="@/assets/vish.jpeg" class="profile-pic" />
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()
const myName = store.getters['user/fullName']
</script>
