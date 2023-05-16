import {
  useReviewFactory,
  UseReviewFactoryParams
} from '@vue-storefront/core';
import type {
  Context,
  Review
} from '@vue-storefront/sylius-api';
import {
  UseReviewAddParams,
  UseReviewSearchParams
} from 'composables/src/types';

const params: UseReviewFactoryParams<Review, UseReviewSearchParams, UseReviewAddParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params) => {
    return await context.$sylius.api.getReviews({
      productId: parseInt(params.productId)
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context: Context, review) => {
    const productId = review.productId;
    delete review.productId;
    const apiState = context.$sylius.config.state;
    review.author = apiState.getCustomerId();
    await context.$sylius.api.addReview({ review });

    return context.$sylius.api.getReviews({productId: productId});
  }
};

export const useReview = useReviewFactory<Review, UseReviewSearchParams, any>(params);
