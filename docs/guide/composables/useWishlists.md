# `useWishlists`

## Features

`useWishlists` composable is used for fetching wishlists and managing them.

## API

- `wishlists: Wishlist[]` - an array of fetched wishlists.
- `loading: boolean` - a reactive object containing information whether wishlists are loading.

### `addItem => Promise<void>`

Function for adding item to wishlist, it takes item id and wishlist id as parameters:
- `itemId: string`
- `wishlistId: string`

### `createWishlist => Promise<void>`

Function for creating wishlists, takes new name as parameter:
- `wishlistName: string`

### `clearWishlist => Promise<void>`

Function for clearing all products from wishlist, it takes target wishlist Id as parameter:
- `wishlistId: string`

### `editWishlist => Promise<void>`

Function for changing wishlists name, it takes target wishlist Id and new name as parameters:
- `wishlistId: string`
- `wishlistName: string`

### `isInWishlist => boolean`

Function for checking if product is in wishlist, it takes product and wishlist as parameters and returns boolean value:
- `product: Product`
- `wishlist: Wishlist`

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
