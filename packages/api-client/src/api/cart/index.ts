import {
  applyCouponMutation,
  addBillingAddressMutation,
  addShippingAddressMutation,
  createCartMutation,
  addToCartMutation,
  clearCartMutation,
  removeFromCartMutation,
  removeCouponFromCartMutation,
  updateCartPaymentMutation,
  updateCartShippingMutation,
  updateCartQuantityMutation,
  addManyToCartMutation,
} from './mutations';
import {
  getCartQuery,
  getPaymentMethodsQuery,
  getShippingMethodsQuery,
  getCountriesQuery,
} from './queries';
import { CustomQuery, Context } from '@vue-storefront/core';
import {
  mutate,
  query,
  extendQuery,
  transformCart,
  VariablesHelper,
} from '../helpers';
import {
  AddBillingAddressMutation,
  AddShippingAddressMutation,
} from 'api-client/__generated__/graphql';

export const createCart = async (
  context: Context,
  customQuery?: CustomQuery
) => {
  const { locale } = context.config;
  const defaultVariables = { locale };

  const queryGql = extendQuery(
    context,
    createCartMutation,
    defaultVariables,
    customQuery
  );
  const { cart } = await mutate(context, queryGql);
  const cartToken = `/api/v2/shop/orders/${cart.order.tokenValue}`;

  return {
    cartToken,
  };
};

export const getCart = async (
  context: Context,
  cartId: string,
  customQuery?: CustomQuery
) => {
  const { locale, acceptLanguage } = context.config;
  const variables = {
    cartId,
    locale,
    acceptLanguage,
  };
  const queryGql = extendQuery(
    context,
    getCartQuery as any,
    variables,
    customQuery
  );
  const data: any = await query(context, queryGql.query, variables);

  return transformCart(context, data.order);
};

export const addToCart = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof addToCartMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(
    context,
    addToCartMutation as any,
    defaultVariables,
    customQuery
  );
  const { shop_add_itemOrder } = (await mutate(context, queryGql)) as any;

  return transformCart(context, shop_add_itemOrder.order);
};

export const addManyToCart = async (
  context,
  defaultVariables,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(
    context,
    addManyToCartMutation as any,
    defaultVariables,
    customQuery
  );
  const { shop_add_itemsOrder } = (await mutate(context, queryGql)) as any;

  return transformCart(context, shop_add_itemsOrder.order);
};

export const updateCartQuantity = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof updateCartQuantityMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(
    context,
    updateCartQuantityMutation as any,
    defaultVariables,
    customQuery
  );
  const { shop_change_quantityOrder } = (await mutate(
    context,
    queryGql
  )) as any;

  return transformCart(context, shop_change_quantityOrder.order);
};

export const removeFromCart = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof removeFromCartMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(
    context,
    removeFromCartMutation as any,
    defaultVariables,
    customQuery
  );
  const { shop_remove_itemOrder } = (await mutate(context, queryGql)) as any;

  return transformCart(context, shop_remove_itemOrder.order);
};

export const addCouponToCart = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof applyCouponMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(
    context,
    applyCouponMutation as any,
    defaultVariables,
    customQuery
  );
  const { shop_apply_couponOrder } = (await mutate(context, queryGql)) as any;

  return transformCart(context, shop_apply_couponOrder.order);
};

export const removeCouponFromCart = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof removeCouponFromCartMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(
    context,
    removeCouponFromCartMutation as any,
    defaultVariables,
    customQuery
  );
  const { shop_remove_couponOrder } = (await mutate(context, queryGql)) as any;

  return transformCart(context, shop_remove_couponOrder.order);
};

export const clearCart = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof clearCartMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(
    context,
    clearCartMutation,
    defaultVariables,
    customQuery
  );
  const { deleteOrder } = await mutate(context, queryGql);

  return deleteOrder.order;
};

// TODO: rewrite this function to work better with typescript
export const addAddress = async (
  context: Context,
  defaultVariables: {
    addAddressInput: {
      orderTokenValue?: string;
      email: string;
      billingAddress?: {
        firstName: string;
        lastName: string;
        countryCode: string;
        street: string;
        city: string;
        postcode: string;
        phoneNumber: string;
      };
      shippingAddress?: {
        firstName: string;
        lastName: string;
        countryCode: string;
        street: string;
        city: string;
        postcode: string;
        phoneNumber: string;
      };
    };
  },
  customQuery?: CustomQuery
): Promise<
  AddShippingAddressMutation['shop_add_shipping_addressOrder']['order'] &
    AddBillingAddressMutation['shop_add_billing_addressOrder']['order']
> => {
  if (defaultVariables.addAddressInput?.shippingAddress) {
    // TODO: remove any
    const queryGql = extendQuery(
      context,
      addShippingAddressMutation,
      defaultVariables as any,
      customQuery
    );
    const data = await mutate(context, queryGql);

    return data.shop_add_shipping_addressOrder.order;
  }

  // TODO: remove any
  const queryGql = extendQuery(
    context,
    addBillingAddressMutation,
    defaultVariables as any,
    customQuery
  );
  const data = await mutate(context, queryGql);

  return data.shop_add_billing_addressOrder.order;
};

export const updateCartPayment = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof updateCartPaymentMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(
    context,
    updateCartPaymentMutation as any,
    defaultVariables,
    customQuery
  );
  const { shop_select_payment_methodOrder } = (await mutate(
    context,
    queryGql
  )) as any;

  return transformCart(context, shop_select_payment_methodOrder.order);
};

export const updateCartShipping = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof updateCartShippingMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(
    context,
    updateCartShippingMutation as any,
    defaultVariables,
    customQuery
  );
  const { shop_select_shipping_methodOrder } = (await mutate(
    context,
    queryGql
  )) as any;

  return transformCart(context, shop_select_shipping_methodOrder.order);
};

export const getPaymentMethods = async (context: Context) => {
  const { locale } = context.config;
  const { paymentMethods } = await query(context, getPaymentMethodsQuery, {});

  return paymentMethods.collection.map((method) => {
    const translation = method.translations.collection.find(
      (translation) => translation.locale === locale
    );

    return {
      label: translation.name,
      value: method.code,
      description: translation.description,
    };
  });
};

export const getShippingMethods = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof getShippingMethodsQuery>
) => {
  const { locale } = context.config;
  const { shippingMethods } = await query(
    context,
    getShippingMethodsQuery,
    defaultVariables
  );

  return shippingMethods.collection.map((method) => {
    const translation = method.translations.collection.find(
      (translation) => translation.locale === locale
    );
    const channel = method.channels.collection[0].code;

    return {
      label: translation.name,
      value: method.code,
      description: translation.description,
      cost: method.configuration[channel].amount / 100,
    };
  });
};

export const getCountries = async (context: Context) => {
  const data = await query(context, getCountriesQuery, {});

  return data.countries.collection;
};
