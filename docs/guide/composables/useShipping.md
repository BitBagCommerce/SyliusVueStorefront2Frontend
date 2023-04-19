# `useShipping`

## Features

`useShipping` composable is used for loading, and saving shipping data in checkout.

## API

* `shipping: any` - saved shipping data.
* `loading: boolean` - a reactive object containing information about loading state of the shipping data.

### `load`

Function for fetching shipping data.

### `save`

Function for saving shipping data. It accepts an object with the following keys:

  * `shippingDetails`
      * `firstName: string`
      * `lastName: string`
      * `street: string`
      * `city: string`
      * `state: string`
      * `countryCode: string`
      * `postcode: string`
      * `email: string`
      * `phoneNumber: string`

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { useShipping } from '@realtainment/sylius';

export default {
  setup () {
    const { shipping, load } = useShipping();

    onSSR(async () => {
      await load();
    });

    return {
      shipping
    }
  }
};
```
