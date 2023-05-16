import {
  useUserBillingFactory,
  UseUserBillingFactoryParams
} from '@vue-storefront/core';
import type { Context, UserAddressItem } from '@vue-storefront/sylius-api';

const params: UseUserBillingFactoryParams<UserAddressItem[], any> = {
  addAddress: async () => ({} as any),
  deleteAddress: async () => ({} as any),
  updateAddress: async () => ({} as any),
  setDefaultAddress: async () => ({} as any),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, data?) => {
    return await context.$sylius.api.getUserAddresses();
  }

};

export const useUserBilling = useUserBillingFactory<any, any>(params);
