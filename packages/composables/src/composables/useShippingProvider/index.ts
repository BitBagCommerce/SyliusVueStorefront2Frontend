import {
  useShippingProviderFactory,
  UseShippingProviderParams,
} from '@vue-storefront/core';
import { Shipping, ShippingMethod } from '../../types';
import { useCart } from '../useCart';
import type { Context } from '@vue-storefront/sylius-api';

const params: UseShippingProviderParams<Shipping, ShippingMethod> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    if (!context.cart.cart?.value) await context.cart.load({ customQuery });
    return {
      ...context.cart.cart.value.shipments?.method,
      state: '',
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: any, { shippingMethod, customQuery }) => {
    const response = await context.$sylius.api.updateCartShipping(
      { shippingMethod },
      customQuery
    );
    context.cart.setCart(response);
    return response;
  },
};

export const useShippingProvider = useShippingProviderFactory<
  Shipping,
  ShippingMethod
>(params);
