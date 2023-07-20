import { computed, type Ref } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';
import type { Product, Wishlist, Context } from '@vue-storefront/sylius-api';
import { errorHelper, transformWishlists } from '../../helpers';
import { wishlistGetters } from '../../index';

export const useWishlists = () => {
  const context = useVSFContext() as Context;
  const {
    addItem: _addItem,
    removeItem: _removeItem,
    clearWishlist: _clearWishlist,
    createWishlist: _createWishlist,
    editWishlist: _editWishlist,
    removeWishlist: _removeWishlist,
  } = context.$sylius.api;
  const initError = {
    load: null,
    addItem: null,
    removeItem: null,
    clearWishlist: null,
    createWishlist: null,
    editWishlist: null,
    removeWishlist: null,
  };

  const wishlists = sharedRef(null, 'useWishlists') as Ref<
    ReturnType<typeof transformWishlists>
  >;
  const loading = sharedRef(false, 'useWishlists-loading') as Ref<boolean>;
  const error = sharedRef(initError, 'useWishlists-error') as Ref<
    typeof initError
  >;

  const handleError = (args: any, name: string) => {
    error.value[name] = args;
    Logger.error(`useWishlists/${name}`, args);
  };

  const update = async (
    name: string,
    fn?: (...args: any[]) => Promise<any>,
    ...args: any[]
  ) => {
    try {
      loading.value = true;

      if (fn) errorHelper(await fn(...args));

      const response = errorHelper(await context.$sylius.api.getWishlists());
      const data = transformWishlists(response);

      wishlists.value = data;
      error.value[name] = null;
    } catch (e) {
      handleError(e, name);
    } finally {
      loading.value = false;
    }
  };

  const load = async () => {
    await update('load');
  };

  const addItem = async (itemId: string, wishlistId: string) => {
    await update('addItem', _addItem, itemId, wishlistId);
  };

  const removeItem = async (itemId: string, wishlistId: string) => {
    await update('removeItem', _removeItem, itemId, wishlistId);
  };

  const clearWishlist = async (wishlistId: string) => {
    await update('clearWishlist', _clearWishlist, wishlistId);
  };

  const createWishlist = async (wishlistName: string) => {
    await update('createWishlist', _createWishlist, wishlistName);
  };

  const editWishlist = async (wishlistId: string, wishlistName: string) => {
    await update('editWishlist', _editWishlist, wishlistId, wishlistName);
  };

  const removeWishlist = async (wishlistId: string) => {
    await update('removeWishlist', _removeWishlist, wishlistId);
  };

  const isInWishlist = (product: Product, wishlist: Wishlist) => {
    const items = wishlistGetters.getItems(wishlist);
    const result = items.some(
      (item) => item.selectedVariant.code === product.selectedVariant.code
    );

    return result;
  };

  return {
    wishlists: computed(() => wishlists.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    load,
    addItem,
    removeItem,
    clearWishlist,
    createWishlist,
    editWishlist,
    removeWishlist,
    isInWishlist,
  };
};
