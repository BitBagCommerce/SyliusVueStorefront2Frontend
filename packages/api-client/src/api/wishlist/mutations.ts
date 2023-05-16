import gql from 'graphql-tag';
import { wishlistFragment } from '../fragments/wishlist';

export const addItemToWishlistMutation = gql`
  mutation addItemToWishlist(
    $id: String!,
    $productVariant: String!
  ) {
    add_itemWishlist(input: {
      id: $id,
      productVariant: $productVariant
    }) {
      wishlist {
        ${wishlistFragment}
      }
    }
  }
`;

export const removeItemFromWishlistMutation = gql`
  mutation removeItemFromWishlist(
    $id: String!,
    $productVariant: String!
  ) {
    remove_itemWishlist(input: {
      id: $id,
      productVariant: $productVariant
    }) {
      wishlist {
        ${wishlistFragment}
      }
    }
  }
`;

export const clearWishlistMutation = gql`
  mutation clearWishlist(
    $id: ID!
  ) {
    clearWishlist(input: {
      id: $id
    }) {
      wishlist {
        ${wishlistFragment}
      }
    }
  }
`;

export const createWishlistMutation = gql`
  mutation createWishlist(
    $name: String!
    $channelCode: String!
  ) {
    createWishlist(input: {
      name: $name,
      channelCode: $channelCode
    }) {
      wishlist {
        ${wishlistFragment}
      }
    }
  }
`;

export const editWishlistMutation = gql`
  mutation editWishlist(
    $id: ID!,
    $name: String!
  ) {
    updateWishlist(input: {
      id: $id,
      name: $name
    }) {
      wishlist {
        ${wishlistFragment}
      }
    }
  }
`;

export const removeWishlistMutation = gql`
  mutation removeWishlist($id: ID!) {
    deleteWishlist(input: { id: $id }) {
      wishlist {
        id
      }
    }
  }
`;
