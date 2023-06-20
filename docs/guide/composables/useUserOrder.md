# `useUserOrder`

## Features

`useUserOrder` composable is used for loading current users orders.

## API

- `orders: any[]` - current user orders.
- `loading: boolean` - a reactive object containing information about loading state of user orders.
- `error` - reactive object containing the error message.

### `search: (params: any) => Promise<void>`

Function for fetching user orders.

## Getters

- `getDate: (order: Order) => string`
- `getId: (order: Order) => string`
- `getTokenValue: (order: any) => string`
- `getStatus: (order: any) => string`
- `getPaymentStatus: (order: Order) => string`
- `getShippingStatus: (order: Order) => string`
- `getShippingTotal: (order: Order) => number`
- `getPrice: (order: Order) => number | null`
- `getItems: (order: Order) => any[]`
- `getItemSku: (item: any) => string`
- `getItemName: (item: OrderItem) => string `
- `getItemQty: (item: OrderItem) => number `
- `getItemPrice: (item: OrderItem) => number`
- `getFormattedPrice: (price: number) => string`
- `getOrdersTotal: (orders: any) => number`

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
