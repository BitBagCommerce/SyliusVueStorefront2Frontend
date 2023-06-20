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

- `getAddresses: (billing: any, criteria?: UserBillingAddressSearchCriteria) => AddressItem[]`
- `getDefault: (billing: Address) => AddressItem`
- `getTotal: (billing: Address) => number`
- `getPostCode: (address: AddressItem) => string`
- `getStreetName: (address: AddressItem) => string`
- `getStreetNumber: (address: AddressItem) => string | number`
- `getCity: (address: AddressItem) => string`
- `getFirstName: (address: AddressItem) => string`
- `getLastName: (address: AddressItem) => string`
- `getCountry: (address: AddressItem) => string`
- `getPhone: (address: AddressItem) => string`
- `getEmail: (address: AddressItem) => string`
- `getProvince: (address: AddressItem) => string`
- `getCompanyName: (address: AddressItem) => string`
- `getTaxNumber: (address: AddressItem) => string`
- `getId: (address: AddressItem) => string`
- `getApartmentNumber: (address: AddressItem) => string | number`
- `isDefault: (address: AddressItem) => boolean`

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
