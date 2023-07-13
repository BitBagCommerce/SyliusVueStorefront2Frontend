const productExample = {
  _id: 220,
  variant: {
    id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-0',
    code: 'Everyday_white_basic_T_Shirt-variant-0',
    onHand: 9,
    onHold: 0,
    tracked: false,
    optionValues: [
      {
        option: {
          id: '/api/v2/shop/product-options/t_shirt_size',
          __typename: 'ProductOption',
        },
        code: 't_shirt_size_s',
        value: 'S',
        __typename: 'ProductOptionValue',
      },
    ],
    product: {
      options: [
        {
          id: '/api/v2/shop/product-options/t_shirt_size',
          name: 'T-shirt size',
          code: 't_shirt_size',
          __typename: 'ProductOption',
        },
      ],
      images: [
        'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
      ],
    },
    channelPricings: [
      {
        channelCode: 'FASHION_WEB',
        price: 7564,
        originalPrice: null,
        __typename: 'ChannelPricing',
      },
    ],
    __typename: 'ProductVariant',
  },
  unitPrice: 7564,
  total: 7564,
  productName: 'Everyday white basic T-Shirt',
  variantName: 'S',
  quantity: 1,
  __typename: 'OrderItem',
};

const shipmentsDefault = {
  id: '/api/v2/shop/shipments/110',
  _id: 110,
  method: { code: 'ups', __typename: 'ShippingMethod' },
  __typename: 'Shipment',
};

const paymentsDefault = {
  id: '/api/v2/shop/payments/110',
  _id: 110,
  method: { code: 'cash_on_delivery', __typename: 'PaymentMethod' },
  __typename: 'Payment',
};

const recalculatePrices = (cart) => {
  cart.total = 0;
  cart.items.map((item) => {
    item.total = item.unitPrice * item.quantity;
    cart.total = cart.total + item.total;
  });
  return cart;
};

const getCartModifications = {
  setBillingAddress(cart, address) {
    cart.billingAddress = address;
    return cart;
  },
  setShippingAddress(cart, address) {
    cart.shippingAddress = address;
    return cart;
  },
  setQuantity(cart, itemId, quantity) {
    cart.items.map((item) => {
      if (item._id === itemId) {
        item.quantity = quantity;
      }
    });
    cart = recalculatePrices(cart);
    return cart;
  },
  setQuantityForAllItems(cart, quantity) {
    cart.items.map((item) => {
      item.quantity = quantity;
    });
    cart = recalculatePrices(cart);
    return cart;
  },
  addProduct(cart) {
    cart.items.push(productExample);
    if (!cart.payments) {
      cart.payments = paymentsDefault;
    }
    if (!cart.shipments) {
      cart.shipments = shipmentsDefault;
    }
    cart = recalculatePrices(cart);
    return cart;
  },
};

export { getCartModifications };
