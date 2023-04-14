module.exports = {
  title: 'Vue Storefront 2 for Sylius',
  base: '/',
  description: 'Documentation for the Sylius connector for Vue Storefront 2',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  configureWebpack: (config) => {
    config.module.rules = config.module.rules.map(rule => ({
      ...rule,
      use: rule.use && rule.use.map(useRule => ({
        ...useRule,
        options: useRule.loader === 'url-loader' ?
          /**
            Hack for loading images properly.
            ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
           */
          {  ...useRule.options, esModule: false } :
          useRule.options
      }))
    }))
  },
  themeConfig: {
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          ['/', 'Introduction'],
          ['/guide/essentials/getting-started', 'Getting Started'],
          ['/guide/essentials/general-concepts', 'General Concepts'],
          ['/guide/essentials/page-walkthrough', 'Page Walkthrough'],
        ]
      },
      {
        title: 'Composables',
        collapsable: false,
        children: [
          ['/guide/composables/useCart', 'useCart'],
          ['/guide/composables/useProduct', 'useProduct'],
          ['/guide/composables/useCategory', 'useCategory'],
          ['/guide/composables/useReview', 'useReview'],
          ['/guide/composables/useMakeOrder', 'useMakeOrder'],
          ['/guide/composables/useUser', 'useUser'],
          ['/guide/composables/useUserShipping', 'useUserShipping'],
        ]
      },
      {
        title: 'API Client',
        collapsable: false,
        children: [
          ['/guide/api-client/sylius-api', 'Types']
        ]
      }
    ]
  }
}
