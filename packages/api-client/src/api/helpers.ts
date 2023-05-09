import { Context, CustomQuery } from '@vue-storefront/core';
import { TypedDocumentNode } from '@apollo/client/core';
import { Exact, GetCartQuery } from 'api-client/__generated__/graphql';

type QueryVariables = Record<string, any>

type ExtendQuery<TQuery extends TypedDocumentNode, TVariables> = {
  query: TQuery;
  variables: TVariables;
};

export type VariablesHelper<TDocument> = TDocument extends TypedDocumentNode<any, Exact<infer TVariables>> ? TVariables : never

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

export const transformCartItems = (context: Context, items: GetCartQuery['order']['items']) => {
  const { imagePaths: { thumbnail } } = context.config;

  return items.edges.map(edge => ({
    ...edge.node,
    variant: {
      ...edge.node.variant,
      optionValues: edge.node.variant.optionValues.edges.map(edge => edge.node),
      product: {
        options: edge.node.variant.product.options.edges.map(edge => edge.node),
        images: edge.node.variant.product.images.collection.map(
          image => `${thumbnail}/${image.path}`
        )
      }
    }
  }));
};

export const transformCart = (context: Context, cart: GetCartQuery['order']) => ({
  ...cart,
  items: transformCartItems(context, cart.items),
  shipments: cart.shipments.edges.length
    ? cart.shipments.edges[0].node
    : [],
  payments: cart.payments.edges.length
    ? cart.payments.edges[0].node
    : []
});
