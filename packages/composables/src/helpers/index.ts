import { ComposableError, ExcludeError } from '../types';
import type { GraphQLErrors, Context } from '@vue-storefront/sylius-api';

/**
 * Function for handling errors on GraphQL responses. If GraphQL response doesn't have any errors it returns your response without error type on it, but if it has errors it throws a formatted error. Only use inside of composables.
 * @param {Object | { graphQLErrors: GraphQLError[] }} response GraphQL response which may contain errors.
 * @param {string} [customMessage] Optional message overwrite for final error object.
 * @returns {Object} GraphQL response without error type on it.
 * @throws {ComposableError} Error which is supposed to be thrown inside of composable.
 * @example
 * // Function inside of a composable
 * load = async (context, { customerId }) => {
 *   // Assigning value of response to a const for later use in case when response doesn't throw any errors
 *   const response = errorHelper(
 *     await context.$sylius.api.getUser(customerId),
 *     // Custom message
 *     "Couldn't load user"
 *   );
 *
 *   return response;
 * }
 */
export const errorHelper = <
  TResponse extends Record<any, unknown> | GraphQLErrors
>(
  response: TResponse,
  customMessage?: string
): ExcludeError<TResponse> => {
  if (response && typeof response === 'object' && 'graphQLErrors' in response)
    throw {
      message: customMessage ?? response.graphQLErrors[0]?.extensions.message,
      details: response.graphQLErrors,
    } as ComposableError;

  return response as any;
};

type wishlistResponse = ExcludeError<
  Awaited<ReturnType<Context['$sylius']['api']['getWishlists']>>
>;

export const transformWishlists = (wishlistResponse: wishlistResponse) =>
  wishlistResponse.wishlists.map((wishlist) => ({
    id: wishlist.id,
    name: wishlist.name,
    itemCount: wishlist.wishlistProducts.totalCount,
    items: wishlist.wishlistProducts.edges.map(({ node }) => ({
      ...node,
      variant: {
        ...node.variant,
        optionValues: node.variant.optionValues.edges.map((edge) => edge.node),
        channelPricings: node.variant.channelPricings?.collection,
        product: {
          ...node.variant.product,
          options: node.variant.product.options.edges.map((edge) => edge.node),
          images: node.variant.product.images.collection.map(
            (image) => `${wishlistResponse.imagePath}/${image.path}`
          ),
        },
      },
    })),
  }));
