module.exports = {
  client: {
    service: {
      name: 'vue-storefront',
      url: process.env.SYLIUS_API_ENDPOINT || 'http://localhost:8000/api/v2/graphql'
    },
    tagName: 'gql',
    includes: ['./packages/api-client/**/*.ts']
  }
};
