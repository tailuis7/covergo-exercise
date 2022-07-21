<template>
  <div class="client-info-form">
    <h2 class="client-info-form__header">Tell us about yourself</h2>

    <div class="client-info-form__client-config client-config">
      <covergo-input
        class="client-config__item"
        type="text"
        labelText="Name"
        placeholder="Add text"
        v-model="localValue.name"
      />

      <covergo-input
        class="client-config__item"
        type="number"
        labelText="Age"
        placeholder="Add number"
        v-model.number="localValue.age"
      />

      <covergo-select
        v-model.number="localValue.country"
        class="client-config__item"
        placeholder="Add text"
        labelText="Where do you live?"
        :options="countryOptions"
      />

      <div
        class="client-config__item package"
      >
        <covergo-radio
          v-for="packageOption in packageOptionsMerged"
          :key="packageOption.id"
          :id="packageOption.id"
          :value="packageOption.id"
          :labelText="`${packageOption.name} ${packageOption.chargedExtraInfo}`"
          v-model.number="localValue.package"
          name="package"
          class="package__option"
        />
      </div>
    </div>

    <h3 class="client-info-form__premium">Your premium is: {{ formatAmount(totalPremiumAmountBySelectedPackage) }}{{ currencyBySelectedCountry }}</h3>

    <div class="client-info-form__actions actions">
      <covergo-button variant="white" @click.native="$emit('on-click-back')">Back</covergo-button>
      <covergo-button variant="black" @click.native="$emit('on-click-next')">Next</covergo-button>
    </div>
  </div>
</template>

<script>
// Utils
import {
  PACKAGE_CONFIG,
} from '../../constant/index.js'
import {
  formatAmount,
  getCountryConfigByCountryId,
  calculateChargedExtraByPackage,
} from '../../utils/index.js'
const _clientInfoValidator = (clientInfo = {}) => (
  Object.prototype.hasOwnProperty.call(clientInfo, 'name') &&
  Object.prototype.hasOwnProperty.call(clientInfo, 'age') &&
  Object.prototype.hasOwnProperty.call(clientInfo, 'country') &&
  Object.prototype.hasOwnProperty.call(clientInfo, 'package')
)
const _countryOptionValidator = (countryOption = {}) => (
  Object.prototype.hasOwnProperty.call(countryOption, 'id') &&
  Object.prototype.hasOwnProperty.call(countryOption, 'name')
)
const _packageOptionValidator = (packageOption = {}) => (
  Object.prototype.hasOwnProperty.call(packageOption, 'id') &&
  Object.prototype.hasOwnProperty.call(packageOption, 'name')
)

// Components
import CovergoInput from '@BaseComponents/covergo-input/covergo-input.vue'
import CovergoRadio from '@BaseComponents/covergo-radio/covergo-radio.vue'
import CovergoButton from '@BaseComponents/covergo-button/covergo-button.vue'
import CovergoSelect from '@BaseComponents/covergo-select/covergo-select.vue'

export default {
  components: {
    CovergoInput,
    CovergoRadio,
    CovergoButton,
    CovergoSelect,
  },

  props: {
    value: {
      type: Object,
      required: true,
      validator: _clientInfoValidator
    },
    countryOptions: {
      type: Array,
      required: true,
      validator: propValue => propValue?.length === 0 || propValue.every(option => _countryOptionValidator(option))
    },
    packageOptions: {
      type: Array,
      required: true,
      validator: propValue => propValue?.length === 0 || propValue.every(option => _packageOptionValidator(option))
    },
    calculatedPremiumByAgeAndCountry: {
      type: Number,
      required: true,
    },
    totalPremiumAmountBySelectedPackage: {
      type: Number,
      required: true,
    },
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },

    packageOptionsMerged() {
      return this.packageOptions.map(option => {
        if (option?.id === PACKAGE_CONFIG.SAFE.ID) {
          return {
            ...option,
            chargedExtraInfo: this.safePackageChargedExtra,
          }
        }

        if (option?.id === PACKAGE_CONFIG.SUPER_SAFE.ID) {
          return {
            ...option,
            chargedExtraInfo: this.superSafePackageChargedExtra,
          }
        }

        return {
            ...option,
            chargedExtraInfo: '',
          }
      })
    },

    currencyBySelectedCountry() {
      return getCountryConfigByCountryId(this.localValue?.country)?.CURRENCY
    },

    
    safePackageChargedExtra() {
      const packageChargedExtraPercentage = `${PACKAGE_CONFIG.SAFE.CHARGED_EXTRA_PERCENTAGE}`
      const packageChargedExtraAmount = `${calculateChargedExtraByPackage(PACKAGE_CONFIG.SAFE.ID, this.calculatedPremiumByAgeAndCountry)}`

      return this.formatChargedExtra({
        currency: this.currencyBySelectedCountry,
        chargedExtraAmount: packageChargedExtraAmount,
        chargedExtraPercentage: packageChargedExtraPercentage,
      })
    },
    superSafePackageChargedExtra() {
      const packageChargedExtraPercentage = `${PACKAGE_CONFIG.SUPER_SAFE.CHARGED_EXTRA_PERCENTAGE}`
      const packageChargedExtraAmount = `${calculateChargedExtraByPackage(PACKAGE_CONFIG.SUPER_SAFE.ID, this.calculatedPremiumByAgeAndCountry)}`

      return this.formatChargedExtra({
        currency: this.currencyBySelectedCountry,
        chargedExtraAmount: packageChargedExtraAmount,
        chargedExtraPercentage: packageChargedExtraPercentage,
      })
    },
  },

  methods: {
    formatAmount,

    formatChargedExtra({
      currency = '',
      chargedExtraAmount = 0,
      chargedExtraPercentage = 0,
    }) {
      if (chargedExtraAmount == 0) return ''
      return `( ${chargedExtraAmount >= 0 ? '+' : ''}${this.formatAmount(chargedExtraAmount)}${currency}, ${chargedExtraPercentage}%)`
    },
  }
}
</script>

<style lang="scss" scoped>
.client-info-form {
  display: flex;
  align-items: center;
  flex-direction: column;
  
  .client-info-form__header {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .client-config {
    margin-bottom: 30px;
    min-width: 250px;

    .client-config__item {
      display: flex;

      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }

    .package {
      flex-direction: column;

      .package__option:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }

  .client-info-form__premium {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .client-info-form__actions {
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
  .client-info-form {
    .client-config {
      min-width: auto;
    }

    .client-info-form__actions {
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
