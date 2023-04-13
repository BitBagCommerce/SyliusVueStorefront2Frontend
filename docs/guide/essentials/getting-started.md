# Getting started

## Sylius plugin

This integration requires installation of [SyliusVueStoreFront2Plugin](https://github.com/BitBagCommerce/SyliusVueStorefront2Plugin) in your Sylius environment, installation guide can be found [here](https://github.com/BitBagCommerce/SyliusVueStorefront2Plugin/blob/main/doc/installation.md)

## Installation

1. Install dependencies with `yarn install`
2. Copy `packages/theme/.env.dist` file, and rename it to `packages/theme/.env`. This `.env` file should look like this:

```bash
# packages/theme/.env
PORT=3000 # nuxt app server port
MIDDLEWARE_URL=http://localhost:3000/api/ # middleware URL which all requests will go through

SYLIUS_API_ENDPOINT=http://localhost:8000/api/v2/graphql # end point to your graphql api
SYLIUS_CHANNEL_CODE=FASHION_WEB # sylius chanel, this integration can only operate on one
SYLIUS_THUMBNAIL_ENDPOINT=http://localhost:8000/media/cache/sylius_shop_product_thumbnail # endpoint to your thumbnail images
SYLIUS_REGULAR_IMAGE_ENDPOINT=http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail # endpoint to your full scale images
SYLIUS_PAYMENT_GATEWAY_HOST=http://localhost:8000 # redirect URL to which user will be redirected on payment 
SYLIUS_DEFAULT_LOCALE=en_US # default sylius locale code
```
3. Build the project with `yarn build`
4. Run the server in the development environment with `yarn dev`, or in the production environment with `yarn start`

## Additional configuration
Most of the additional configuration can be done inside of `packages/theme/nuxt.config.js`, for more information go to [Nuxt docs](https://nuxtjs.org/docs/directory-structure/nuxt-config#nuxtconfigjs). It is advised to use separate `.js` files for bigger configs, for example: 

```js
// packages/theme/themeConfig.js
export default {
  home: {
    bannerA: {
      link: '/',
      image: {
        mobile: '/homepage/bannerB.webp',
        desktop: '/homepage/bannerF.webp'
      }
    },
    bannerB: {
      link: '/',
      image: '/homepage/bannerE.webp'
    },
    bannerC: {
      link: '/',
      image: '/homepage/bannerC.webp'
    },
    bannerD: {
      link: '/',
      image: '/homepage/bannerG.webp'
    }
  }
};
```

```js
// packages/theme/nuxt.config.js
import theme from './themeConfig';

export default {
  // ...
  publicRuntimeConfig: {
    theme
  }
}
```
