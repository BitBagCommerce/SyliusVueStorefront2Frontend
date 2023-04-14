# `useUserShipping`

## Features

`useUserShipping` composable is used for loading, adding, updating and deleting shipping address.

## API

* `shipping: UserShippingAddress | null` - created order.
* `loading: boolean` - a reactive object containing information whether order is loading.
* `error: UseUserShippingErrors` - a map of errors per method

[UserShippingAddress](../api-client/sylius-api.usershippingaddress.md)
[UseUserShippingErrors](https://docs.vuestorefront.io/v2/reference/api/core.useusershippingerrors.html)


### `load`
Function for loading all saved addresses for current user.

### `addAddress`
Function for adding a new address. It accepts an object with the following keys:

  * `address`
      * `firstName: string`
      * `lastName: string`
      * `street: string`
      * `city: string`
      * `postcode: string`
      * `countryCode: string`
      * `phoneNumber: string`

### `updateAddress`
Function for updating an address. It accepts an object with the following keys:

  * `address`
      * `firstName: string`
      * `lastName: string`
      * `street: string`
      * `city: string`
      * `postcode: string`
      * `countryCode: string`
      * `phoneNumber: string`

### `deleteAddress`
Function for deleting an address. It accepts an object with the following keys:

  * `address`
      * `id: string`

## Getters

* `getAddresses: AddressItem[]`
* `getDefault: AddressItem`
* `getTotal: number`
* `getPostCode: string`
* `getStreetNumber: string`
* `getCity: string`
* `getFirstName: string`
* `getLastName: string`
* `getCountry: string`
* `getPhone: string`
* `getEmail: string`
* `getProvince: string`
* `getCompanyName: string`
* `getTaxNumber: string`
* `getId: string`
* `getApartmentNumber: string | number`
* `isDefault: boolean`


## Example

```js
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useUserShipping, userShippingGetters } from '@realtainment/sylius';

export default {
  setup () {
    const { shipping, load, loading } = useUserShipping();

    onSSR(async () => {
      await load();
    });

    return {
      shipping,
      userShippingGetters
    }
  }
};
```
