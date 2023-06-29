import { gql } from 'api-client/__generated__';

export const getWishlistsQuery = gql(`
  query getWishlist($channelCode: String!) {
    wishlists {
      collection {
        id
        name
        wishlistProducts {
          totalCount
          edges {
            node {
              id
              variant {
                id
                code
                channelPricings(channelCode: $channelCode) {
                  collection {
                    id
                    price
                    originalPrice
                  }
                }
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
                  name
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
            }
          }
        }
      }
    }
  }
`);
