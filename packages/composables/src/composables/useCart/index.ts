import { computed, Ref } from '@nuxtjs/composition-api';
import {
  sharedRef,
  useVSFContext,
  Logger,
  CustomQuery,
} from '@vue-storefront/core';
import { Context, Product, Cart } from '@vue-storefront/sylius-api';

export const useCart = () => {
  const errorInit = {
    load: null,
    addItem: null,
    removeItem: null,
    updateItemQty: null,
    clear: null,
    applyCoupon: null,
    removeCoupon: null,
    isInCart: null,
  };
  const composableName = 'useCartFix';
  const context = useVSFContext() as Context;
  const cart = sharedRef(null, composableName) as Ref<Cart | null>;
  const loading = sharedRef(false, `${composableName}-loading`) as Ref<boolean>;
  const error = sharedRef(errorInit, `${composableName}-error`) as Ref<
    typeof errorInit
  >;

  const handleCall = async <TReturn, TUpdate extends boolean>(
    fn: () => Promise<TReturn>,
    name: string,
    update: TUpdate
  ): Promise<TUpdate extends true ? void : TReturn> => {
    try {
      loading.value = true;

      const data = await fn();

      if (update) {
        cart.value = data as Cart;
        error.value[name] = null;

        return;
      }

      return data as TUpdate extends true ? void : TReturn;
    } catch (e) {
      error.value[name] = e;

      Logger.error(`${composableName}/${name}`, e);
    } finally {
      loading.value = false;
    }
  };

  const load = () =>
    handleCall(
      async () => {
        const apiState = context.$sylius.config.state;
        let cartId = apiState.getCartId();

        const createCart = async (): Promise<string> => {
          const { cartToken } = await context.$sylius.api.createCart();
          apiState.setCartId(cartToken);
          return cartToken;
        };

        // create new cart object in the backend
        if (!cartId) cartId = await createCart();

        const cartResponse = await context.$sylius.api.getCart(cartId);

        // empty response means cart token is no longer valid
        if (cartResponse && Object.keys(cartResponse).length === 0) {
          cartId = await createCart();
          return await context.$sylius.api.getCart(cartId);
        }

        return cartResponse;
      },
      'load',
      true
    );

  const addItem = ({
    product,
    quantity,
    customQuery,
  }: {
    product: Product;
    quantity: number;
    customQuery: CustomQuery;
  }) =>
    handleCall(
      async () => {
        const apiState = context.$sylius.config.state;
        let cartId = apiState.getCartId();

        if (!cartId) {
          await load();
          cartId = apiState.getCartId();
        }

        const token = cartId.replace('/api/v2/shop/orders/', '');

        if (Array.isArray(product)) {
          const variants = product.map((prod) => ({
            productVariant:
              prod.selectedVariant.id ||
              `/api/v2/shop/orders/${prod.selectedVariant.code}`,
            quantity: prod.qty ?? prod.selectedVariant.quantity,
          }));
          const cart = await context.$sylius.api.addManyToCart(
            {
              variants,
              token,
            },
            customQuery
          );

          const errors = (cart as any)?.graphQLErrors;

          if (errors)
            throw {
              message: errors?.[0]?.debugMessage,
              ...errors,
            };

          return cart;
        }

        const variantId = product.selectedVariant.id;
        const cart = await context.$sylius.api.addToCart(
          {
            quantity,
            variantId,
            token,
          },
          customQuery
        );

        if ((cart as any).graphQLErrors?.length) {
          throw {
            message: (cart as any).graphQLErrors?.[0]?.debugMessage,
          };
        }

        return cart;
      },
      'addItem',
      true
    );

  const removeItem = ({
    product,
    customQuery,
  }: {
    product: Product;
    customQuery: CustomQuery;
  }) =>
    handleCall(
      async () => {
        const apiState = context.$sylius.config.state;
        const cartId = apiState.getCartId();
        const cart = await context.$sylius.api.removeFromCart(
          {
            cartId,
            itemId: String(product._id),
          },
          customQuery
        );

        return cart;
      },
      'removeItem',
      true
    );

  const updateItemQty = ({
    product,
    quantity,
    customQuery,
  }: {
    product: Product;
    quantity: number;
    customQuery: CustomQuery;
  }) =>
    handleCall(
      async () => {
        const apiState = context.$sylius.config.state;
        const cartId = apiState.getCartId();
        const cart = await context.$sylius.api.updateCartQuantity(
          {
            cartId,
            itemId: String(product._id),
            quantity,
          },
          customQuery
        );

        if ((cart as any).graphQLErrors?.length) {
          throw {
            message: (cart as any).graphQLErrors?.[0]?.debugMessage,
          };
        }

        return cart;
      },
      'updateItemQty',
      true
    );

  const clear = () =>
    handleCall(
      async () => {
        const apiState = context.$sylius.config.state;
        const cartId = apiState.getCartId();

        await context.$sylius.api.clearCart({ cartId });

        return context.$sylius.api.getCart(cartId);
      },
      'clear',
      true
    );

  const applyCoupon = ({
    couponCode,
    customQuery,
  }: {
    couponCode: string;
    customQuery: CustomQuery;
  }) =>
    handleCall(
      async () => {
        const apiState = context.$sylius.config.state;
        const orderTokenValue = apiState
          .getCartId()
          .replace('/api/v2/shop/orders/', '');
        const applyCouponResponse = await context.$sylius.api.addCouponToCart(
          {
            coupon: {
              orderTokenValue,
              couponCode,
            },
          },
          customQuery
        );

        if ((applyCouponResponse as any).graphQLErrors?.length) {
          throw {
            message: (applyCouponResponse as any).graphQLErrors?.[0]
              ?.debugMessage,
          };
        }

        return applyCouponResponse;
      },
      'applyCoupon',
      true
    );

  const removeCoupon = ({
    couponCode,
    customQuery,
  }: {
    couponCode: string;
    customQuery: CustomQuery;
  }) =>
    handleCall(
      async () => {
        const apiState = context.$sylius.config.state;
        const orderTokenValue = apiState
          .getCartId()
          .replace('/api/v2/shop/orders/', '');
        const removeCouponResponse =
          await context.$sylius.api.removeCouponFromCart(
            {
              removeCouponInput: {
                orderTokenValue,
                couponCode,
              },
            },
            customQuery
          );

        return removeCouponResponse;
      },
      'removeCoupon',
      true
    );

  const isInCart = ({ product }: { product: Product }) => {
    if (Array.isArray(product)) return;

    if (cart.value?.items)
      return cart.value.items.some(
        (item) => product.selectedVariant.code === item.variant.code
      );

    return false;
  };

  const setCart = (newCart: Cart) => {
    cart.value = newCart;
  };

  return {
    cart: computed(() => cart.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    load,
    addItem,
    removeItem,
    updateItemQty,
    clear,
    applyCoupon,
    removeCoupon,
    isInCart,
    setCart,
  };
};
