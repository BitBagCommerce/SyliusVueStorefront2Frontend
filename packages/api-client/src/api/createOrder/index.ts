import defaultMutation from './mutations';
import { CustomQuery } from '@vue-storefront/core';
import { extendQuery, mutate } from '../helpers';

const createOrder = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, defaultMutation, defaultVariables, customQuery);
  const { shop_completeOrder } = await mutate(context, queryGql);

  return shop_completeOrder.order;
};

export default createOrder;
