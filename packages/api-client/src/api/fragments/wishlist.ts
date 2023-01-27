export const wishlistFragment = `
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
          channelPricings(channelCode: "${process.env.SYLIUS_CHANNEL_CODE}") {
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
`;
