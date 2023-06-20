# `useBilling`

## Features

`useBilling` composable is used for loading, and saving billing data in checkout.

## API

- `billing: any` - saved billing data.
- `loading: boolean` - a reactive object containing information about loading state of the billing data.
- `error` - reactive object containing the error message.

### `load: ({ cutumQuery?: CustomQuery }) => Promise<void>`

Function for fetching billing data.

### `save: ({ params: any, billingDetails: BillingAddress, customQuery?: CustomQuery }) => Promise<void>`

Function for saving billing data. It accepts an object with the following keys:

- `billingDetails`
  - `firstName: string`
  - `lastName: string`
  - `street: string`
  - `city: string`
  - `state: string`
  - `countryCode: string`
  - `postcode: string`
  - `email: string`
  - `phoneNumber: string`

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { useBilling } from '@realtainment/sylius';

export default {
  setup() {
    const { billing, load } = useBilling();

    onSSR(async () => {
      await load();
    });

    return {
      billing,
    };
  },
};
```
