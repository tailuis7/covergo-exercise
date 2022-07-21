import {
  PACKAGE_CONFIG,
  COUNTRY_CONFIG,
} from '../constant/index.js'

export const calculateChargedExtraByPackageSafe = (totalPremiumNumber = 0) => {
  if (typeof totalPremiumNumber !== 'number') return
  return totalPremiumNumber * PACKAGE_CONFIG.SAFE.CHARGED_EXTRA_PERCENTAGE / 100
}

export const calculateChargedExtraByPackageSuperSafe = (totalPremiumNumber = 0) => {
  if (typeof totalPremiumNumber !== 'number') return
  return totalPremiumNumber * PACKAGE_CONFIG.SUPER_SAFE.CHARGED_EXTRA_PERCENTAGE / 100
}

export const calculateChargedExtraByPackage = (packageId, totalPremiumNumber = 0) => {
  const chargedExtraCalculationDictionary = {
    [PACKAGE_CONFIG.SAFE.ID]: calculateChargedExtraByPackageSafe(totalPremiumNumber),
    [PACKAGE_CONFIG.SUPER_SAFE.ID]: calculateChargedExtraByPackageSuperSafe(totalPremiumNumber)
  }

  return chargedExtraCalculationDictionary[packageId] || 0
}

export const calculatePremiumByAgeAndCountry = (age = 0, country) => {
  if (typeof age !== 'number') return

  const countryRate = getCountryConfigByCountryId(country)?.RATE || 1
  return 10 * age * countryRate
}

export const formatAmount = (amountNumber = 0) => {
  return new Intl.NumberFormat('en-US').format(amountNumber)
}

export const getCountryConfigByCountryId = (contryId) => {
  const selectedCountryConfigKey = Object.keys(COUNTRY_CONFIG).find(
    countryKey => COUNTRY_CONFIG[countryKey]?.ID === contryId
  )

  return COUNTRY_CONFIG[selectedCountryConfigKey]
}