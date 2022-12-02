export const wishlistFragment = `
  id
  name
  itemCount
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
`;
