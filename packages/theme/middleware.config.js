module.exports = {
  integrations: {
    sylius: {
      location: '@vue-storefront/sylius-api/server',
      configuration: {
        api: 'http://localhost:8000/api/v2/graphql',
        locale: 'en_US',
        cookies: {
          currencyCookieName: 'vsf-currency',
          countryCookieName: 'vsf-country',
          localeCookieName: 'vsf-locale',
          cartCookieName: 'vsf-cart',
          customerCookieName: 'vsf-customer',
          customerRefreshCookieName: 'vsf-customer-token',
          customerIdCookieName: 'vsf-customer-id',
          storeCookieName: 'vsf-store'
        },
        imagePaths: {
          thumbnail: 'http://localhost:8000/media/cache/sylius_shop_product_thumbnail',
          regular: 'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail'
        },
        customHeaders: {}
      }
    }
  }
};
