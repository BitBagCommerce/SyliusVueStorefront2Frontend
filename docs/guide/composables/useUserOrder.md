# `useUserOrder`

## Features

`useUserOrder` composable is used for loading current users orders.

## API

* `orders: any[]` - current users orders.
* `loading: boolean` - a reactive object containing information about loading state of user orders.

### `search`

Function for fetching user orders.

## Getters

* `getDate: string`
* `getId: string`
* `getTokenValue: string`
* `getStatus: string`
* `getPaymentStatus: string`
* `getShippingStatus: string`
* `getShippingTotal: number`
* `getPrice: number | null`
* `getItems: any[]`
* `getItemSku: string`
* `getItemName: string `
* `getItemQty: number `
* `getItemPrice: number`
* `getFormattedPrice: string`
* `getOrdersTotal: number`

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { useUserOrder } from '@realtainment/sylius';

export default {
  setup () {
    const { orders, search } = useUserOrder();

    onSSR(async () => {
      await search();
    });

    return {
      orders
    }
  }
};
```
