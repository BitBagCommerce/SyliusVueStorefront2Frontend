import webpack from 'webpack';
import theme from './themeConfig';
import i18n from './i18nConfig';

export default {
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },
  publicRuntimeConfig: {
    theme,
    middlewareUrl: process.env.NODE_ENV === 'production'
      ? 'https://localhost:3000/api/' // Your production URL
      : 'http://localhost:3000/api/'
  },
  head: {
    title: 'Vue Storefront',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin'
      },
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        as: 'style'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        media: 'print',
        onload: 'this.media=\'all\'',
        once: true
      }
    ]
  },
  loading: { color: '#fff' },
  buildModules: [
    // to core
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    ['@vue-storefront/nuxt', {
      // @core-development-only-start
      coreDevelopment: true,
      // @core-development-only-end
      useRawSource: {
        dev: [
          '@vue-storefront/sylius',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/sylius',
          '@vue-storefront/core'
        ]
      }
    }],
    // @core-development-only-start
    ['@vue-storefront/nuxt-theme', {
      generate: {
        replace: {
          apiClient: '@vue-storefront/sylius-api',
          composables: '@vue-storefront/sylius'
        }
      }
    }],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/sylius/nuxt', {}]
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt'
  ],
  i18n: i18n,
  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] }), './assets/styles.scss']
  },
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },
    transpile: [
      'vee-validate/dist/rules',
      '@glidejs'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ],
    extend (config, ctx) {
      if (ctx && ctx.isClient) {
        config.optimization = {
          ...config.optimization,
          mergeDuplicateChunks: true,
          splitChunks: {
            ...config.optimization.splitChunks,
            chunks: 'all',
            automaticNameDelimiter: '.',
            maxSize: 128_000,
            maxInitialRequests: Number.POSITIVE_INFINITY,
            minSize: 0,
            maxAsyncRequests: 10,
            cacheGroups: {
              vendor: {
                test: /[/\\]node_modules[/\\]/,
                name: (module) => `${module
                  .context
                  .match(/[/\\]node_modules[/\\](.*?)([/\\]|$)/)[1]
                  .replace(/[.@_]/gm, '')}`
              }
            }
          }
        };
      }
    }
  },
  router: {
    middleware: ['checkout', 'refresh-auth'],
    scrollBehavior (_to, _from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    extendRoutes(routes, resolve) {
      return [
        {
          name: 'connection-error',
          path: '/connection-error',
          component: resolve(__dirname, 'pages/ConnectionError.vue'),
          chunkName: 'pages/connection-error'
        }
      ];
    }
  }

};
