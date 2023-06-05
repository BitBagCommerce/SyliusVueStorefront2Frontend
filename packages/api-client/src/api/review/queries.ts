import { gql } from 'api-client/__generated__';

export const getReviewsQuery = gql(`
  query productReviews(
    $productId: Int,
    $userId: Int
  ) {
    productReviews(
      reviewSubject_id: $productId,
      author_id: $userId
      status: "accepted"
    ) {
      collection {
        id
        rating
        comment
        status
        author {
          id
          fullName
        }
        createdAt
      }
    }
  }
`);
