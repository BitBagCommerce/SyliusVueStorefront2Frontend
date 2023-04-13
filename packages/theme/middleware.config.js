module.exports = {
  integrations: {
    sylius: {
      location: '@vue-storefront/sylius-api/server',
      configuration: {
        api: process.env.SYLIUS_API_ENDPOINT,
        locale: process.env.SYLIUS_DEFAULT_LOCALE,
        imagePaths: {
          thumbnail: process.env.SYLIUS_THUMBNAIL_ENDPOINT,
          regular: process.env.SYLIUS_REGULAR_IMAGE_ENDPOINT
        },
        customHeaders: {}
      }
    }
  }
};

