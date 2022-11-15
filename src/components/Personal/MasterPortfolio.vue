<style lang="scss">
.master-container {
  padding: 1rem;

  .name-title {
    * {
      text-shadow: boxShadow(text);
    }

    h2 {
      font-size: 4rem;

      &:first-child {
        align-self: flex-start;
      }

      &:last-child {
        font-size: 3rem;
        align-self: flex-end;
      }
    }
  }

  .experience-details {
  }
}
</style>
<template lang="html">
  <div class="master-container">
    <div class="name-title">
      <h2>Hi There! I'm Mr. {{ userDetails.fullName }}</h2>
      <h2>A {{ userDetails.designation }}</h2>
    </div>
    <div class="experience-details">
      More than 8 years of experience in software development. Created real-time
      web applications, complex back-end management systems including content
      management, e-commerce. The projects based on Node and React JS in
      conjunction with various other web development technologies. JavaScript
      (generic JavaScript, jQuery, AJAX, React JS, Vue JS, D3 JS), HTML, CSS,
      Java (HIBERNATE and Spring MVC), Node JS (Express JS), SQL (Oracle DB,
      MySQL, DB2) are used. Designed layouts and templates for various small
      companies and individuals.
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()
const userDetails = store.getters['user/userDetails']
</script>
