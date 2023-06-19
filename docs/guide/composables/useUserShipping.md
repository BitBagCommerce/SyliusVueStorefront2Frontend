# `useUserShipping`

## Features

`useUserShipping` composable is used for loading, adding, updating and deleting shipping address.

## API

- `shipping: UserShippingAddress | null` - created order.
- `loading: boolean` - a reactive object containing information whether order is loading.
- `error: UseUserShippingErrors` - a map of errors per method

[UserShippingAddress](../api-client/sylius-api.usershippingaddress.md)
[UseUserShippingErrors](https://docs.vuestorefront.io/v2/reference/api/core.useusershippingerrors.html)

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

- `getAddresses: (shipping: Address, criteria?: UserShippingAddressSearchCriteria) => any[]`
- `getDefault: (shipping: Address) => any`
- `getTotal: (shipping: Address) => number`
- `getPostCode: (address: any) => string`
- `getStreetNumber: (address: any) => string | number`
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
import { useUserShipping, userShippingGetters } from '@realtainment/sylius';

export default {
  setup() {
    const { shipping, load, loading } = useUserShipping();

    onSSR(async () => {
      await load();
    });

    return {
      shipping,
      userShippingGetters,
    };
  },
};
```
