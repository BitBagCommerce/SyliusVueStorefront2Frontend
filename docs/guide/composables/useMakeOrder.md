# `useMakeOrder`

## Features

`useMakeOrder` composable is used for creating orders.

## API

- `order: Order | null` - created order.
- `loading: boolean` - a reactive object containing information whether order is loading.
- `error: UseMakeOrderErrors` - a map of errors per method.

[UseMakeOrderErrors](https://docs.vuestorefront.io/v2/reference/api/core.usemakeordererrors.html)

### `make: ({ customQuery?: CustomQuery }) => Promise<void>`

Function for creating an order based on current cart token.

## Getters

- `getDate: (order: Order) =>  string`
- `getId: (order: Order) => string`
- `getStatus: (order: Order) => string`
- `getPaymentStatus: (order: Order) => string`
- `getShippingStatus: (order: Order) => string`
- `getShippingTotal: (order: Order) => number`
- `getPrice: (order: Order) => number`
- `getItems: (order: Order) => any[]`
- `getItemSku: (item: OrderItem) => string`
- `getItemName: (item: OrderItem) => string`
- `getItemQty: (item: OrderItem) => number`
- `getItemPrice: (item: OrderItem) => number`
- `getFormattedPrice: (price: number) => string`
- `getOrdersTotal: ({ offset: number, count: number, total: number, results: Array<Order> }) => number`

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useMakeOrder, orderGetters } from '@realtainment/sylius';

export default {
  setup() {
    const { order, make, loading } = useMakeOrder();

    onSSR(async () => {
      await make();
    });

    return {
      order,
      orderGetters,
    };
  },
};
```
