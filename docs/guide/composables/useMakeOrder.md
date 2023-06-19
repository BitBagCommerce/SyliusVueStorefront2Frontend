# `useMakeOrder`

## Features

`useMakeOrder` composable is used for creating orders.

## API

- `order: Order | null` - created order.
- `loading: boolean` - a reactive object containing information whether order is loading.
- `error: UseMakeOrderErrors` - a map of errors per method

[UseMakeOrderErrors](https://docs.vuestorefront.io/v2/reference/api/core.usemakeordererrors.html)

### `make: ({ customQuery?: CustomQuery }) => Promise<void>`

Function for creating an order based on current cart token.

## Getters

- `getDate: (order: ORDER) =>  string`
- `getId: (order: ORDER) => string`
- `getStatus: (order: ORDER) => string`
- `getPaymentStatus: (order: ORDER) => string`
- `getShippingStatus: (order: ORDER) => string`
- `getShippingTotal: (order: ORDER) => number`
- `getPrice: (order: ORDER) => number`
- `getItems: (order: ORDER) => any[]`
- `getItemSku: (item: ORDER_ITEM) => string`
- `getItemName: (item: ORDER_ITEM) => string`
- `getItemQty: (item: ORDER_ITEM) => number`
- `getItemPrice: (item: ORDER_ITEM) => number`
- `getFormattedPrice: (price: number) => string`
- `getOrdersTotal: ({ offset: number, count: number, total: number, results: Array<ORDER> }) => number`

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
