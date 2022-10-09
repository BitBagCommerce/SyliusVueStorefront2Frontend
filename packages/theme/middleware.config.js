module.exports = {
  integrations: {
    sylius: {
      location: '@vue-storefront/sylius-api/server',
      configuration: {
        api: 'http://sylius-graphql.local/api/v2/graphql',
        locale: 'en_US',
        imagePaths: {
          thumbnail: 'http://sylius-graphql.local/media/cache/sylius_shop_product_thumbnail',
          regular: 'http://sylius-graphql.local/media/cache/sylius_shop_product_large_thumbnail'
        },
        customHeaders: {}
      }
    }
  }
};
