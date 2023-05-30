import {
  useForgotPasswordFactory,
  UseForgotPasswordFactoryParams,
} from '@vue-storefront/core';
import type { Context } from '@vue-storefront/sylius-api';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword: async (context: Context, { email, customQuery }) => {
    return await context.$sylius.api.triggerResetUserPassword(
      {
        customerPassword: { email },
      },
      customQuery
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNewPassword: async (
    context: Context,
    { tokenValue: resetPasswordToken, newPassword, customQuery }
  ) => {
    const confirmedNewPassword = newPassword;
    return await context.$sylius.api.resetUserPassword(
      {
        customerPassword: {
          resetPasswordToken,
          newPassword,
          confirmedNewPassword,
        },
      },
      customQuery
    );
  },
};

export const useForgotPassword = useForgotPasswordFactory<any>(factoryParams);
