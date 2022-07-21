<template>
  <div class="greeting-client">
    <h2 class="greeting-client__header">Hello There!</h2>
    <p class="greeting-client__content">Let's buy some insurance. It is going to take only a few steps.</p>
    <covergo-button
      class="greeting-client__start-action"
      variant="black"
      @click.native="$emit('on-click-start')"
    >Start</covergo-button>
  </div>
</template>

<script>
// Components
import CovergoButton from '@BaseComponents/covergo-button/covergo-button.vue'

export default {
  components: {
    CovergoButton,
  },
}
</script>

<style lang="scss" scoped>
.greeting-client {
  text-align: center;

  .greeting-client__header {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .greeting-client__content {
    margin-bottom: 15px;
  }

  .greeting-client__start-action {
    min-width: 150px;
  }
}

@media screen and (max-width: 767.98px) {
  .greeting-client {
    .greeting-client__start-action {
      min-width: 100px;
    }
  }
}
</style>