import gql from 'graphql-tag';
import { wishlistFragment } from '../fragments/wishlist';

export const addItemToWishlistMutation = gql`
  mutation addItemToWishlist(
    $id: String!,
    $variantId: String!
  ) {
    shop_add_itemToWishlist(input: {
      id: $id,
      productVariant: $variantId
    }) {
      wishlists {
        ${wishlistFragment}
      }
    }
  }
`;

export const removeItemFromWishlistMutation = gql`
  mutation removeItemFromWishlist(
    $id: String!,
    $variantId: String!
  ) {
    shop_remove_itemFromWishlist(input: {
      id: $id,
      productVariant: $variantId
    }) {
      wishlists {
        ${wishlistFragment}
      }
    }
  }
`;

export const clearWishlistMutation = gql`
  mutation clearWishlist(
    $id: String!
  ) {
    shop_clear_wishlist(input: {
      id: $id,
    }) {
      wishlists {
        ${wishlistFragment}
      }
    }
  }
`;

export const createWishlistMutation = gql`
  mutation createWishlist(
    $name: String!
  ) {
    shop_create_wishlist(input: {
      name: $name
    }) {
      wishlists {
        ${wishlistFragment}
      }
    }
  }
`;

export const editWishlistMutation = gql`
  mutation editWishlist(
    $id: id!,
    $name: String!
  ) {
    shop_edit_wishlist(input: {
      id: $id,
      name: $name
    }) {
      wishlists {
        ${wishlistFragment}
      }
    }
  }
`;

export const removeWishlistMutation = gql`
  mutation removeWishlist(
    $id: id!
  ) {
    shop_remove_wishlist(input: {
      id: $id
    }) {
      wishlists {
        ${wishlistFragment}
      }
    }
  }
`;
