import { Context as _Context } from '@vue-storefront/core';
import ApolloClient, { ApolloClientOptions } from 'apollo-client';
import { FilterEqualTypeInput, FilterMatchTypeInput } from './api/getCategory/types';
import { transformCart, transformCartItems } from './api/helpers';
// we can approximate the final type of api by taking all the exports from `./api/index.ts`, and transforming the type of these exports accordingly
import type * as api from './api/index';

// generic type representing raw functions exported from api
type ApiFunction<TArgs extends unknown[], TReturn> = (context: _Context, ...args: TArgs) => Promise<TReturn>

// error type returned/thrown by api functions
// ? seams to cose some issues if used as return type of ApiFunctionWithContext, for it to work properly it may be required to overview our current error handling in this project
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GraphQlError = { graphQLErrors?: { debugMessage: string }[] };

// transformed api function without context parameter, this is a form in which api functions will be accessible inside of context
type ApiFunctionWithContext<TFunction> = TFunction extends ApiFunction<infer TArgs, infer TReturn>
  ? (...args: TArgs) => Promise<TReturn>
  : never;

// generic which will give us our final type of api object from passed api functions
type ApiDefinitions<TFunctions extends { [key: string]: unknown }> = {
  [TKey in keyof TFunctions]: ApiFunctionWithContext<TFunctions[TKey]>;
};

// final api type based on exports from api
export type Api = ApiDefinitions<typeof api>;

// approximated context type
// TODO: add types to other context properties if possible
export type Context = {
  $sylius: {
    api: Api;
    client;
    config;
  };
  [key: string]: any;
}

export type ProductAttributeFilterInput = {
  name: FilterMatchTypeInput;
  sku: FilterEqualTypeInput;
  url_key: FilterEqualTypeInput;
};

export type ProductInput = {
  itemsPerPage: number;
  page: number;
  slug: string;
  categorySlug: string;
  id?: string;
  search?: string;
  filter?: ProductAttributeFilterInput;
  orderBy?: any;
};

export type ProductOptionValue = {
  id: string;
  code: string;
  value: string;
  option: {
    id: string;
  };
};
export type ProductOption = {
  id: string;
  code: string;
  name: string;
  label: string;
  values: ProductOptionValue[];
};

export type ProductVariant = {
  id: string;
  enabled: boolean;
  price: number;
  code: string;
  quantity?: number;
  channelPricings: any[];
  optionValues: ProductOptionValue[];
};
export type Wishlist = Record<string, unknown>;
export type Product = {
  _id?: number;
  description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  slug: string;
  images: string[];
  options: ProductOption[];
  galleryImages: string[];
  price: {
    special: number;
    regular: number;
  };
  reviews: {
    paginationInfo: {
      totalCount: number;
    };
  };
  averageRating: number;
  selectedVariant: ProductVariant | null;
  variants: ProductVariant[];
};
export type Category = {
  id: number;
  name: string;
  slug: string;
  items: Category[];
};
export type CategoryFilter = Record<string, unknown>;
export type ShippingMethod = Record<string, unknown>;

export type CartLineItem = {
  _id: string;
  code: string;
  sku?: string;
  name?: string;
  productName: string;
  unitPrice: number;
  qty?: number;
  quantity: number;
  images: string[];
  variant: {
    code: string;
    product: {
      images: string[];
    };
  };
  price?: {
    regular: number;
    special: number;
  };
  selectedVariant: {
    optionValues: ProductOptionValue[];
    product: {
      options: ProductOption[];
    };
  };
};
export type Cart = ReturnType<typeof transformCart>;

export interface Storage {
  set: (name: string, value: any) => void;
  get: (name: string) => any;
  remove: (name: string) => any;
  removeAll: () => void;
}

export type ConfigState = {
  getCartId(): string;
  setCartId(id: string): void;
  getCustomerToken(): string;
  setCustomerToken(token: string): void;
  getCustomerRefreshToken(): string;
  setCustomerRefreshToken(token: string): void;
  getCustomerId(): string;
  setCustomerId(id: string): void;
  getStore(): string;
  setStore(id: string): void;
};

export interface ClientConfig {
  locale: string;
  api: string;
  customOptions?: ApolloClientOptions<any>;
  state: ConfigState;
  cookies: Record<string, string>;
  acceptLanguage: string[];
}

export interface Config<T = any> extends ClientConfig {
  client?: ApolloClient<T>;
  storage: Storage;
}

export type ClientInstance = ApolloClient<any>;

export type TODO = unknown;

export type Setttings = TODO;

export type Endpoints = TODO;

export type BillingAddress = {
  id: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  street: string;
  city: string;
  postcode: string;
  phoneNumber?: string;
  state?: string
};

export type CartItem = ReturnType<typeof transformCartItems>[number];

export type Coupon = TODO;

export type Facet = TODO;

export type FacetSearchCriteria = TODO;

export type Order = TODO;

export type OrderItem = TODO;

export type PasswordResetResult = TODO;

export type ProductFilter = TODO;

export type Review = Awaited<ReturnType<Context['$sylius']['api']['getReviews']>>;

export type ReviewItem = Review[number];

export type User = TODO;

export type UserBillingAddress = TODO;

export type UserBillingAddressItem = TODO;

export type UserBillingAddressSearchCriteria = TODO;

export type UserShippingAddress = TODO;

export type UserShippingAddressItem = TODO;

export type UserAddressItem = {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postcode: string;
  countryCode: string;
  phoneNumber?: string;
  state?: string;
};

export type UserShippingAddressSearchCriteria = TODO;

export type ShippingAddress = TODO;

export type ShippingProvider = TODO;

export type WishlistItem = TODO;

