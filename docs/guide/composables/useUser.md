# `useUser`

## Features

`useUser` composable is used for performing user authentication, registration, profile updates and changing password.

## API

- `user: User | null` - user object.
- `loading: boolean` - a reactive object containing information whether user object is loading.
- `isAuthenticated: boolean ` - a reactive object containing information whether current user is authenticated.
- `error: UseUserErrors` - a map of errors per method

[User](../api-client/sylius-api.user.md)
[UseUserErrors](https://docs.vuestorefront.io/v2/reference/api/core.useusererrors.html)

### `load: ({ customQuery?: CustomQuery }) => Promise<void>`

Function for loading the current user.

### `logIn: ( username: string, password: string, rememberMe: boolean, customQuery?: CustomQuery ) => Promise<void>`

Function for logging in user.

### `logOut: ({ customQuery?: CustomQuery }) => Promise<void>`

Function for logging out current user.

### `register: ( UseUserRegisterParams, customQuery?: CustomQuery ) => Promise<void>`

Function for registering a new user. It accepts an object with the following keys:

`UseUserRegisterParams`
- `email: string`
- `password: string`
- `firstName: string`
- `lastName: string`

### `updateUser: ({ currentUser: User, updatedUserData: UseUserUpdateParams, customQuery?: CustomQuery }) => Promise<void>`

Function for updating user information.

### `changePassword: ({ currentUser: User, currentPassword: string, newPassword: string, customQuery?: CustomQuery }) => Promise<void>`

Function for changing current users password. It accepts an object with the following keys:

- `currentUser: User`
- `currentPassword: string`
- `newPassword: string`

## Getters

- `getFirstName: (user: User) => string`
- `getLastName: (user: User) => string`
- `getFullName: (user: User) => string`
- `getEmailAddress: (user: User) => string`

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useUser, userGetters } from '@realtainment/sylius';

export default {
  setup() {
    const { user, load, loading } = useUser();

    onSSR(async () => {
      await load();
    });

    return {
      user,
      userGetters,
    };
  },
};
```
