import gql from 'graphql-tag';
import { productFragment } from './fragments';

export const BaseQuery = gql`
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
    $channelsCode: String,
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
        ${productFragment}
      }
      paginationInfo {
        itemsPerPage
        lastPage
        totalCount
      }
    }
  }
`;

export const getProductsNotFilteredQuery = gql`
  query getProductsNotFiltered(
    $slug: String,
    $categorySlug: String,
    $channelsCode: String,
  ) {
    products(
      translations_slug: $slug,
      productTaxons_taxon_translations_slug: $categorySlug,
      channels_code: $channelsCode,
    ) {
      collection {
        ${productFragment}
      }
    }
  }
`;

export const getProductsAttributesQuery = gql`
  query productsAttributesInTaxon(
    $categorySlug: String,
    $locale: String
  ) {
    products(
      productTaxons_taxon_translations_slug: $categorySlug,
    ) {
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
`;
