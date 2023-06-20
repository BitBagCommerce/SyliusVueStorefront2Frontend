/* istanbul ignore file */
import { Logger, useUserFactory } from '@vue-storefront/core';
import {
  User,
  UseUserRegisterParams,
  UseUserUpdateParams,
  UseUserFactoryParams,
} from '../../types';
import { useCart } from '../useCart';
import type { Context } from '@vue-storefront/sylius-api';

const params: UseUserFactoryParams<
  User,
  UseUserUpdateParams,
  UseUserRegisterParams
> = {
  provide() {
    return {
      cart: useCart(),
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
          message: "Can't authenticate, user not verified",
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

    context.cart.setCart(null);
    await context.cart.load();
  },

  updateUser: async (
    context: Context,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { currentUser, updatedUserData, customQuery }
  ) => {
    const apiState = context.$sylius.config.state;
    return await context.$sylius.api.updateUserProfile(
      {
        customer: {
          id: apiState.getCustomerId(),
          // emailCanonical: updatedUserData.email,
          ...updatedUserData,
        },
      },
      customQuery
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (
    context: Context,
    { email, password, firstName, lastName }
  ) => {
    const registerUserResponse: any = await context.$sylius.api.registerUser({
      user: {
        firstName,
        lastName,
        password,
        email,
      },
    });
    const error = registerUserResponse?.graphQLErrors?.[0];

    if (error)
      throw {
        ...error,
        message: error.debugMessage,
      };

    return registerUserResponse;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password, rememberMe }) => {
    const apiState = context.$sylius.config.state;
    const orderTokenValue = apiState
      .getCartId()
      ?.replace('/api/v2/shop/orders/', '');

    if (!orderTokenValue) {
      throw {
        message: `orderTokenValue is equal to ${orderTokenValue}`,
      };
    }

    try {
      const loginUserResponse = await context.$sylius.api.loginUser({
        login: {
          username,
          password,
          rememberMe,
          orderTokenValue,
        },
      });

      if ((loginUserResponse as any).graphQLErrors !== undefined) {
        throw {
          message: "Can't authenticate with provided username/password.",
        };
      }

      apiState.setCustomerToken(loginUserResponse.token);
      apiState.setCustomerRefreshToken(loginUserResponse.refreshToken);
      apiState.setCustomerId(loginUserResponse.user.customer.id);
      apiState.setCartId(null);

      context.cart.setCart(null);
      await context.cart.load();
    } catch (e) {
      throw {
        message: "Can't authenticate with provided username/password.",
      };
    }

    return params.load(context);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (
    context: Context,
    { currentUser, currentPassword, newPassword, customQuery }
  ) => {
    const apiState = context.$sylius.config.state;
    const updatePassword = await context.$sylius.api.updateUserPassword(
      {
        customerPassword: {
          shopUserId: apiState
            .getCustomerId()
            .replace('/api/v2/shop/customers/', ''),
          currentPassword,
          newPassword,
          confirmNewPassword: newPassword,
        },
      },
      customQuery
    );
    const errors = (updatePassword as any).graphQLErrors?.[0];

    if (!errors) {
      await params.logOut(context, { currentUser });

      return await params.logIn(context, {
        username: currentUser.email,
        password: newPassword,
        rememberMe: false,
      });
    }

    throw {
      ...errors,
      message: errors.debugMessage,
    };
  },
};

export const useUser = useUserFactory<User, any, any>(params);
