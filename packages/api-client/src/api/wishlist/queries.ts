import gql from 'graphql-tag';
import { wishlistFragment } from '../fragments/wishlist';

export const getWishlistsQuery = gql`
  query getWishlist($wishlistId: ID!) {
    wishlists(id: $wishlistId) {
      ${wishlistFragment}
    }
  }
`;
