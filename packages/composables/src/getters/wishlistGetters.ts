import {
  WishlistGetters,
  AgnosticAttribute,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import type { Wishlist, WishlistItem } from '@vue-storefront/sylius-api';

const getWishlist = (id: string, wishlists: Wishlist[]) => {
  const wishlist = wishlists.find(wishlist => wishlist.id === id) || {};

  return wishlist;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItems = (wishlist: Wishlist): WishlistItem[] => {
  const items = [];

  if (wishlist?.items) {
    wishlist.items.forEach((item) => {
      items.push({
        _id: item._id,
        _categoriesRef: [],
        name: item.productName,
        sku: item.variant.code,
        images: item.variant.product.images,
        price: {
          regular: item.unitPrice / 100,
          special: 0
        },
        selectedVariant: item.variant
      });
    });
  }

  return items;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotals(wishlist: Wishlist): AgnosticTotals {
  return {
    total: 10,
    subtotal: 10
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemName = (item: any): string => item.name;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemImage = (item: WishlistItem): string => item.images[0];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemPrice = (item: WishlistItem): AgnosticPrice => item.price;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemAttributes = (item: WishlistItem, filters?: string[]): Record<string, AgnosticAttribute | string> => {
  const attributes = {};
  item.selectedVariant.optionValues.forEach((optionValue) => {
    const selectedOption = item.selectedVariant.product.options.find(option => option.id === optionValue.option.id);
    if (selectedOption) {
      attributes[selectedOption.name] = optionValue.value;
    }
  });

  return attributes;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemSku = (item: WishlistItem): string => item.sku;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getTotalItems = (wishlist: Wishlist): number => wishlist.items.length;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

export const wishlistGetters: WishlistGetters<Wishlist, WishlistItem> = {
  getWishlist,
  getItems,
  getTotals,
  getItemName,
  getItemImage,
  getItemPrice,
  getItemAttributes,
  getItemSku,
  getTotalItems,
  getFormattedPrice
};
