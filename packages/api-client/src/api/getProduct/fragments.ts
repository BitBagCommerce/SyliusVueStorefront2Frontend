export const productFragment = `
  id
  _id
  sku: code
  name
  slug
  averageRating
  shortDescription
  description
  metaKeywords
  metaDescription
  options {
    edges {
      node {
        id
        _id
        values {
          edges {
            node {
              id
              code
              value
            }
          }
        }
        name
        code
      }
    }
  }
  variants {
    collection {
      id
      code
      name
      inStock
      onHold
      onHand
      enabled
      tracked
      channelPricings(channelCode: "${process.env.SYLIUS_CHANNEL_CODE}") {
        collection {
          channelCode
          price
          originalPrice
        }
      }
      optionValues {
        edges {
          node {
            id
            code
            value
            option {
              id
            }
          }
        }
      }
    }
  }
  attributes {
    collection {
      type
      name
      stringValue
      localeCode
    }
  }
  imagesRef: images {
    collection {
      path
    }
  }
  enabled
`;

export const minimalProductFragment = `
  id
  _id
  sku: code
  name
  slug
  averageRating
  shortDescription
  productTaxons {
    collection {
      taxon {
        id
      }
    }
  }
  options {
    edges {
      node {
        id
        _id
        values {
          edges {
            node {
              id
              code
              value
            }
          }
        }
        name
        code
      }
    }
  }
  variants {
    collection {
      id
      code
      name
      inStock
      onHold
      onHand
      enabled
      tracked
      channelPricings(channelCode: "${process.env.SYLIUS_CHANNEL_CODE}") {
        collection {
          channelCode
          price
          originalPrice
        }
      }
      optionValues {
        edges {
          node {
            id
            code
            value
            option {
              id
            }
          }
        }
      }
    }
  }
  attributes {
    collection {
      type
      name
      stringValue
      localeCode
    }
  }
  imagesRef: images {
    collection {
      path
    }
  }
  enabled
`;
