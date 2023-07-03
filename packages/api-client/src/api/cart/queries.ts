import { gql } from 'api-client/__generated__';

export const getCartQuery = gql(`
  query getCart($cartId: ID!, $channelCode: String!) {
    order(id: $cartId) {
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
        provinceName
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
        provinceName
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
              id
              code
              onHand
              onHold
              tracked
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
              channelPricings(channelCode: $channelCode) {
                collection {
                  channelCode
                  price
                  originalPrice
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
`);

export const getShippingMethodsQuery = gql(`
  query getShippingMethods(
    $zone: String
  ) {
    shippingMethods(
      enabled: true,
      zone_members_code: $zone
    ) {
      collection {
        code
        calculator
        configuration
        translations {
          collection {
            name
            description
            locale
          }
        }
        channels {
          collection {
            code
          }
        }
      }
    }
  }
`);

export const getPaymentMethodsQuery = gql(`
  query getPaymentMethods {
    paymentMethods(enabled: true) {
      collection {
        code
        translations {
          collection {
            name
            description
            locale
          }
        }
        channels {
          collection {
            code
          }
        }
      }
    }
  }
`);

export const getCountriesQuery = gql(`
  query getCountries {
    countries {
      collection {
        key: code
        enabled
        label: name
      }
    }
  }
`);
