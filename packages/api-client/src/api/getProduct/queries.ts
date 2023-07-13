import { gql } from 'api-client/__generated__';

export const BaseQuery = gql(`
  query getProducts(
    $slug: String,
    $categorySlug: String,
    $orderBy: [ProductFilter_order],
    $averageRating: [ProductFilter_averageRating],
    $price: [ProductFilter_variants_channelPricings_price],
    $attributes: Iterable,
    $itemsPerPage: Int,
    $page: Int,
    $search: String,
    $channelsCode: String!,
  ) {
    products(
      translations_name: $search,
      translations_slug: $slug,
      productTaxons_taxon_translations_slug: $categorySlug,
      order: $orderBy,
      averageRating: $averageRating,
      variants_channelPricings_price: $price,
      attributes: $attributes,
      page: $page,
      itemsPerPage: $itemsPerPage,
      channels_code: $channelsCode,
    ) {
      collection {
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
            channelPricings(channelCode: $channelsCode) {
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
      }
      paginationInfo {
        itemsPerPage
        lastPage
        totalCount
      }
    }
  }
`);

export const getMinimalProductsQuery = gql(`
  query getMinimalProducts(
    $slug: String,
    $categorySlug: String,
    $orderBy: [ProductFilter_order],
    $averageRating: [ProductFilter_averageRating],
    $price: [ProductFilter_variants_channelPricings_price],
    $attributes: Iterable,
    $itemsPerPage: Int,
    $page: Int,
    $search: String,
    $channelsCode: String!,
  ) {
    products(
      translations_name: $search,
      translations_slug: $slug,
      productTaxons_taxon_translations_slug: $categorySlug,
      order: $orderBy,
      averageRating: $averageRating,
      variants_channelPricings_price: $price,
      attributes: $attributes,
      page: $page,
      itemsPerPage: $itemsPerPage,
      channels_code: $channelsCode,
    ) {
      collection {
        id
        _id
        sku: code
        name
        slug
        averageRating
        shortDescription
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
            channelPricings(channelCode: $channelsCode) {
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
      }
      paginationInfo {
        itemsPerPage
        lastPage
        totalCount
      }
    }
  }
`);

export const getProductsNotFilteredQuery = gql(`
  query getProductsNotFiltered(
    $slug: String,
    $categorySlug: String,
    $channelsCode: String!,
  ) {
    products(
      translations_slug: $slug,
      productTaxons_taxon_translations_slug: $categorySlug,
      channels_code: $channelsCode,
    ) {
      collection {
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
            channelPricings(channelCode: $channelsCode) {
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
      }
    }
  }
`);

export const getProductsAttributesQuery = gql(`
  query productsAttributesInTaxon($categorySlug: String, $locale: String) {
    products(productTaxons_taxon_translations_slug: $categorySlug) {
      collection {
        attributes(localeCode: $locale) {
          collection {
            id
            code
            name
            stringValue
            type
          }
        }
      }
    }
  }
`);

export const getFirstProductIdQuery = gql(`
  query getFirstProduct {
    products(itemsPerPage: 1) {
      collection {
        id
      }
    }
  }
`);
