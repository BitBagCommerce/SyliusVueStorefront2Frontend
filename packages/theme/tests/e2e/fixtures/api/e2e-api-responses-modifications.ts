import { products } from '../test-data/e2e-products';

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
  addProduct(cart, quantity = 1, productDefaultId = 0) {
    const newProduct = products.t_shirts[productDefaultId];
    newProduct.quantity = quantity;
    cart.items.push(newProduct);

    if (!cart.payments.length) {
      cart.payments = paymentsDefault;
    }
    if (!cart.shipments.length) {
      cart.shipments = shipmentsDefault;
    }
    cart = recalculatePrices(cart);
    return cart;
  },
  setCouponCode(cart, promotionCoupon) {
    cart.promotionCoupon = promotionCoupon;
    return cart;
  },
};

export { getCartModifications };
