# `useWishlists`

## Features

`useWishlists` composable is used for fetching wishlists and managing them.

## API

- `wishlists: Wishlist[]` - an array of fetched wishlists.
- `loading: boolean` - a reactive object containing information whether wishlists are loading.
- `error` - reactive object containing the error message.

[Wishlist](/guide/api-client/sylius-api.wishlist.html), [WishlistItem](/guide/api-client/sylius-api.wishlistitem.html)

### `load: () => Promise<void>`

Function for fetching wishlists.

### `addItem: (itemId: string, wishlistId: string) => Promise<void>`

Function for adding item to wishlist.

### `createWishlist: (wishlistName: string) => Promise<void>`

Function for creating wishlists.

### `clearWishlist: (wishlistId: string) => Promise<void>`

Function for clearing all products from wishlist.

### `editWishlist: (wishlistId: string, wishlistName: string) => Promise<void>`

Function for changing wishlists name.

### `isInWishlist: (product: Product, wishlist: Wishlist) => boolean`

Function for checking if product is in wishlist.

## Getters

- `getWishlist: (id: string, wishlists: Wishlist[]) => Wishlist | Record<string, never>`
- `getItems: (wishlist: Wishlist) => WishlistItem[]`
- `getTotals: (wishlist: Wishlist) => AgnosticTotals`
- `getItemName: (item: any) => string`
- `getItemImage: (item: WishlistItem) => string`
- `getItemPrice: (item: WishlistItem) => AgnosticPrice`
- `getItemAttributes: (item: WishlistItem, filters?: string[]) => Record<string, AgnosticAttribute | string>`
- `getItemSku: (item: WishlistItem) => string`
- `getTotalItems: (wishlist: Wishlist) => number`
- `getFormattedPrice: (price: number) => string`

## Example

```js
import { useWishlists } from '@realtainment/sylius';
export default {
  setup() {
    const { wishlists, createWishlist, clearWishlist, editWishlist, error } = useWishlists();

    const handleCreateWishlist = async (wishlistName) => {
      await createWishlist(wishlistName);

      if (error.value.createWishlist) {
        send({ type: 'danger', message: error.value.createWishlist.message });

        return;
      }

      send({ type: 'info', message: 'Wishlist was created successfully' });
    };
  },
};
```
