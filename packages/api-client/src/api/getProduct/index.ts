/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CustomQuery } from '@vue-storefront/core';
import { BaseQuery, getProductsNotFilteredQuery, getProductsAttributesQuery } from './queries';
import { extendQuery, query } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getProduct(context, params, customQuery?: CustomQuery): Promise<any> {
  let pagination = {};
  let products = [];

  try {
    const { query: queryGql, variables } = extendQuery(context, BaseQuery, params, customQuery);
    const data = await query(context, queryGql, variables);

    const { locale, imagePaths } = context.config;
    pagination = data.products.paginationInfo;
    // TODO: rewrite this map function so typescript doesn't throw errors
    products = data.products.collection.map(item => {
      if (item.attributes) {
        // @ts-ignore
        item.attributes = item.attributes.collection
          .filter(attr => attr.type === 'integer' || attr.localeCode === locale);
      }

      if (item.productTaxons) {
        // @ts-ignore
        item._categoriesRef = item.productTaxons.collection.map(taxon => taxon.taxon.id);
        delete item.productTaxons;
      }

      if (item.options) {
        // @ts-ignore
        item.options = item.options?.edges?.map(edge => {
          // @ts-ignore
          edge.node.values = edge?.node?.values?.edges?.map(e => e?.node);
          return edge.node;
        });
      }

      if (item.variants) {
        // @ts-ignore
        item.variants = item.variants.collection.map(variant => {
          // @ts-ignore
          variant.optionValues = variant.optionValues.edges.map(e => e.node);
          if (variant.channelPricings) {
            // @ts-ignore
            variant.channelPricings = variant.channelPricings.collection;
          }
          return variant;
        });
      }
      // @ts-ignore
      item.selectedVariant = item?.variants?.length ? item.variants?.[0] : null;

      if (item.imagesRef) {
        const mapImages = item.imagesRef.collection;
        // @ts-ignore
        item.images = mapImages.map(img => [imagePaths.thumbnail, img.path].join('/'));
        // @ts-ignore
        item.galleryImages = mapImages.map(img => [imagePaths.regular, img.path].join('/'));
        delete item.imagesRef;
      }
      return item;
    });
  } catch (err) {
    console.log('Sylius getProduct error', err);
  }

  return {
    products,
    pagination
  };
}

export async function getProductNotFiltered(context, params, customQuery?: CustomQuery) {
  let products = [];

  try {
    const { query: queryGql, variables } = extendQuery(context, getProductsNotFilteredQuery, params, customQuery);
    const data = await query(context, queryGql, variables);

    const { locale, imagePaths } = context.config;
    products = data.products.collection.map((item) => {
      if (item.attributes) {
        // @ts-ignore
        item.attributes = item.attributes.collection
          .filter(attr => attr.type === 'integer' || attr.localeCode === locale);
      }

      if (item.productTaxons) {
        // @ts-ignore
        item._categoriesRef = item.productTaxons.collection?.map(taxon => taxon.taxon.id);
        delete item.productTaxons;
      }

      if (item.options) {
        // @ts-ignore
        item.options = item.options?.edges?.map(edge => {
          // @ts-ignore
          edge.node.values = edge?.node?.values?.edges?.map(e => e.node);
          return edge.node;
        });
      }

      if (item.variants) {
        // @ts-ignore
        item.variants = item.variants.collection?.map(variant => {
          // @ts-ignore
          variant.optionValues = variant.optionValues.edges?.map(e => e.node);
          if (variant.channelPricings) {
            // @ts-ignore
            variant.channelPricings = variant.channelPricings.collection;
          }
          return variant;
        });
      }
      // @ts-ignore
      item.selectedVariant = item?.variants?.length ? item.variants?.[0] : null;

      if (item.imagesRef) {
        const mapImages = item.imagesRef.collection;
        // @ts-ignore
        item.images = mapImages.map(img => [imagePaths.thumbnail, img.path].join('/'));
        // @ts-ignore
        item.galleryImages = mapImages.map(img => [imagePaths.regular, img.path].join('/'));
        delete item.imagesRef;
      }
      return item;
    });
  } catch (err) {
    console.log('Sylius getProduct error', err);
  }

  return {
    products
  };
}

export async function getProductAttribute(context, params, customQuery?: CustomQuery) {
  const variables = { ...params, locale: context.config.locale };

  const { productsQuery } = context.extendQuery(
    customQuery,
    {
      productsQuery: {
        query: getProductsAttributesQuery,
        variables: variables
      }
    }
  );

  const { data } = await context.client.query({
    query: productsQuery.query,
    variables: productsQuery.variables,
    fetchPolicy: 'no-cache'
  });

  const attributes = data.products.collection.reduce((prev, curr) => ([
    ...prev,
    ...curr.attributes.collection
  ]), {});

  const groupedAttributes = [];

  attributes?.forEach(attr => {
    const index = groupedAttributes.findIndex(a => a.id === attr.code);

    if (index === -1) {
      const group = {
        id: attr.code,
        label: attr.name,
        type: attr.type,
        options: [attr]
      };

      groupedAttributes.push(group);

      return;
    }

    if (groupedAttributes[index].options.some(option => option.stringValue === attr.stringValue)) return;

    groupedAttributes[index].options.push(attr);
  });

  return groupedAttributes;
}

