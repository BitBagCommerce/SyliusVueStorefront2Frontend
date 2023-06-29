# `useCart`

## Features

`useCart` composable can be used to:

- create new cart or load existing one,
- add, update and remove items in the cart,
- applying and removing coupons,
- checking if product is already added to the cart.

## API

- `cart: Cart` - a main data object.
- `loading: boolean` - a reactive object containing information about loading state of the cart.
- `error` - reactive object containing the error message.

### `load: ({ customQuery?: CustomQuery } }) => Promise<void>`

Function for loading existing cart from cookie or creating a brand new cart and storing cart identifier to cookie.
function required to fetch cart from a server or create brand new if it doesn't exist.

### `addItem: ({ product: Product, quantity: number, customQuery?: customQuery }) => Promise<void>`

Function for adding products to the cart.

### `updateItemQty: ({ product: Product, quantity?: number, customQuery?: customQuery }) => Promise<void>`

Function for updating quantity of a product in cart.

### `removeItem: ({ product: Product, customQuery?: customQuery }) => Promise<void>`

Function for removing a product from cart.

### `isInCart: ({ product: Product }) => boolean`

Function for checking if given product is currently in the cart.

### `clear: () => Promise<void>`

Function for removing all items in cart.

### `applyCoupon: ({ couponCode: string, customQuery?: CustomQuery }) => Promise<void>`

Function for applying coupon to cart.

### `removeCoupon: ({ couponCode: string, customQuery?: CustomQuery }) => Promise<void>`

Function for removing coupon from cart.

### `setCart: (newCart: Cart) => void`

Function for replacing cart.

## Getters

- `getTotals: (cart: Cart) => AgnosticTotals`
- `getShippingPrice: (cart: Cart) => number`
- `getItems: (cart: Cart) => CartLineItem[]`
- `getItemName: (product: CartLineItem) => string`
- `getItemImage: (product: CartLineItem) => string`
- `getItemPrice: (product: CartLineItem) => AgnosticPrice`
- `getItemQty: (product: CartLineItem) => number`
- `getItemAttributes: (product: CartLineItem, filterByAttributeName?: Array<string>) => Record<string, string>`
- `getItemSku: (product: CartLineItem) => string`
- `getFormattedPrice: (price: number) => string`
- `getTotalItems: (cart: Cart) => number`
- `getCoupons: (cart: Cart) => AgnosticCoupon[]`
- `getDiscounts: (cart: Cart) => AgnosticDiscount[]`
- `getCartTokenValue: (cart: any) => number`

## Example

```js
import { useCart, cartGetters } from '@realtainment/sylius';
import { onSSR } from '@vue-storefront/core';
import { computed, ref } from '@vue/composition-api';
export default {
  setup() {
    const {
      cart,
      removeItem,
      updateItemQty,
      applyCoupon,
      load,
      removeCoupon,
      error,
    } = useCart();

    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const discounts = computed(() => cartGetters.getDiscounts(cart.value));

    onSSR(async () => {
      if (!cart.value) await load();
    });

    const submitCouponForm = async () => {
      await applyCoupon({ couponCode: promoCode.value });
      const errorKeys = Object.keys(error.value);
      errorKeys.forEach((errorKey) => {
        if (error.value[errorKey] && error.value[errorKey]?.message) {
          console.log({
            type: 'danger',
            message: error.value[errorKey].message,
          });
        }
      });
    };

    const handleCouponRemoval = async (couponCode) => {
      await removeCoupon({ couponCode });
    };

    return {
      cartGetters,
      discounts,
      totalItems,
      products,
      totals,
      removeItem,
      updateItemQty,
      applyCoupon,
      handleCouponRemoval,
    };
  },
};
```
