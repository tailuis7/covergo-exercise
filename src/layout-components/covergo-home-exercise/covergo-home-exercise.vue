<template>
  <div class="covergo-home-exercise">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CoverGoHomeExercise'
}
</script>

<style lang="scss" scoped>
.covergo-home-exercise {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  margin: 60px 25%;
  padding: 45px;
  background-color: #cecece24;
}

@media screen and (max-width: 767.98px) {
  .covergo-home-exercise {
    margin: 60px 10%;
  }
}

@media screen and (max-width: 575.98px) {
  .covergo-home-exercise {
    padding: 15px;
  }
}
</style>