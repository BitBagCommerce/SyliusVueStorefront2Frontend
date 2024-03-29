/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Context, CustomQuery } from '@vue-storefront/core';
import {
  BaseQuery,
  getProductsNotFilteredQuery,
  getProductsAttributesQuery,
  getMinimalProductsQuery,
  getFirstProductIdQuery,
} from './queries';
import { extendQuery, OmitChannelsCode, query } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getProduct(
  context: Context,
  params: OmitChannelsCode<typeof BaseQuery>,
  customQuery?: CustomQuery
) {
  try {
    const { query: queryGql, variables } = extendQuery(
      context,
      BaseQuery,
      { ...params, channelsCode: process.env.SYLIUS_CHANNEL_CODE },
      customQuery
    );
    const data: any = await query(context, queryGql, variables);
    const { locale, imagePaths } = context.config;

    const pagination = data.products.paginationInfo;
    const products = data.products?.collection.map((item) => {
      const variants = item.variants?.collection.map((variant) => ({
        ...variant,
        optionValues: variant.optionValues?.edges.map((e) => e.node),
        channelPricings: variant.channelPricings?.collection,
      }));
      const imagesRef = item.imagesRef?.collection;

      return {
        ...item,
        attributes: item.attributes?.collection.filter(
          (attr) => attr.type === 'integer' || attr.localeCode === locale
        ),
        _categoriesRef: item.productTaxons?.collection.map(
          (taxon) => taxon.taxon.id
        ),
        options: item.options?.edges.map((edge) => ({
          ...edge.node,
          values: edge.node?.values.edges.map((e) => e.node),
        })),
        variants,
        selectedVariant: variants.length ? variants[0] : null,
        images: imagesRef?.map((img) =>
          [imagePaths.thumbnail, img.path].join('/')
        ),
        galleryImages: imagesRef?.map((img) =>
          [imagePaths.regular, img.path].join('/')
        ),
      };
    });

    return {
      products,
      pagination,
    };
  } catch (err) {
    console.log('Sylius getProduct error', err);

    return {
      products: [],
      pagination: {
        totalCount: 0,
        lastPage: 0,
        itemsPerPage: 0,
      },
    };
  }
}

export async function getProductNotFiltered(
  context: Context,
  params: OmitChannelsCode<typeof getProductsNotFilteredQuery>,
  customQuery?: CustomQuery
) {
  try {
    const { query: queryGql, variables } = extendQuery(
      context,
      getProductsNotFilteredQuery,
      { ...params, channelsCode: process.env.SYLIUS_CHANNEL_CODE },
      customQuery
    );
    const data = await query(context, queryGql, variables);

    const { locale, imagePaths } = context.config;
    const products = data.products.collection.map((item) => {
      const variants = item.variants?.collection.map((variant) => ({
        ...variant,
        optionValues: variant.optionValues?.edges.map((e) => e.node),
        channelPricings: variant.channelPricings?.collection,
      }));
      const imagesRef = item.imagesRef?.collection;

      return {
        ...item,
        attributes: item.attributes?.collection.filter(
          (attr) => attr.type === 'integer' || attr.localeCode === locale
        ),
        options: item.options?.edges.map((edge) => ({
          ...edge.node,
          values: edge.node?.values.edges.map((e) => e.node),
        })),
        variants,
        selectedVariant: variants.length ? variants[0] : null,
        images: imagesRef?.map((img) =>
          [imagePaths.thumbnail, img.path].join('/')
        ),
        galleryImages: imagesRef?.map((img) =>
          [imagePaths.regular, img.path].join('/')
        ),
      };
    });

    return {
      products,
    };
  } catch (err) {
    console.log('Sylius getProductNotFiltered error', err);

    return {
      products: [],
    };
  }
}

// TODO: this function doesn't seem to be used any where and seems to be broken
export async function getMinimalProduct(
  context,
  params,
  customQuery?: CustomQuery
): Promise<any> {
  try {
    const productsQuery = extendQuery(
      context,
      getMinimalProductsQuery,
      { ...params, channelsCode: process.env.SYLIUS_CHANNEL_CODE },
      customQuery
    );
    const data = await query(
      context,
      productsQuery.query,
      productsQuery.variables
    );

    const { locale, imagePaths } = context.config;
    const pagination = data.products.paginationInfo;
    const products = data.products?.collection.map((item) => {
      const variants = item.variants?.collection.map((variant) => ({
        ...variant,
        optionValues: variant.optionValues?.edges.map((e) => e.node),
        channelPricings: variant.channelPricings?.collection,
      }));
      const imagesRef = item.imagesRef?.collection;

      return {
        ...item,
        attributes: item.attributes?.collection.filter(
          (attr) => attr.type === 'integer' || attr.localeCode === locale
        ),
        options: item.options?.edges.map((edge) => ({
          ...edge.node,
          values: edge.node?.values.edges.map((e) => e.node),
        })),
        variants,
        selectedVariant: variants.length ? variants[0] : null,
        images: imagesRef?.map((img) =>
          [imagePaths.thumbnail, img.path].join('/')
        ),
        galleryImages: imagesRef?.map((img) =>
          [imagePaths.regular, img.path].join('/')
        ),
      };
    });

    return {
      products,
      pagination,
    };
  } catch (err) {
    console.log('Sylius getMinimalProduct error', err);

    return {
      products: [],
      pagination: {
        totalCount: 0,
        lastPage: 0,
        itemsPerPage: 0,
      },
    };
  }
}

export async function getProductAttribute(
  context: Context,
  params: { categorySlug: string; locale: string },
  customQuery?: CustomQuery
) {
  type Attribute = {
    __typename?: 'ProductAttributeValue';
    id: string;
    code?: string;
    name?: string;
    stringValue?: string;
    type?: string;
  };

  type GroupedAttributes = {
    id: string;
    label: string;
    type: string;
    options: Attribute[];
  }[];

  const { query: attributeQuery, variables: attributeVariables } = extendQuery(
    context,
    getProductsAttributesQuery,
    params,
    customQuery
  );
  const data = await query(context, attributeQuery, attributeVariables);

  const attributes = data.products.collection.reduce(
    (prev, curr) => [...prev, ...curr.attributes.collection],
    [] as Attribute[]
  );

  const groupedAttributes: GroupedAttributes = [];

  attributes?.forEach((attr) => {
    const index = groupedAttributes.findIndex((a) => a.id === attr.code);

    if (index === -1) {
      const group = {
        id: attr.code,
        label: attr.name,
        type: attr.type,
        options: [attr],
      };

      groupedAttributes.push(group);

      return;
    }

    if (
      groupedAttributes[index].options.some(
        (option) => option.stringValue === attr.stringValue
      )
    )
      return;

    groupedAttributes[index].options.push(attr);
  });

  return groupedAttributes;
}

export async function getFirstProductId(context, params): Promise<any> {
  try {
    const data = await query(context, getFirstProductIdQuery, params);

    return data.products.collection;
  } catch (err) {
    console.log('Sylius getFirstProductId error', err);
  }

  return null;
}
