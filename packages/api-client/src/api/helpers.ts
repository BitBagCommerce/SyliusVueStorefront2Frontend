import { Context, CustomQuery } from '@vue-storefront/core';
import { TypedDocumentNode } from '@apollo/client/core';
import { Exact } from 'api-client/__generated__/graphql';

type QueryVariables = Record<string, any>

type ExtendQuery<TQuery extends TypedDocumentNode, TVariables> = {
  query: TQuery;
  variables: TVariables;
};

export const extendQuery = <TQuery extends TypedDocumentNode, TVariables extends QueryVariables>(
  context: Context,
  query: TQuery,
  variables: TVariables,
  customQuery?: CustomQuery
): ExtendQuery<TQuery, TVariables> => {
  const { queryGql } = context.extendQuery(
    customQuery,
    {
      queryGql: { query, variables }
    }
  );

  return queryGql;
};

export const query = async <TData, TVariables extends QueryVariables>(
  context: Context,
  query: TypedDocumentNode<TData, Exact<TVariables>>,
  variables: TVariables
): Promise<TData> => {
  const { data } = await context.client.query({ query, variables });

  return data;
};

export const mutate = async <TData, TVariables extends QueryVariables>(
  context: Context,
  mutation: ExtendQuery<TypedDocumentNode<TData, Exact<TVariables>>, TVariables>
): Promise<TData> => {
  const { data } = await context.client.mutate({
    mutation: mutation.query,
    variables: mutation.variables,
    fetchPolicy: 'no-cache'
  });

  return data;
};

export const transformCartItems = (context, items) => {
  const { imagePaths: { thumbnail } } = context.config;
  return items.edges.map(edge => {
    const orderItem = edge.node;
    orderItem.variant.optionValues = orderItem.variant.optionValues.edges.map(edge => edge.node);
    orderItem.variant.product.options = orderItem.variant.product.options.edges.map(edge => edge.node);
    orderItem.variant.product.images = orderItem.variant.product.images.collection.map(
      image => `${thumbnail}/${image.path}`
    );
    return orderItem;
  });
};

export const transformCart = (context, cart) => {
  cart.items = transformCartItems(context, cart.items);
  cart.shipments = cart.shipments.edges.length
    ? cart.shipments.edges[0].node
    : [];
  cart.payments = cart.payments.edges.length
    ? cart.payments.edges[0].node
    : [];
  return cart;
};
