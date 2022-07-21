<template>
  <div class="client-info-summary">
    <h2 class="client-info-summary__header">Summary</h2>

    <ul class="client-info-summary__client-info-details client-info-details">
      <li class="client-info-details__item">Name: {{ value.name }}</li>
      <li class="client-info-details__item">Age: {{ value.age }}</li>
      <li class="client-info-details__item">Where do you live: {{ value.country }}</li>
      <li class="client-info-details__item">Package: {{ value.package }}</li>
      <li class="client-info-details__item">Premium: {{ value.totalPremium }}</li>
    </ul>

    <div class="client-info-summary__actions actions">
      <covergo-button variant="white" @click.native="$emit('on-click-back')">Back</covergo-button>
      <covergo-button variant="black" @click.native="$emit('on-click-buy')">Buy</covergo-button>
    </div>
  </div>
</template>

<script>
// Utils
const _clientInfoValidator = (clientInfo = {}) => (
  Object.prototype.hasOwnProperty.call(clientInfo, 'name') &&
  Object.prototype.hasOwnProperty.call(clientInfo, 'age') &&
  Object.prototype.hasOwnProperty.call(clientInfo, 'country') &&
  Object.prototype.hasOwnProperty.call(clientInfo, 'package') &&
  Object.prototype.hasOwnProperty.call(clientInfo, 'totalPremium')
)

// Components
import CovergoButton from '@BaseComponents/covergo-button/covergo-button.vue'

export default {
  components: {
    CovergoButton,
  },

  props: {
    value: {
      type: Object,
      required: true,
      validator: _clientInfoValidator
    }
  },
}
</script>

<style lang="scss" scoped>
.client-info-summary {
  display: flex;
  align-items: center;
  flex-direction: column;
  
  .client-info-summary__header {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .client-info-details {
    margin-bottom: 30px;

    .client-info-details__item {
      display: flex;

      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }
  }



  .client-info-summary__actions {
    display: flex;
    justify-content: center;

    .covergo-button {
      min-width: 100px;
      margin-bottom: 15px;

      &:first-child {
        margin-right: 15px;
      }
    }
  }
}

@media screen and (max-width: 575.98px) {
  .client-info-summary {
    .client-info-summary__actions {
      flex-wrap: wrap;

      .covergo-button {
        width: 100%;
        
        &:first-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
