# `useUser`

## Features

`useUser` composable is used for performing user authentication, registration, profile updates and changing password.

## API

* `user: User | null` - user object.
* `loading: boolean` - a reactive object containing information whether user object is loading.
* `isAuthenticated: boolean ` - a reactive object containing information whether current user is authenticated.
* `error: UseUserErrors ` - a map of errors per method

[User](../api-client/sylius-api.user.md)
[UseUserErrors](https://docs.vuestorefront.io/v2/reference/api/core.useusererrors.html)


### `load`

Function for loading the current user.

### `logIn`

Function for logging in user. It accepts an object with the following keys:

  * `username: string`
  * `password: string`

### `logOut`

Function for logging out current user.

### `register`

Function for registering a new user. It accepts an object with the following keys:

  * `email: string`
  * `password: string`
  * `firstName: string`
  * `lastName: string`

### `updateUser`

Function for updating user information. It accepts an object with the following keys:

  * `user`
      * `firstName: string`
      * `lastName: string`
      * `email: string`
      * `gender: string`
      * `birthday: string`
      * `phoneNumber: string`
      * `subscribedToNewsletter: boolean`

### `changePassword`

Function for changing current users password. It accepts an object with the following keys:

  * `currentUser: any`
  * `currentPassword: string`
  * `newPassword: string`


## Getters

* `getFirstName: string`
* `getLastName: string`
* `getFullName: string`
* `getEmailAddress: string`


## Example

```js
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useUser, userGetters } from '@realtainment/sylius';

export default {
  setup () {
    const { user, load, loading } = useUser();

    onSSR(async () => {
      await load();
    });

    return {
      user,
      userGetters
    }
  }
};
```
