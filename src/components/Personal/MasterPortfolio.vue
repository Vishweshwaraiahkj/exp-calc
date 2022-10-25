<style lang="scss">
.master-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

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
      border-radius: 2rem;
      border: px2rem(10) solid var(--dark);
    }

    h2:last-child {
      align-self: flex-end;
    }
  }
}
</style>
<template lang="html">
  <div class="master-container">
    <div class="name-title">
      <h2>Hello..., I'm</h2>
      <h1>Mr. {{ userDetails.fullName }}</h1>
      <h2>Working as a {{ userDetails.designation }}</h2>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()
const userDetails = store.getters['user/userDetails']
</script>
