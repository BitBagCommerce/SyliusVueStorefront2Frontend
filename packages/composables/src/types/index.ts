import { ProductsSearchParams } from '@vue-storefront/core';

export { UseCategory, UseProduct } from '@vue-storefront/core';

import {Context, CustomQuery, FactoryParams, PlatformApi, UseUser} from "@vue-storefront/core";

export type Address = Record<string, unknown>;

export type Category = Record<string, unknown>;

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

export type Order = Record<string, unknown>;

export type OrderItem = Record<string, unknown>;

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

export type ProductsResponse = {
  data: Product[];
  total: number;
};

export type OrderSearchParams = Record<string, any>;

export type OrdersResponse = {
  results: any[];
  total: number;
};

export type TODO = any;

export type UseBillingAddParams = TODO;

export type UseCategorySearchParams = TODO;

export type UseFacetSearchParams = TODO;

export type UseProductSearchParams = ProductsSearchParams;

export type UseReviewSearchParams = TODO;

export type UseReviewAddParams = TODO;

export type UseShippingAddParams = TODO;

export type UseUserUpdateParams = TODO;

export type UseUserRegisterParams = TODO;

export type useUserOrderSearchParams = TODO;

export interface UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params?: {
    customQuery: CustomQuery;
  }) => Promise<USER>;
  logOut: (context: Context, params?: {
    currentUser: USER;
  }) => Promise<void>;
  updateUser: (context: Context, params: {
    currentUser: USER;
    updatedUserData: UPDATE_USER_PARAMS;
    customQuery?: CustomQuery;
  }) => Promise<USER>;
  register: (context: Context, params: REGISTER_USER_PARAMS & {
    customQuery?: CustomQuery;
  }) => Promise<USER>;
  logIn: (context: Context, params: {
    username: string;
    password: string;
    rememberMe: boolean;
    customQuery?: CustomQuery;
  }) => Promise<USER>;
  changePassword: (context: Context, params: {
    currentUser: USER;
    currentPassword: string;
    newPassword: string;
    customQuery?: CustomQuery;
  }) => Promise<USER>;
}

export declare const useUserFactory: <USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS extends {
  email: string;
  password: string;
}, API extends PlatformApi = any>(factoryParams: UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS, API>) => () => UseUser<USER, UPDATE_USER_PARAMS, API>;
