import defaultMutation from './mutations';
import { Context, CustomQuery } from '@vue-storefront/core';
import { extendQuery, mutate, VariablesHelper } from '../helpers';

const createOrder = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof defaultMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(context, defaultMutation, defaultVariables, customQuery);
  const { shop_completeOrder } = await mutate(context, queryGql);

  return shop_completeOrder.order;
};

export default createOrder;
