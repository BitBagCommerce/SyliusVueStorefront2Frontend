# `useProduct`

## Features

`useProduct` composable is used for fetching products by search parameters.

## API

- `products: Product[]` - an array of fetched products.
- `loading: boolean` - a reactive object containing information whether products are loading.

### `search: ( any ) => Promise<{ products: any, pagination: any }>`

Function for fetching products based on passed `params: ProductsSearchParams`.

[ProductsSearchParams](https://docs.vuestorefront.io/v2/reference/api/core.productssearchparams.html)

## Getters

- `getId: (product: Product) => string`
- `getName: (product: Product) => string`
- `getSlug: (product: Product) => string`
- `getPrice: (product: Product) => AgnosticPrice`
- `getGallery: (product: Product) => AgnosticMediaGalleryItem[]`
- `getCoverImage: (product: Product) => string`
- `getFiltered: (products: Product[], filters: ProductVariantFilters | any = {}) => Product[]`
- `getAttributes: (products: Product[] | Product, filterByAttributeName?: string[]) => Record<string, AgnosticAttribute | string>`
- `getDescription: (product: Product) => string`
- `getCategoryIds: (product: Product) => string[]`
- `getFormattedPrice: (product: Product) => string`
- `getTotalReviews: (product: Product) => number`
- `getAverageRating: (product: Product) => number`
- `getOptions: (product: Product) => any`
- `getStockForVariant: (variant: any) => number`
- `isInStock: (variant: any) => boolean`
- `hasMultipleVariants: (product: Product) => boolean`
- `getQuantityLimit: (variant: any) => number`

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
