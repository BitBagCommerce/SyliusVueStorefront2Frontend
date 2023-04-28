import { gql } from 'api-client/__generated__';

export const createCartMutation = gql(`
  mutation createCart(
    $locale: String
  ) {
    cart: shop_postOrder(input: {
      localeCode: $locale
    }) {
      order {
        tokenValue
      }
    }
  }
`);

export const addToCartMutation = gql(`
  mutation addToCart(
    $token: String!,
    $variantId: String!,
    $quantity: Int!
  ) {
    shop_add_itemOrder(input: {
      orderTokenValue: $token
      productVariant: $variantId
      quantity: $quantity
    }) {
      order {
        tokenValue
        localeCode
        total
        taxTotal
        shippingTotal
        orderPromotionTotal
        promotionCoupon {
          code
          promotion {
            name
            description
          }
        }
        shippingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        billingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        shipments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        payments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        items {
          totalCount
          edges {
            node {
              _id
              variant {
                code
                optionValues {
                  edges {
                    node {
                      option {
                        id
                      }
                      code
                      value
                    }
                  }
                }
                product {
                  images {
                    collection {
                      path
                    }
                  }
                  options {
                    edges {
                      node {
                        id
                        name
                        code
                      }
                    }
                  }
                }
              }
              unitPrice
              total
              productName
              variantName
              quantity
            }
          }
        }
      }
    }
  }
`);

export const removeFromCartMutation = gql(`
  mutation removeFromCart(
    $cartId: String!,
    $itemId: String!
  ) {
    shop_remove_itemOrder(input: {
      id: $cartId
      orderItemId: $itemId
    }) {
      order {
        tokenValue
        localeCode
        total
        taxTotal
        shippingTotal
        orderPromotionTotal
        promotionCoupon {
          code
          promotion {
            name
            description
          }
        }
        shippingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        billingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        shipments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        payments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        items {
          totalCount
          edges {
            node {
              _id
              variant {
                code
                optionValues {
                  edges {
                    node {
                      option {
                        id
                      }
                      code
                      value
                    }
                  }
                }
                product {
                  images {
                    collection {
                      path
                    }
                  }
                  options {
                    edges {
                      node {
                        id
                        name
                        code
                      }
                    }
                  }
                }
              }
              unitPrice
              total
              productName
              variantName
              quantity
            }
          }
        }
      }
    }
  }
`);

export const clearCartMutation = gql(`
  mutation deleteCart(
    $cartId: String!
  ) {
    deleteOrder(input: {
      id: $cartId
    }) {
      order {
        tokenValue
      }
    }
  }
`);

export const addShippingAddressMutation = gql(`
  mutation addShippingAddress(
    $addAddressInput: shop_add_shipping_addressOrderInput!
  ) {
    shop_add_shipping_addressOrder(
      input: $addAddressInput
    ) {
      order {
        shippingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
      }
    }
  }
`);

export const addBillingAddressMutation = gql(`
  mutation addBillingAddress(
    $addAddressInput: shop_add_billing_addressOrderInput!
  ) {
    shop_add_billing_addressOrder(
      input: $addAddressInput
    ) {
      order {
        billingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
      }
    }
  }
`);

export const applyCouponMutation = gql(`
  mutation addCouponToCart(
    $coupon: shop_apply_couponOrderInput!
  ) {
    shop_apply_couponOrder(
      input: $coupon
    ) {
      order {
        tokenValue
        localeCode
        total
        taxTotal
        shippingTotal
        orderPromotionTotal
        promotionCoupon {
          code
          promotion {
            name
            description
          }
        }
        shippingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        billingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        shipments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        payments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        items {
          totalCount
          edges {
            node {
              _id
              variant {
                code
                optionValues {
                  edges {
                    node {
                      option {
                        id
                      }
                      code
                      value
                    }
                  }
                }
                product {
                  images {
                    collection {
                      path
                    }
                  }
                  options {
                    edges {
                      node {
                        id
                        name
                        code
                      }
                    }
                  }
                }
              }
              unitPrice
              total
              productName
              variantName
              quantity
            }
          }
        }
      }
    }
  }
`);

export const removeCouponFromCartMutation = gql(`
  mutation removeCouponFromCart(
    $removeCouponInput: shop_remove_couponOrderInput!
  ) {
    shop_remove_couponOrder(
      input:$removeCouponInput
    ) {
      order {
        tokenValue
        localeCode
        total
        taxTotal
        shippingTotal
        orderPromotionTotal
        promotionCoupon {
          code
          promotion {
            name
            description
          }
        }
        shippingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        billingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        shipments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        payments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        items {
          totalCount
          edges {
            node {
              _id
              variant {
                code
                optionValues {
                  edges {
                    node {
                      option {
                        id
                      }
                      code
                      value
                    }
                  }
                }
                product {
                  images {
                    collection {
                      path
                    }
                  }
                  options {
                    edges {
                      node {
                        id
                        name
                        code
                      }
                    }
                  }
                }
              }
              unitPrice
              total
              productName
              variantName
              quantity
            }
          }
        }
      }
    }
  }
`);

export const updateCartQuantityMutation = gql(`
  mutation updateCartQuantity(
    $cartId: String!,
    $itemId: String!,
    $quantity: Int!
  ) {
    shop_change_quantityOrder(input: {
      id: $cartId
      orderItemId: $itemId
      quantity: $quantity
    }) {
      order {
        tokenValue
        localeCode
        total
        taxTotal
        shippingTotal
        orderPromotionTotal
        promotionCoupon {
          code
          promotion {
            name
            description
          }
        }
        shippingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        billingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        shipments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        payments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        items {
          totalCount
          edges {
            node {
              _id
              variant {
                code
                optionValues {
                  edges {
                    node {
                      option {
                        id
                      }
                      code
                      value
                    }
                  }
                }
                product {
                  images {
                    collection {
                      path
                    }
                  }
                  options {
                    edges {
                      node {
                        id
                        name
                        code
                      }
                    }
                  }
                }
              }
              unitPrice
              total
              productName
              variantName
              quantity
            }
          }
        }
      }
    }
  }
`);

export const updateCartPaymentMutation = gql(`
  mutation updateCartPayment(
    $paymentMethod: shop_select_payment_methodOrderInput!
  ) {
    shop_select_payment_methodOrder(
      input: $paymentMethod
    ) {
      order {
        tokenValue
        localeCode
        total
        taxTotal
        shippingTotal
        orderPromotionTotal
        promotionCoupon {
          code
          promotion {
            name
            description
          }
        }
        shippingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        billingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        shipments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        payments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        items {
          totalCount
          edges {
            node {
              _id
              variant {
                code
                optionValues {
                  edges {
                    node {
                      option {
                        id
                      }
                      code
                      value
                    }
                  }
                }
                product {
                  images {
                    collection {
                      path
                    }
                  }
                  options {
                    edges {
                      node {
                        id
                        name
                        code
                      }
                    }
                  }
                }
              }
              unitPrice
              total
              productName
              variantName
              quantity
            }
          }
        }
      }
    }
  }
`);

export const updateCartShippingMutation = gql(`
  mutation updateCartShipping(
    $shippingMethod: shop_select_shipping_methodOrderInput!
  ) {
    shop_select_shipping_methodOrder(
      input: $shippingMethod
    ) {
      order {
        tokenValue
        localeCode
        total
        taxTotal
        shippingTotal
        orderPromotionTotal
        promotionCoupon {
          code
          promotion {
            name
            description
          }
        }
        shippingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        billingAddress {
          id
          firstName
          lastName
          street
          city
          postcode
          state: provinceName
          countryCode
          phoneNumber
        }
        shipments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        payments {
          edges {
            node {
              id
              _id
              method {
                code
              }
            }
          }
        }
        items {
          totalCount
          edges {
            node {
              _id
              variant {
                code
                optionValues {
                  edges {
                    node {
                      option {
                        id
                      }
                      code
                      value
                    }
                  }
                }
                product {
                  images {
                    collection {
                      path
                    }
                  }
                  options {
                    edges {
                      node {
                        id
                        name
                        code
                      }
                    }
                  }
                }
              }
              unitPrice
              total
              productName
              variantName
              quantity
            }
          }
        }
      }
    }
  }
`);
