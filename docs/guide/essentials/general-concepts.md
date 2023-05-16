# General Concepts

## API Client

:::warning While working on API remember to
Close your VSF2 server if it is running and run `yarn build`. Folder `packages/api-client` doesn't support hot reload and requires a separate build after making any changes.
:::

Inside of `/packages/api-client` folder you can find functions that directly send backend calls through GraphQL, and respective GraphQL code.

Most work you will do on API will be done in `packages/api-client/src/api`, separate functionalities here are split into different folders, those folders usually contain three files:

- `queries.ts` - in this file, you write your GraphQL code used for getting data from the backend, for example:

```ts
// packages/api-client/src/api/getProduct/queries.ts
export const getProductsAttributesQuery = gql`
  query productsAttributesInTaxon($categorySlug: String, $locale: String) {
    products(productTaxons_taxon_translations_slug: $categorySlug) {
      collection {
        attributes(localeCode: $locale) {
          collection {
            id
            code
            name
            stringValue
            type
          }
        }
      }
    }
  }
`;
```

- `mutations.ts` - in this file, you write your GraphQL code used for changing data on the backend, for example:

```ts
// packages/api-client/src/api/cart/mutations.ts
export const clearCartMutation = gql`
  mutation deleteCart($cartId: String!) {
    deleteOrder(input: { id: $cartId }) {
      order {
        tokenValue
      }
    }
  }
`;
```

- `index.ts` - in this file, you use your queries, and mutations created before, and add any additional logic, for example:

```ts
// packages/api-client/src/api/getProduct/index.ts
export async function getProduct(
  context,
  params,
  customQuery?: CustomQuery
): Promise<any> {
  try {
    // crating a query
    const { productsQuery } = context.extendQuery(customQuery, {
      productsQuery: {
        query: getProductsAttributesQuery,
        variables: params,
      },
    });

    // executing created query
    const { data } = await context.client.query({
      query: gql`
        ${productsQuery.query}
      `,
      variables: productsQuery.variables,
      fetchPolicy: 'no-cache',
    });

    // here you can do any additional logic

    // and at the end return final output
    return data;
  } catch (err) {
    // additional catch logic
  }
}
```

## Composables

Composables are a feature of Vue's composition API, which allows you to encapsulate the state in a function. For more general information about composables visit [Vue docs](https://vuejs.org/guide/reusability/composables.html).

Composables are located in `packages/composables/src`, and split into two folders:

- `/composables` - here you can find general stateful composables used for querying data, and mutating it
- `/getters` - functions located here are mostly just utility functions used to help with retrieving data from stateful composables

:::tip Additional information:
More about composables in VSF2 can be found [here](https://docs.vuestorefront.io/v2/composition/composables.html)
:::

## Theme

Folder `packages/theme` is the place where your [Nuxt2](https://nuxtjs.org/) app is located, here you write your [Vue2](https://vuejs.org/) code using [composition API](https://vuejs.org/guide/extras/composition-api-faq.html).

Example `.vue` file:

```vue
<template>
  <!-- your custom HTML -->
</template>

<script>
export default {
  name: 'UserAddress',
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  // props and context can be accessed through setup() function
  setup(props, context) {
    // your custom logic
  },
};
</script>

<!-- styling throughout the project is done with scss -->
<style lang="scss" scoped>
// your custom scoped styles
</style>
```

:::tip Additional information:
More about theme in VSF2 can be found [here](https://docs.vuestorefront.io/v2/getting-started/layouts-and-routing.html)
:::

## Internalization

Vue Storefront 2 uses [i18n](https://i18n.nuxtjs.org/) for internationalization. Information about configuring it can be found [here](https://docs.vuestorefront.io/v2/getting-started/internationalization.html).

By default, this integration has two translation files located in `packages/theme/lang` additional ones have to be configured inside of `packages/theme/i18nConfig.js`, like this:

```js
// packages/theme/i18nConfig.js
export default {
  // ...
  locales: [
    { code: 'en', label: 'English', file: 'en.js', iso: 'en', sylius: 'en_US' },
    { code: 'de', label: 'German', file: 'de.js', iso: 'de', sylius: 'de_DE' },
    // your new locale
    { code: 'pl', label: 'Polish', file: 'pl.js', iso: 'pl', sylius: 'pl_PL' },
  ],
};
```

Remember to also configure the same translation on the Sylius side, and to use the proper locale code from Sylius translations for `sylius` key above, this code should be similar to the ones above `en_US`.

After this configuration, you can add your translation file to `packages/theme/lang`, and add your custom translations to it:

```js
// packages/theme/lang/pl.js
export default {
  // ...
  'New translation': 'Nowe tłumaczenie',
};
```

Remember to add the same translation key to other translation files:

```js
// packages/theme/lang/en.js
export default {
  // ...
  'New translation': 'New translation'
}

// packages/theme/lang/de.js
export default {
  // ...
  'New translation': 'Neue Übersetzung'
}
```

To access your translations in Vue templates, you just need to use `$t('Key from translation file')`, for example:

```html
<span>
  {{ $t('New translation') }}
  <span></span
></span>
```

Inside of `setup()` function it can be accessed through context, for example:

```js
export default {
  // ...
  setup(props, context) {
    context.root.$i18n.t('New translation'));
  }
}
```
