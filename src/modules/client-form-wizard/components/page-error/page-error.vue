<template>
  <div class="page-error">
    <h2 class="page-error__header">Ooops</h2>
    <p class="page-error__message" v-show="isNameInvalid">Your name is empty.</p>
    <p class="page-error__message" v-show="isAgeInvalid">Your age is over our accepted limit.</p>
    <p class="page-error__message">We are sorry but we cannot insure you now.</p>
    <covergo-button class="page-error__action" variant="black" @click.native="$emit('on-click-ok')">Ok :(</covergo-button>
  </div>
</template>

<script>
// Components
import CovergoButton from '@BaseComponents/covergo-button/covergo-button.vue'

export default {
  components: {
    CovergoButton,
  },

  props: {
    isNameInvalid: {
      type: Boolean,
      default: false,
    },
    isAgeInvalid: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.page-error {
  text-align: center;

  .page-error__header {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .page-error__message {
    margin-bottom: 10px;
  }

  .page-error__action {
    margin-top: 20px;
  }
}
</style>