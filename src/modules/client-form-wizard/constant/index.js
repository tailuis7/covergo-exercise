export const FORM_WIZARD_STEP_ID = {
  CLIENT_GREETING: 1,
  CLIENT_INFO_FORM: 2,
  CLIENT_SUMMARY: 3,
  PAGE_ERROR: 4,
}

export const COUNTRY_CONFIG = {
  HONG_KONG: {
    ID: 1,
    RATE: 1,
    CURRENCY: 'HKD',
    NAME: 'Hong Kong',
  },
  USA: {
    ID: 2,
    RATE: 2,
    CURRENCY: 'USD',
    NAME: 'USA',
  },
  AUSTRALIA: {
    ID: 3,
    RATE: 3,
    CURRENCY: 'AUD',
    NAME: 'Australia',
  },
}

export const PACKAGE_CONFIG = {
  STANDARD: {
    ID: 1,
    NAME: 'Standard',
    CHARGED_EXTRA_PERCENTAGE: 0,
  },
  SAFE: {
    ID: 2,
    NAME: 'Safe',
    CHARGED_EXTRA_PERCENTAGE: 50,
  },
  SUPER_SAFE: {
    ID: 3,
    NAME: 'Super Safe',
    CHARGED_EXTRA_PERCENTAGE: 75,
  },
}
