/* istanbul ignore file */

import {
  useUserOrderFactory,
  UseUserOrderFactoryParams,
} from '@vue-storefront/core';
import { OrdersResponse, OrderSearchParams } from '../../types';
import type { Context } from '@vue-storefront/sylius-api';
import { errorHelper } from '../../helpers';

const params: UseUserOrderFactoryParams<OrdersResponse, OrderSearchParams> = {
  searchOrders: async (
    context: Context,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: OrderSearchParams
  ): Promise<OrdersResponse> => {
    const apiState = context.$sylius.config.state;
    const userOrdersResponse = errorHelper(
      await context.$sylius.api.getUserOrders(apiState.getCustomerId())
    );

    return {
      results: userOrdersResponse,
      total: userOrdersResponse.length,
    };
  },
};

export const useUserOrder = useUserOrderFactory<
  OrdersResponse,
  OrderSearchParams
>(params);
