import {
  CartGetters,
  AgnosticPrice,
  AgnosticTotals,
  AgnosticCoupon,
  AgnosticDiscount,
} from '@vue-storefront/core';
import { Cart, CartLineItem } from '@vue-storefront/sylius-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItems = (cart: Cart): CartLineItem[] => {
  const items = [];
  if (cart?.items) {
    cart.items.forEach((item) => {
      items.push({
        _id: item._id,
        _categoriesRef: [],
        name: item.productName,
        sku: item.variant.code,
        images: item.variant.product.images,
        price: {
          regular: item.variant.channelPricings[0].originalPrice,
          special: item.variant.channelPricings[0].price,
        },
        selectedVariant: item.variant,
        qty: item.quantity,
      });
    });
  }

  return items;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemName = (product: CartLineItem): string => product.name;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemImage = (product: CartLineItem): string =>
  product.images[0].replace(/\/media\/image/, '') || '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemPrice = (product: CartLineItem): AgnosticPrice => {
  const { special = 0, regular = 0 } = product?.price || {};

  return {
    regular: regular ? regular / 100 : special / 100,
    special: regular && regular !== special ? special / 100 : 0,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemQty = (product: CartLineItem): number => product.qty;

export const getCartItemAttributes = (
  product: CartLineItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterByAttributeName?: Array<string>
) => {
  const attributes = {};
  product.selectedVariant.optionValues.forEach((optionValue) => {
    const selectedOption = product.selectedVariant.product.options.find(
      (option) => option.id === optionValue.option.id
    );
    if (selectedOption) {
      attributes[selectedOption.name] = optionValue.value;
    }
  });

  return attributes;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemSku = (product: CartLineItem): string => product.sku;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotals = (cart: Cart): AgnosticTotals => {
  if (cart) {
    const {
      total: cartTotal,
      orderPromotionTotal,
      shippingTotal,
      shippingAddress,
    } = cart;

    const subtotal = (cartTotal - orderPromotionTotal - shippingTotal) / 100;
    const total = shippingAddress
      ? cartTotal / 100
      : (cartTotal - shippingTotal) / 100;

    return {
      shipping: shippingAddress ? shippingTotal / 100 : 0,
      special: subtotal,
      total,
      subtotal,
    };
  }

  return {
    shipping: 0,
    total: 0,
    special: 0,
    subtotal: 0,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: Cart): number =>
  cart?.shippingTotal ? cart.shippingTotal / 100 : 0;

export const getCartTokenValue = (cart: any): number => cart?.tokenValue;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotalItems = (cart: Cart): number => {
  if (cart?.items) {
    return cart.items.reduce((prev, curr) => prev + curr.quantity, 0);
  }

  return 0;
};

export const getFormattedPrice = (price: number) => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDiscounts = (cart: Cart): AgnosticDiscount[] => {
  if (cart?.promotionCoupon) {
    const promotion = {
      id: cart.promotionCoupon.code,
      name: cart.promotionCoupon.promotion.name,
      code: cart.promotionCoupon.code,
      value: Math.abs(cart.orderPromotionTotal) / 100,
      description: cart.promotionCoupon.promotion.description,
    };

    return [promotion];
  }

  return [];
};

export const cartGetters: CartGetters<Cart, CartLineItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getCoupons,
  getDiscounts,
  getCartTokenValue,
};
