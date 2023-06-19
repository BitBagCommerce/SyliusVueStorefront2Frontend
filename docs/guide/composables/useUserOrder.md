# `useUserOrder`

## Features

`useUserOrder` composable is used for loading current users orders.

## API

- `orders: any[]` - current user orders.
- `loading: boolean` - a reactive object containing information about loading state of user orders.

### `search: (params: any) => Promise<void>`

Function for fetching user orders.

## Getters

- `getDate: (order: any) => string`
- `getId: (order: any) => string`
- `getTokenValue: (order: any) => string`
- `getStatus: (order: any) => string`
- `getPaymentStatus: (order: any) => string`
- `getShippingStatus: (order: any) => string`
- `getShippingTotal: (order: any) => number`
- `getPrice: (order: any) => number | null`
- `getItems: (order: any) => any[]`
- `getItemSku: (order: any) => string`
- `getItemName: (order: any) => string `
- `getItemQty: (order: any) => number `
- `getItemPrice: (order: any) => number`
- `getFormattedPrice: (order: any) => string`
- `getOrdersTotal: (order: any) => number`

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { useUserOrder } from '@realtainment/sylius';

export default {
  setup() {
    const { orders, search } = useUserOrder();

    onSSR(async () => {
      await search();
    });

    return {
      orders,
    };
  },
};
```
