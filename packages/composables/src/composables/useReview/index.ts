import { useReviewFactory, UseReviewFactoryParams } from '@vue-storefront/core';
import type { Context } from '@vue-storefront/sylius-api';
import { errorHelper } from '../../helpers';
import { UseReviewAddParams, UseReviewSearchParams, Review } from '../../types';

const params: UseReviewFactoryParams<
  Review,
  UseReviewSearchParams,
  UseReviewAddParams
> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params) => {
    const response = errorHelper(
      await context.$sylius.api.getReviews({
        productId: parseInt(params.productId),
      })
    );

    return response;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context: Context, review) => {
    const productId = review.productId;
    delete review.productId;

    const apiState = context.$sylius.config.state;
    review.author = apiState.getCustomerId();
    await context.$sylius.api.addReview({ review });

    const response = errorHelper(
      await context.$sylius.api.getReviews({ productId: productId })
    );

    return response;
  },
};

export const useReview = useReviewFactory<Review, UseReviewSearchParams, any>(
  params
);
