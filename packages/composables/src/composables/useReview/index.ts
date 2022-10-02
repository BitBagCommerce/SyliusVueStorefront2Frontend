import {
  Context,
  useReviewFactory,
  UseReviewFactoryParams
} from '@vue-storefront/core';
import { Review } from '../../types';

const params: UseReviewFactoryParams<any, any, any> = {
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

export const useReview = useReviewFactory<Review, any, any>(params);
