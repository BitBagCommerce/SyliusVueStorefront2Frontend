import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';
import { Product, Wishlist } from '@vue-storefront/sylius-api';
import { wishlistGetters } from '../../index';

export const useWishlists = () => {
  const context = useVSFContext();
  const wishlists = sharedRef(null, 'useWishlists');
  const loading = sharedRef(false, 'useWishlists-loading');
  const error = sharedRef({
    load: null,
    addItem: null,
    removeItem: null,
    clearWishlist: null,
    createWishlist: null,
    editWishlist: null,
    removeWishlist: null
  }, 'useWishlists-error');

  const handleError = (args: any, name: string) => {
    error.value[name] = args;
    Logger.error(`useWishlists/${name}`, args);
    wishlists.value = [];
  };

  const update = async (fn: () => Promise<any>, name: string) => {
    try {
      loading.value = true;
      await fn();

      const response = await context.$sylius.api.getWishlists();

      if (response?.graphQLErrors) {
        handleError(response, name);

        return;
      }

      wishlists.value = response;
      error.value[name] = null;
    } catch (e) {
      handleError(e, name);
    } finally {
      loading.value = false;
    }
  };

  const load = async () => {
    await update(async () => {
      const result = await context.$sylius.api.getWishlists();

      if (Array.isArray(result) && !result.length)
        await context.$sylius.api.createWishlist('Wishlist');
    }, 'load');
  };

  const addItem = async (itemId: string, wishlistId: string) => {
    await update(async () => await context.$sylius.api.addItem(itemId, wishlistId), 'addItem');
  };

  const removeItem = async (itemId: string, wishlistId: string) => {
    await update(async () => await context.$sylius.api.removeItem(itemId, wishlistId), 'removeItem');
  };

  const clearWishlist = async (wishlistId: string) => {
    await update(async () => await context.$sylius.api.clearWishlist(wishlistId), 'clearWishlist');
  };

  const createWishlist = async (wishlistName: string) => {
    await update(async () => await context.$sylius.api.createWishlist(wishlistName), 'createWishlist');
  };

  const editWishlist = async (wishlistId: string, wishlistName: string) => {
    await update(async () => await context.$sylius.api.editWishlist(wishlistId, wishlistName), 'editWishlist');
  };

  const removeWishlist = async (wishlistId: string) => {
    await update(async () => await context.$sylius.api.removeWishlist(wishlistId), 'removeWishlist');
  };

  const isInWishlist = (product: Product, wishlist: Wishlist) => {
    const items = wishlistGetters.getItems(wishlist);
    const result = items.some(item => item.selectedVariant.code === product.selectedVariant.code);

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
    isInWishlist
  };
};