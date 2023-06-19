# `useProduct`

## Features

`useProduct` composable is used for fetching products by search parameters.

## API

- `products: Product[]` - an array of fetched products.
- `loading: boolean` - a reactive object containing information whether products are loading.

### `search: ({ customQuery?: CustomQuery }) => Promise<void>`

Function for fetching products based on passed `params: ProductsSearchParams`.

[ProductsSearchParams](https://docs.vuestorefront.io/v2/reference/api/core.productssearchparams.html)

## Getters

- `getId: (product: any) => string`
- `getName: (product: any) => string`
- `getSlug: (product: any) => string`
- `getPrice: (product: any) => AgnosticPrice`
- `getGallery: (product: any) => AgnosticMediaGalleryItem[]`
- `getCoverImage: (product: any) => string`
- `getFiltered: (products: any) => any[]`
- `getAttributes: (products: any) => Record<string, AgnosticAttribute | string>`
- `getDescription: (product: any) => string`
- `getCategoryIds: (product: any) => string[]`
- `getFormattedPrice: (product: any) => string`
- `getTotalReviews: (product: any) => number`
- `getAverageRating: (product: any) => number`
- `getOptions: (product: any) => any`
- `getStockForVariant: (product: any) => number`
- `isInStock: (product: any) => boolean`
- `hasMultipleVariants: (product: any) => boolean`
- `getQuantityLimit: (product: any) => number`

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useProduct, productGetters } from '@realtainment/sylius';
export default {
  setup() {
    const { products, search } = useProduct('products');

    onSSR(async () => {
      await search({ slug });
    });

    return {
      products,
      productGetters,
    };
  },
};
```
