import { ProductsSearchParams } from '@vue-storefront/core';
import type { Context } from '@vue-storefront/sylius-api';

export { UseCategory, UseProduct } from '@vue-storefront/core';

export type Address = {
  email: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  street: string;
  city: string;
  postcode: string;
  phoneNumber: string;
};

export type Category = Awaited<
  ReturnType<Context['$sylius']['api']['getCategory']>
>[number];

export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type UserAddress = Record<string, unknown>;
export type CartItem = Record<string, unknown>;

export type Cart = {
  totals: number;
  items: CartItem[];
};

export type Coupon = Record<string, unknown>;

export type Product = Record<string, unknown>;

export type Review = Record<string, unknown>;

export type Shipping = Record<string, unknown>;

export type ShippingMethod = Record<string, unknown>;

export type WishlistProduct = Record<string, unknown>;

export type Wishlist = {
  id: string;
  name: string;
  items: any[];
};

export type Wishlists = Wishlist[];

export type ProductsResponse = Awaited<
  ReturnType<Context['$sylius']['api']['getProduct']>
>;

export type OrderSearchParams = Record<string, any>;

export type OrdersResponse = {
  results: Awaited<ReturnType<Context['$sylius']['api']['getUserOrders']>>;
  total: number;
};

export type Order = OrdersResponse['results'][number];

export type OrderItem = Order['items'][number];

export type TODO = any;

export type UseBillingAddParams = TODO;

export type UseCategorySearchParams = TODO;

export type UseFacetSearchParams = TODO;

export type UseProductSearchParams = ProductsSearchParams;

export type UseReviewSearchParams = {
  productId?: string;
};

export type UseReviewAddParams = {
  author: string;
  clientMutationId?: string;
  comment: string;
  rating: number;
  productId?: number;
  reviewSubject: string;
  title: string;
};

export type UseShippingAddParams = TODO;

export type UseUserUpdateParams = {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  birthday?: string;
  phoneNumber?: string;
  subscribedToNewsletter?: boolean;
};

export type UseUserRegisterParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type useUserOrderSearchParams = TODO;

export type useUserShippingAddress = Awaited<
  ReturnType<Context['$sylius']['api']['getUserAddresses']>
>;
export type useUserShippingAddressItem = {
  city?: string;
  clientMutationId?: string;
  company?: string;
  countryCode?: string;
  firstName?: string;
  id: string;
  lastName?: string;
  phoneNumber?: string;
  postcode?: string;
  provinceName?: string;
  street?: string;
};
