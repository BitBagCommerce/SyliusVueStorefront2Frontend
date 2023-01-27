import gql from 'graphql-tag';
import { wishlistFragment } from '../fragments/wishlist';

export const getWishlistsQuery = gql`
  query getWishlist {
    wishlists {
      collection {
        ${wishlistFragment}
      }
    }
  }
`;
