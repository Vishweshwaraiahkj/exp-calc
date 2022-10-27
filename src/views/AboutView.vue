<style lang="scss">
.dashboard.about {
  height: 90vh;
  width: 100vw;
  background-color: var(--bg-color);
  color: var(--item-color);
  margin-bottom: 0rem;
  margin-top: 4rem;
  .about-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;

    .profile-pic {
      height: 80%;
      width: auto;

      @include hoverTransform(1.2);
    }
  }
}
</style>
<template lang="html">
  <div class="dashboard about pt-3">
    <div class="about-container">
      <MasterPortfolio />
      <MasterIcon
        size="500"
        svgName="man-vish"
        class="profile-pic"
        fillColor="var(--bg-color)"
      />
    </div>
  </div>
</template>
<script setup>
import MasterIcon from '@/components/MasterUtils/MasterIcon'
import MasterPortfolio from '@/components/Personal/MasterPortfolio'
</script>
