# `useWishlists`

## Features

`useWishlists` composable is used for fetching products by search parameters.

## API

- `wishlists: Wishlist[]` - an array of fetched wishlists.
- `loading: boolean` - a reactive object containing information whether wishlists are loading.

## Getters

- `getWishlist: Wishlist | Record<string, never>`
- `getItems: WishlistItem[]`
- `getTotals: AgnosticTotals`
- `getItemName: string`
- `getItemImage: string`
- `getItemPrice: AgnosticPrice`
- `getItemAttributes: Record<string, AgnosticAttribute | string>`
- `getItemSku: string`
- `getTotalItems: number`
- `getFormattedPrice: string`

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useWishlists, productGetters } from '@realtainment/sylius';
export default {
  setup() {
    const { wishlists, createWishlist, clearWishlist, editWishlist, error } = useWishlists();

    return {
      wishlists,
    };
  },
};
```
