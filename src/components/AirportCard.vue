<template>
  <div class="airport card">
    <p>{{ airport.abbreviation }}</p>
    <p>{{ airport.name }}</p>
    <p>{{ airport.city }}, {{ airport.state }}</p>
  </div>
</template>

<script>
export default {
  props: {
    airport: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.airport {
  margin-bottom: 1rem;
  height: 100%;

  p {
    &:first-child {
      font-weight: bold;
      font-size: 2.5rem;
      margin: 1rem 0;
    }

    &:last-child {
      font-style: italic;
      font-size: 0.8rem;
    }
  }
}
</style>
