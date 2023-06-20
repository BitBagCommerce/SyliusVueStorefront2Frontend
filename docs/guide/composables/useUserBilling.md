# `useUserBilling`

## Features

`useUserBilling` composable is used for loading address.

## API

- `billing: any` - user saved addresses.
- `loading: boolean` - a reactive object containing information addresses are loading.
- `error` - reactive object containing the error message.

### `load: () => Promise<void>`

Function for loading all saved addresses for current user.

### `addAddress: ({ address: any, customQuery?: CustomQuery }) => Promise<void>`

Function for adding a new address. It accepts an object with the following keys:

- `address`
  - `firstName: string`
  - `lastName: string`
  - `street: string`
  - `city: string`
  - `postcode: string`
  - `countryCode: string`
  - `phoneNumber: string`

### `updateAddress: ({ address: any, customQuery?: CustomQuery }) => Promise<void>`

Function for updating an address. It accepts an object with the following keys:

- `address`
  - `firstName: string`
  - `lastName: string`
  - `street: string`
  - `city: string`
  - `postcode: string`
  - `countryCode: string`
  - `phoneNumber: string`

### `deleteAddress: ({ address: any, customQuery?: CustomQuery }) => Promise<void>`

Function for deleting an address. It accepts an object with the following keys:

- `address`
  - `id: string`

### `setDefaultAddress: ({ address: any, customQuery?: CustomQuery }) => Promise<void>`

Function for deleting an address. It accepts an object with the following keys:

- `address`
  - `id: string`

## Getters

- `getAddresses: (billing: any, criteria?: Record<string, any>) => any[]`
- `getDefault: (billing: any) => any`
- `getTotal: (billing: any) => number`
- `getPostCode: (address: any) => string`
- `getStreetNumber: (address: any) => string`
- `getCity: (address: any) => string`
- `getFirstName: (address: any) => string`
- `getLastName: (address: any) => string`
- `getCountry: (address: any) => string`
- `getPhone: (address: any) => string`
- `getEmail: (address: any) => string`
- `getProvince: (address: any) => string`
- `getCompanyName: (address: any) => string`
- `getTaxNumber: (address: any) => string`
- `getId: (address: any) => string`
- `getApartmentNumber: (address: any) => string | number`
- `isDefault: (address: any) => boolean`

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useUserBilling, userBillingGetters } from '@realtainment/sylius';

export default {
  setup() {
    const { billing, load, loading } = useUserBilling();

    onSSR(async () => {
      await load();
    });

    return {
      billing,
      userBillingGetters,
    };
  },
};
```
