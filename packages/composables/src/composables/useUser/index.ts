/* istanbul ignore file */

import {
  Context,
  Logger,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import { User } from '../../types';
import { useCart } from '../useCart';
const params: UseUserFactoryParams<User, any, any> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    const apiState = context.$sylius.config.state;
    const customerId = apiState.getCustomerId();
    if (customerId) {
      try {
        return await context.$sylius.api.getUser(customerId);
      } catch (e) {
        await params.logOut(context);

        Logger.error(e);
        throw {
          message: 'Can\'t authenticate, user not verified'
        };
      }
    }
    return null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    const apiState = context.$sylius.config.state;

    apiState.setCustomerToken(null);
    apiState.setCustomerRefreshToken(null);
    apiState.setCustomerId(null);
    apiState.setCartId(null);

    const { cartToken } = await context.$sylius.api.createCart();

    apiState.setCartId(cartToken);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData, customQuery }) => {
    const apiState = context.$sylius.config.state;
    return await context.$sylius.api.updateUserProfile({
      customer: {
        id: apiState.getCustomerId(),
        // emailCanonical: updatedUserData.email,
        ...updatedUserData
      }
    }, customQuery);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, { email, password, firstName, lastName }) => {
    try {
      const registerUserResponse = await context.$sylius.api.registerUser({
        user: {
          firstName,
          lastName,
          password,
          email
        }
      });
      return registerUserResponse;
    } catch (err) {
      const error = {
        ...err?.response?.data?.graphQLErrors?.[0],
        message: err?.response?.data?.graphQLErrors?.[0].debugMessage
      };
      throw error;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }) => {
    const apiState = context.$sylius.config.state;
    const orderTokenValue = apiState.getCartId()?.replace('/api/v2/shop/orders/', '');

    if (!orderTokenValue) {
      throw {
        message: `orderTokenValue is equal to ${orderTokenValue}`
      };
    }

    try {
      const loginUserResponse = await context.$sylius.api.loginUser({
        login: {
          username,
          password,
          orderTokenValue
        }
      });
      apiState.setCustomerToken(loginUserResponse.token);
      apiState.setCustomerRefreshToken(loginUserResponse.refreshToken);
      apiState.setCustomerId(loginUserResponse.user.customer.id);
    } catch (e) {
      console.log(e);
      throw {
        message: 'Can\'t authenticate with provided username/password.'
      };
    }

    return params.load(context);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword, customQuery }) => {
    const apiState = context.$sylius.config.state;
    const updatePassword = await context.$sylius.api.updateUserPassword({
      customerPassword: {
        shopUserId: apiState.getCustomerId().replace('/api/v2/shop/customers/', ''),
        currentPassword,
        newPassword,
        confirmNewPassword: newPassword
      }
    }, customQuery);
    const errors = updatePassword.graphQLErrors?.[0];

    if (!errors) {
      await params.logOut(context, { currentUser });

      return await params.logIn(context, { username: currentUser.email, password: newPassword });
    }

    throw {
      ...errors,
      message: errors.debugMessage
    };
  }
};

export const useUser = useUserFactory<User, any, any>(params);
