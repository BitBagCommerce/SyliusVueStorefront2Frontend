import { CustomQuery } from '@vue-storefront/core';
import { mutate, query, extendQuery, transformWishlists } from '../helpers';
import { getWishlistsQuery } from './queries';
import {
  addItemToWishlistMutation,
  removeItemFromWishlistMutation,
  clearWishlistMutation,
  createWishlistMutation,
  editWishlistMutation,
  removeWishlistMutation,
} from './mutations';

const channelCode = process.env.SYLIUS_CHANNEL_CODE;

export const getWishlists = async (context, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, getWishlistsQuery, {}, customQuery);
  const data = await query(context, queryGql.query, { channelCode });
  const {
    imagePaths: { thumbnail },
  } = context.config;

  return { wishlists: data.wishlists.collection, imagePath: thumbnail };
};

export const addItem = async (
  context,
  itemId: string,
  wishlistId: string,
  customQuery?: CustomQuery
) => {
  const variables = {
    id: wishlistId,
    productVariant: itemId,
    channelCode,
  };
  const queryGql = extendQuery(
    context,
    addItemToWishlistMutation,
    variables,
    customQuery
  );
  const { add_itemWishlist } = await mutate(context, queryGql);

  return transformWishlists(context, add_itemWishlist.wishlist);
};

export const removeItem = async (
  context,
  itemId: string,
  wishlistId: string,
  customQuery?: CustomQuery
) => {
  const variables = {
    id: wishlistId,
    productVariant: itemId,
    channelCode,
  };
  const queryGql = extendQuery(
    context,
    removeItemFromWishlistMutation,
    variables,
    customQuery
  );
  const { remove_itemWishlist } = await mutate(context, queryGql);

  return transformWishlists(context, remove_itemWishlist.wishlist);
};

export const clearWishlist = async (
  context,
  wishlistId: string,
  customQuery?: CustomQuery
) => {
  const variables = {
    id: wishlistId,
    channelCode,
  };
  const queryGql = extendQuery(
    context,
    clearWishlistMutation,
    variables,
    customQuery
  );
  const { clearWishlist } = await mutate(context, queryGql);

  return transformWishlists(context, clearWishlist.wishlist);
};

export const createWishlist = async (
  context,
  wishlistName: string,
  customQuery?: CustomQuery
) => {
  const variables = {
    name: wishlistName,
    channelCode,
  };
  const queryGql = extendQuery(
    context,
    createWishlistMutation,
    variables,
    customQuery
  );
  const { createWishlist } = await mutate(context, queryGql);

  return transformWishlists(context, createWishlist.wishlist);
};

export const editWishlist = async (
  context,
  wishlistId: string,
  wishlistName: string,
  customQuery?: CustomQuery
) => {
  const variables = {
    id: wishlistId,
    name: wishlistName,
    channelCode,
  };
  const queryGql = extendQuery(
    context,
    editWishlistMutation,
    variables,
    customQuery
  );
  const { updateWishlist } = await mutate(context, queryGql);

  return transformWishlists(context, updateWishlist.wishlist);
};

export const removeWishlist = async (
  context,
  wishlistId: string,
  customQuery?: CustomQuery
) => {
  const variables = {
    id: wishlistId,
  };
  const queryGql = extendQuery(
    context,
    removeWishlistMutation,
    variables,
    customQuery
  );
  const { deleteWishlist } = await mutate(context, queryGql);

  return transformWishlists(context, deleteWishlist.wishlist);
};
