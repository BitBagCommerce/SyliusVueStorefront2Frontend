import { VSF_LOCALE_COOKIE } from '@vue-storefront/core';

export default {
  currency: 'USD',
  country: 'US',
  countries: [
    { name: 'US', label: 'United States', states: ['California', 'Nevada'] },
    { name: 'AT', label: 'Austria' },
    { name: 'DE', label: 'Germany' },
    { name: 'NL', label: 'Netherlands' },
  ],
  currencies: [
    { name: 'EUR', label: 'Euro' },
    { name: 'USD', label: 'Dollar' },
  ],
  locales: [
    { code: 'en', label: 'English', file: 'en.js', iso: 'en', sylius: 'en_US' },
    { code: 'de', label: 'German', file: 'de.js', iso: 'de', sylius: 'de_DE' },
  ],
  defaultLocale: 'en',
  lazy: true,
  seo: true,
  langDir: 'lang/',
  vueI18n: {
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    numberFormats: {
      en: {
        currency: {
          style: 'currency',
          currency: 'USD',
          currencyDisplay: 'symbol',
        },
      },
      de: {
        currency: {
          style: 'currency',
          currency: 'EUR',
          currencyDisplay: 'symbol',
        },
      },
    },
  },
  detectBrowserLanguage: {
    cookieKey: VSF_LOCALE_COOKIE,
  },
};
