<template>
  <transition-group name="bounce">
    <greeting-client
      v-show="isGreetingClientActive"
      key="client-greeting"

      @on-click-start="onClickStart"
    />

    <client-info-form
      v-show="isClientInfoFormActive"
      key="client-info-form"
      v-model="clientInfo"

      :country-options="countryOptions"
      :package-options="packageOptions"
      :calculated-premium-by-age-and-country="calculatedPremiumByAgeAndCountry"
      :total-premium-amount-by-selected-package="totalPremiumAmountBySelectedPackage"

      @on-click-next="onClickNext"
      @on-click-back="onClickBack"
    />

    <client-info-summary
      v-show="isClientInfoSummaryActive"
      key="client-info-summary"

      :value="clientInfoFormatted"

      @on-click-buy="setInitialData"
      @on-click-back="onClickBack"
    />

    <page-error
      v-show="isPageErrorActive"
      key="page-error"

      :is-age-invalid="isAgeInvalid"
      :is-name-invalid="isNameInvalid"

      @on-click-ok="onClickOkPageError"
    />
  </transition-group>
</template>

<script>
// Utils
import {
  COUNTRY_CONFIG,
  PACKAGE_CONFIG,
  FORM_WIZARD_STEP_ID,
} from './constant/index.js'
import {
  formatAmount,
  getCountryConfigByCountryId,
  calculateChargedExtraByPackage,
  calculatePremiumByAgeAndCountry,
} from './utils/index.js'
const _formWizardSteps = {
  [FORM_WIZARD_STEP_ID.CLIENT_GREETING]: FORM_WIZARD_STEP_ID.CLIENT_GREETING,
  [FORM_WIZARD_STEP_ID.CLIENT_INFO_FORM]: FORM_WIZARD_STEP_ID.CLIENT_INFO_FORM,
  [FORM_WIZARD_STEP_ID.CLIENT_SUMMARY]: FORM_WIZARD_STEP_ID.CLIENT_SUMMARY,
  [FORM_WIZARD_STEP_ID.PAGE_ERROR]: FORM_WIZARD_STEP_ID.PAGE_ERROR,
}

// Components
import PageError from '@/modules/client-form-wizard/components/page-error/page-error.vue'
import GreetingClient from '@/modules/client-form-wizard/components/greeting-client/greeting-client.vue'
import ClientInfoForm from '@/modules/client-form-wizard/components/client-info-form/client-info-form.vue'
import ClientInfoSummary from '@/modules/client-form-wizard/components/client-info-summary/client-info-summary.vue'

export default {
  components: {
    PageError,
    GreetingClient,
    ClientInfoForm,
    ClientInfoSummary,
  },

  data() {
    return {
      activeStep: this.getInitStep(),
      clientInfo: {
        name: '',
        age: null,
        country: null,
        package: null,
      },
    }
  },

  computed: {
    currentStepIndex() {
      return Object.keys(_formWizardSteps).findIndex(
        stepKey => _formWizardSteps[stepKey] === this.activeStep
      )
    },

    countryOptions() {
      return [{
        id: COUNTRY_CONFIG.HONG_KONG.ID,
        name: COUNTRY_CONFIG.HONG_KONG.NAME,
      }, {
        id: COUNTRY_CONFIG.USA.ID,
        name: COUNTRY_CONFIG.USA.NAME,
      }, {
        id: COUNTRY_CONFIG.AUSTRALIA.ID,
        name: COUNTRY_CONFIG.AUSTRALIA.NAME,
      }]
    },
    packageOptions() {
      return [{
        id: PACKAGE_CONFIG.STANDARD.ID,
        name: PACKAGE_CONFIG.STANDARD.NAME,
      }, {
        id: PACKAGE_CONFIG.SAFE.ID,
        name: PACKAGE_CONFIG.SAFE.NAME,
      }, {
        id: PACKAGE_CONFIG.SUPER_SAFE.ID,
        name: PACKAGE_CONFIG.SUPER_SAFE.NAME,
      }]
    },

    isGreetingClientActive() {
      return this.activeStep === FORM_WIZARD_STEP_ID.CLIENT_GREETING
    },
    isClientInfoFormActive() {
      return this.activeStep === FORM_WIZARD_STEP_ID.CLIENT_INFO_FORM
    },
    isClientInfoSummaryActive() {
      return this.activeStep === FORM_WIZARD_STEP_ID.CLIENT_SUMMARY
    },
    isPageErrorActive() {
      return this.activeStep === FORM_WIZARD_STEP_ID.PAGE_ERROR
    },

    isAgeInvalid() {
      return this.clientInfo?.age > 100 || this.clientInfo?.age <= 0
    },
    isNameInvalid() {
      return !this.clientInfo?.name?.length
    },

    clientInfoFormatted() {
      return {
        ...this.clientInfo,
        country: this.countryOptions.find(option => option.id == this.clientInfo?.country)?.name,
        package: this.packageOptions.find(option => option.id == this.clientInfo?.package)?.name,
        totalPremium: `${formatAmount(this.totalPremiumAmountBySelectedPackage)}${getCountryConfigByCountryId(this.clientInfo?.country)?.CURRENCY}`
      }
    },
    calculatedPremiumByAgeAndCountry() {
      return calculatePremiumByAgeAndCountry(Number(this.clientInfo?.age), this.clientInfo?.country)
    },
    totalPremiumAmountBySelectedPackage() {
      return this.calculatedPremiumByAgeAndCountry + calculateChargedExtraByPackage(this.clientInfo?.package, this.calculatedPremiumByAgeAndCountry)
    },
  },

  created() {
    this.setInitClientInfo()
  },

  methods: {
    getInitStep() {
      return _formWizardSteps[FORM_WIZARD_STEP_ID.CLIENT_GREETING]
    },

    setInitClientInfo() {
      this.clientInfo = {
        name: '',
        age: null,
        package: PACKAGE_CONFIG.STANDARD.ID,
        country: COUNTRY_CONFIG.HONG_KONG.ID,
      }
    },
    setInitialData() {
      this.activeStep = this.getInitStep()
      this.setInitClientInfo()
    },

    onClickStart() {
      this.activeStep = _formWizardSteps[FORM_WIZARD_STEP_ID.CLIENT_INFO_FORM]
    },
    onClickNext() {
      if (this.isAgeInvalid || this.isNameInvalid) {
        this.activeStep = _formWizardSteps[FORM_WIZARD_STEP_ID.PAGE_ERROR]
        return
      }

      this.activeStep = _formWizardSteps[FORM_WIZARD_STEP_ID.CLIENT_SUMMARY]
    },
    onClickBack() {
      if (this.currentStepIndex === -1) {
        return
      }

      const nextActiveStepKey = Object.keys(_formWizardSteps).find(
        (stepKey, stepIndex) => stepIndex === this.currentStepIndex - 1
      )
      this.activeStep = _formWizardSteps[nextActiveStepKey]
    },
    
    onClickOkPageError() {
      this.setInitialData()
    },
  },
}
</script>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  transition: opacity 0s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>