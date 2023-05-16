import { addressFragment } from './address';

const gatewayFragment = `
  edges {
    node {
      id
      _id
      method {
        code
      }
    }
  }
`;

export const cartFragment = `
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
    ${addressFragment}
  }
  billingAddress {
    ${addressFragment}
  }
  shipments {
    ${gatewayFragment}
  }
  payments {
    ${gatewayFragment}
  }
  items {
    totalCount
    edges {
      node {
        _id
        variant {
          id
          code
          onHand
          onHold
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
`;
