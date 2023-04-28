import { gql } from 'api-client/__generated__';

export const getUserQuery = gql(`
  query getUser(
    $id: ID!
  ) {
    customer (
      id: $id
    ) {
      firstName
      lastName
      email
      phoneNumber
      gender
      birthday
      subscribedToNewsletter
    }
  }
`);

export const getUserAddressesQuery = gql(`
  query getUserAddresses {
    addresses {
      collection {
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
`);

export const getUserOrdersQuery = gql(`
  query getCustomerOrders(
    $id: ID!
  ) {
    customer (
      id: $id
    ) {
      orders {
        edges {
          node {
            id
            number
            total
            paymentState
            shippingState
            shippingTotal
            createdAt
            payments {
              edges {
                node {
                  id
                  state
                  method {
                    code
                  }
                }
              }
            }
            items {
              edges {
                node {
                  id
                  total
                  productName
                  quantity
                  variant {
                    code
                    product {
                      _id
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

