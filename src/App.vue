<template>
  <div id="app">
    <covergo-layout-exercise>
      <client-form-wizard />
    </covergo-layout-exercise>
  </div>
</template>

<script>
// Components
import ClientFormWizard from '@Modules/client-form-wizard/client-form-wizard.vue'
import CovergoLayoutExercise from '@LayoutComponents/covergo-home-exercise/covergo-home-exercise.vue'

export default {
  name: 'App',

  components: {
    ClientFormWizard,
    CovergoLayoutExercise,
  },
}
</script>

<style lang="scss">
@import './reset.scss';
@import './normalize.scss';
</style>