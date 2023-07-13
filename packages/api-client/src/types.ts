import { Context as _Context } from '@vue-storefront/core';
import ApolloClient, { ApolloClientOptions } from 'apollo-client';
import {
  FilterEqualTypeInput,
  FilterMatchTypeInput,
} from './api/getCategory/types';
import { transformCart, transformItems } from './api/helpers';
// we can approximate the final type of api by taking all the exports from `./api/index.ts`, and transforming the type of these exports accordingly
import type * as api from './api/index';

export type Extensions = {
  category: string;
  message: string;
};

export type Location = {
  line: number;
  column: number;
};

export type Trace = {
  file?: string;
  line?: number;
  call?: string;
  function?: string;
};

export type GraphQLError = {
  debugMessage: string;
  message: string;
  extensions: Extensions;
  locations: Location[];
  path: string[];
  trace: Trace[];
};

// error type returned/thrown by api functions
export type GraphQLErrors = { graphQLErrors: GraphQLError[] };

// generic type representing raw functions exported from api
type ApiFunction<TArgs extends unknown[], TReturn> = (
  context: _Context,
  ...args: TArgs
) => Promise<TReturn>;

// transformed api function without context parameter, this is a form in which api functions will be accessible inside of context
type ApiFunctionWithContext<TFunction> = TFunction extends ApiFunction<
  infer TArgs,
  infer TReturn
>
  ? (
      ...args: TArgs
    ) => Promise<(TReturn & { graphQLErrors: undefined }) | GraphQLErrors>
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
};

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

export type ChannelPricing = {
  id?: string;
  price: number;
  originalPrice?: number;
  channelCode?: string;
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
  id: string;
  name: string;
  slug: string;
  items: Category[];
  level: number;
  parent: {
    id: string;
  };
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
    channelPricings: ChannelPricing[];
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
  provinceName?: string;
  postcode: string;
  phoneNumber?: string;
};

export type CartItem = ReturnType<typeof transformItems>[number];

export type Coupon = TODO;

export type Facet = TODO;

export type FacetSearchCriteria = TODO;

export type Order = TODO;

export type OrderItem = TODO;

export type PasswordResetResult = TODO;

export type ProductFilter = TODO;

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
  provinceName?: string;
  postcode: string;
  countryCode: string;
  phoneNumber?: string;
};

export type UserShippingAddressSearchCriteria = TODO;

export type ShippingAddress = TODO;

export type ShippingProvider = TODO;

export type WishlistItem = {
  _id: string;
  id: string;
  code: string;
  sku?: string;
  name?: string;
  productName: string;
  unitPrice: number;
  images: string[];
  variant: {
    id;
    code: string;
    product: {
      name: string;
      images: string[];
    };
    channelPricings: ChannelPricing[];
  };
  price?: {
    regular: number;
    special: number;
  };
  selectedVariant: {
    code: string;
    optionValues: ProductOptionValue[];
    product: {
      options: ProductOption[];
    };
  };
};

export type Wishlist = {
  id: string;
  name: string;
  items: WishlistItem[];
};
