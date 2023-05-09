import { getReviewsQuery } from './queries';
import { addReviewMutation } from './mutations';
import { mutate, query, extendQuery, VariablesHelper } from '../helpers';
import { Context, CustomQuery } from '@vue-storefront/core';

export const getReviews = async (context: Context, params: VariablesHelper<typeof getReviewsQuery>) => {
  const { productReviews } = await query(context, getReviewsQuery, params);

  return productReviews.collection;
};

export const addReview = async (
  context: Context,
  defaultVariables: VariablesHelper<typeof addReviewMutation>,
  customQuery?: CustomQuery
) => {
  const queryGql = extendQuery(context, addReviewMutation, defaultVariables, customQuery);
  await mutate(context, queryGql);

  return {};
};
