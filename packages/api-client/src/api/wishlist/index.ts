import { CustomQuery } from '@vue-storefront/core';
import { mutate, query, extendQuery, transformWishlists } from '../helpers';
import { getWishlistsQuery } from './queries';
import {
  addItemToWishlistMutation,
  removeItemFromWishlistMutation,
  clearWishlistMutation,
  createWishlistMutation,
  editWishlistMutation,
  removeWishlistMutation
} from './mutations';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlists = async (context, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, getWishlistsQuery, {}, customQuery);
  const data = await query(context, queryGql.query, {});

  return data?.wishlists ? transformWishlists(context, data.wishlists.collection) : {};
};

export const addItem = async (context, itemId: string, wishlistId: string, customQuery?: CustomQuery) => {
  const variables = {
    id: wishlistId,
    variantId: itemId
  };
  const queryGql = extendQuery(context, addItemToWishlistMutation, variables, customQuery);
  const { shop_add_itemToWishlist } = await mutate(context, queryGql);

  return shop_add_itemToWishlist?.wishlists ? transformWishlists(context, shop_add_itemToWishlist.wishlists.collection) : {};
};

export const removeItem = async (context, itemId: string, wishlistId: string, customQuery?: CustomQuery) => {
  const variables = {
    id: wishlistId,
    variantId: itemId
  };
  const queryGql = extendQuery(context, removeItemFromWishlistMutation, variables, customQuery);
  const { shop_remove_itemFromWishlist } = await mutate(context, queryGql);

  return shop_remove_itemFromWishlist.wishlists ? transformWishlists(context, shop_remove_itemFromWishlist.wishlists.collection) : {};
};

export const clearWishlist = async (context, wishlistId: string, customQuery?: CustomQuery) => {
  const variables = {
    id: wishlistId
  };
  const queryGql = extendQuery(context, clearWishlistMutation, variables, customQuery);
  const { shop_clear_wishlist } = await mutate(context, queryGql);

  return shop_clear_wishlist?.wishlists ? transformWishlists(context, shop_clear_wishlist.wishlists.collection) : {};
};

export const createWishlist = async (context, wishlistName: string, customQuery?: CustomQuery) => {
  const variables = {
    name: wishlistName
  };
  const queryGql = extendQuery(context, createWishlistMutation, variables, customQuery);
  const { shop_create_wishlist } = await mutate(context, queryGql);

  return shop_create_wishlist?.wishlists ? transformWishlists(context, shop_create_wishlist.wishlists.collection) : {};
};

export const editWishlist = async (context, wishlistId: string, wishlistName: string, customQuery?: CustomQuery) => {
  const variables = {
    id: wishlistId,
    name: wishlistName
  };
  const queryGql = extendQuery(context, editWishlistMutation, variables, customQuery);
  const { shop_edit_wishlist } = await mutate(context, queryGql);

  return shop_edit_wishlist?.wishlists ? transformWishlists(context, shop_edit_wishlist.wishlists.collection) : {};
};

export const removeWishlist = async (context, wishlistId: string, customQuery?: CustomQuery) => {
  const variables = {
    id: wishlistId
  };
  const queryGql = extendQuery(context, removeWishlistMutation, variables, customQuery);
  const { shop_remove_wishlist } = await mutate(context, queryGql);

  return shop_remove_wishlist?.wishlists ? transformWishlists(context, shop_remove_wishlist.wishlists.collection) : {};
};
