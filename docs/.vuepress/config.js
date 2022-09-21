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
  plugins: [
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/plugin-medium-zoom',
      {
        // This selector excludes images from the "Integrations" page
        selector: 'main :not(.tile-image) > img'
      }
    ],
    '@vuepress/active-header-links',
    '@vuepress/search'
  ],
  themeConfig: {
    repo: 'https://github.com/vuestorefront-community/sylius/',
    editLinks: true,
    docsDir: 'docs',
    docsBranch: 'develop',
    editLinkText: 'Edit this page',
    logo: 'https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png',
    nav: [
      { text: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      { text: 'Core Documentation', link: 'https://docs.vuestorefront.io/v2/' },
      // { text: 'Demo', link: 'https://demo-magento2.europe-west1.gcp.storefrontcloud.io/' },
      { text: 'GitHub', link: 'https://github.com/vuestorefront-community/sylius'},
    ],
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          ['/', 'Introduction'],
          ['/guide/sylius', 'Sylius Plugin'],
          ['/guide/getting-started', 'Vue Storefront'],
        ]
      },
      {
        title: 'Composables',
        collapsable: false,
        children: [
          ['/guide/composables/sylius', 'Types']
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
