import { gql } from 'api-client/__generated__';

export const addReviewMutation = gql(`
  mutation addReview(
    $review: shop_createProductReviewInput!
  ) {
    shop_createProductReview(
      input: $review
    ) {
      clientMutationId
    }
  }
`);
