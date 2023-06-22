# `useUserShipping`

## Features

`useUserShipping` composable is used for loading, adding, updating and deleting shipping address.

## API

- `shipping: UserShippingAddress | null` - created order.
- `loading: boolean` - a reactive object containing information whether order is loading.
- `error: UseUserShippingErrors` - a map of errors per method.

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

- `getAddresses: (shipping: Address, criteria?: UserShippingAddressSearchCriteria) => AddressItem[]`
- `getDefault: (shipping: Address) => AddressItem`
- `getTotal: (shipping: Address) => number`
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
