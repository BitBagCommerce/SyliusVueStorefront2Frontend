import {
  useUserShippingFactory,
  UseUserShippingFactoryParams,
} from '@vue-storefront/core';
import type { Context } from '@vue-storefront/sylius-api';
import { errorHelper } from '../../helpers';
import {
  useUserShippingAddress,
  useUserShippingAddressItem,
} from '../../types';

const params: UseUserShippingFactoryParams<
  useUserShippingAddress,
  useUserShippingAddressItem
> = {
  addAddress: async (context: Context, { address, customQuery }) => {
    errorHelper(
      await context.$sylius.api.addUserAddress({ address } as any, customQuery)
    );

    const response = errorHelper(await context.$sylius.api.getUserAddresses());

    return response;
  },

  deleteAddress: async (context: Context, { address, customQuery }) => {
    await context.$sylius.api.deleteUserAddress(
      {
        address: {
          id: address.id,
        },
      },
      customQuery
    );

    const response = errorHelper(await context.$sylius.api.getUserAddresses());

    return response;
  },

  updateAddress: async (context: Context, { address, customQuery }) => {
    await context.$sylius.api.updateUserAddress({ address }, customQuery);

    const response = errorHelper(await context.$sylius.api.getUserAddresses());

    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefaultAddress: async (context: Context, data?) => [] as any,
  load: async (context: Context) => {
    const response = errorHelper(await context.$sylius.api.getUserAddresses());

    return response;
  },
};

export const useUserShipping = useUserShippingFactory<any, any>(params);
