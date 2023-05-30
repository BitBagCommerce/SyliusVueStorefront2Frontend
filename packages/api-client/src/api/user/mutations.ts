import { gql } from 'api-client/__generated__';

export const loginMutation = gql(`
  mutation login(
    $login: shop_loginShopUserTokenInput!
  ) {
    shop_loginShopUserToken(
      input: $login
    ) {
      shopUserToken {
        token
        refreshToken
        user {
          customer {
            id
          }
        }
      }
    }
  }
`);

export const registerMutation = gql(`
  mutation registerUser(
    $user: shop_registerUserInput!
  ) {
    shop_registerUser(
      input: $user
    ) {
      user {
        username
        email
        customer {
          firstName
          lastName
        }
      }
    }
  }
`);

export const refreshLoginTokenMutation = gql(`
  mutation refreshToken(
    $token: shop_refreshShopUserTokenInput!
  ) {
    shop_refreshShopUserToken(
      input: $token
    ) {
      shopUserToken {
        token
        refreshToken
        user {
          id
          username
          customer {
            id
            firstName
          }
        }
      }
    }
  }
`);

export const updateProfileMutation = gql(`
  mutation editUser(
    $customer: shop_putCustomerInput!
  ) {
    shop_putCustomer(
      input: $customer
    ) {
      customer {
        firstName
        lastName
        email
        phoneNumber
        gender
        birthday
        subscribedToNewsletter
      }
    }
  }
`);

export const updatePasswordMutation = gql(`
  mutation changeCustomerPassword(
    $customerPassword: shop_password_updateCustomerInput!
  ) {
    shop_password_updateCustomer(input: $customerPassword) {
      clientMutationId
    }
  }
`);

export const addAddressMutation = gql(`
  mutation addUserAddress(
    $address: shop_postAddressInput!
  ) {
    shop_postAddress(
      input: $address
    ) {
      address {
        id
        firstName
        lastName
        street
        city
        postcode
        state: provinceName
        countryCode
        phoneNumber
      }
    }
  }
`);

export const updateAddressMutation = gql(`
  mutation updateUserAddress(
    $address: shop_putAddressInput!
  ) {
    shop_putAddress(
      input: $address
    ) {
      address {
        id
        firstName
        lastName
        street
        city
        postcode
        state: provinceName
        countryCode
        phoneNumber
      }
    }
  }
`);

export const deleteAddressMutation = gql(`
  mutation deleteUserAddress(
    $address: deleteAddressInput!
  ) {
    deleteAddress(
      input: $address
    ) {
      clientMutationId
    }
  }
`);

export const triggerResetPasswordMutation = gql(`
  mutation resetPasswordMailTrigger(
      $customerPassword: shop_send_reset_password_emailCustomerInput!
  ) {
    shop_send_reset_password_emailCustomer(input: $customerPassword) {
      customer {
        email
      }
    }
  }
`);

export const resetPasswordMutation = gql(`
  mutation resetPasswordMail(
    $customerPassword: shop_reset_passwordCustomerInput!
  ) {
    shop_reset_passwordCustomer(input: $customerPassword) {
      customer {
        email
      }
    }
  }
`);
