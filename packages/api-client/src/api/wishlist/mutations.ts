import { gql } from 'api-client/__generated__';

export const addItemToWishlistMutation = gql(`
  mutation addItemToWishlist(
    $id: String!,
    $productVariant: String!,
    $channelCode: String!,
  ) {
    add_itemWishlist(input: {
      id: $id,
      productVariant: $productVariant
    }) {
      wishlist {
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

export const removeItemFromWishlistMutation = gql(`
  mutation removeItemFromWishlist(
    $id: String!,
    $productVariant: String!,
    $channelCode: String!
  ) {
    remove_itemWishlist(input: {
      id: $id,
      productVariant: $productVariant
    }) {
      wishlist {
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

export const clearWishlistMutation = gql(`
  mutation clearWishlist(
    $id: ID!,
    $channelCode: String!
  ) {
    clearWishlist(input: {
      id: $id
    }) {
      wishlist {
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

export const createWishlistMutation = gql(`
  mutation createWishlist(
    $name: String!
    $channelCode: String!
  ) {
    createWishlist(input: {
      name: $name,
      channelCode: $channelCode
    }) {
      wishlist {
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

export const editWishlistMutation = gql(`
  mutation editWishlist(
    $id: ID!,
    $name: String!
    $channelCode: String!
  ) {
    updateWishlist(input: {
      id: $id,
      name: $name
    }) {
      wishlist {
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

export const removeWishlistMutation = gql(`
  mutation removeWishlist($id: ID!) {
    deleteWishlist(input: { id: $id }) {
      wishlist {
        id
      }
    }
  }
`);
