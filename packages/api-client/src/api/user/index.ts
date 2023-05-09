import {
  loginMutation,
  refreshLoginTokenMutation,
  addAddressMutation,
  updateAddressMutation,
  updatePasswordMutation,
  updateProfileMutation,
  deleteAddressMutation,
  resetPasswordMutation,
  triggerResetPasswordMutation,
  registerMutation
} from './mutations';
import { getUserQuery, getUserAddressesQuery, getUserOrdersQuery } from './queries';
import { Context, CustomQuery } from '@vue-storefront/core';
import { mutate, query, extendQuery, VariablesHelper } from '../helpers';

export const getUser = async (context: Context, id: string) => {
  const { customer } = await query(context, getUserQuery, { id });

  return customer;
};

export const registerUser = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof registerMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(context, registerMutation, defaultVariables, customQuery);
  const { shop_registerUser } = await mutate(context, queryGql);

  return {
    email: shop_registerUser.user.email,
    username: shop_registerUser.user.username,
    ...shop_registerUser.user.customer
  };
};

export const loginUser = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof loginMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(context, loginMutation, defaultVariables, customQuery);
  const { shop_loginShopUserToken } = await mutate(context, queryGql);

  return shop_loginShopUserToken.shopUserToken;
};

export const refreshLoginUser = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof refreshLoginTokenMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(context, refreshLoginTokenMutation, defaultVariables, customQuery);
  const { shop_refreshShopUserToken } = await mutate(context, queryGql);

  return shop_refreshShopUserToken.shopUserToken;
};

export const getUserAddresses = async (context: Context) => {
  const { addresses } = await query(context, getUserAddressesQuery, {});

  return addresses.collection;
};

export const getUserOrders = async (context: Context, id: string) => {
  const { customer } = await query(context, getUserOrdersQuery, { id });
  const orders = customer.orders.edges.map((edge) => ({
    ...edge.node,
    items: edge.node.items.edges.map((e) => e.node)
  }));

  return orders;
};

export const addUserAddress = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof addAddressMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(context, addAddressMutation, defaultVariables, customQuery);
  const { shop_postAddress } = await mutate(context, queryGql);

  return shop_postAddress.address;
};

export const updateUserAddress = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof updateAddressMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(context, updateAddressMutation, defaultVariables, customQuery);
  const { shop_putAddress } = await mutate(context, queryGql);

  return shop_putAddress.address;
};

export const deleteUserAddress = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof deleteAddressMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(context, deleteAddressMutation, defaultVariables, customQuery);
  const { deleteAddress } = await mutate(context, queryGql);

  return deleteAddress.clientMutationId;
};

export const updateUserProfile = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof updateProfileMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(context, updateProfileMutation, defaultVariables, customQuery);
  const { shop_putCustomer } = await mutate(context, queryGql);

  return shop_putCustomer.customer;
};

export const updateUserPassword = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof updatePasswordMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(context, updatePasswordMutation, defaultVariables, customQuery);
  await mutate(context, queryGql);

  return {};
};

export const triggerResetUserPassword = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof triggerResetPasswordMutation>,
  customQuery?: CustomQuery
) => {
  defaultVariables.customerPassword.localeCode = context.config.locale;
  const queryGql = extendQuery(context, triggerResetPasswordMutation, defaultVariables, customQuery);
  await mutate(context, queryGql);

  return {};
};

export const resetUserPassword = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof resetPasswordMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(context, resetPasswordMutation, defaultVariables, customQuery);
  await mutate(context, queryGql);

  return {};
};
