/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Context, CustomQuery } from '@vue-storefront/core';
import {
  BaseQuery,
  getProductsNotFilteredQuery,
  getProductsAttributesQuery,
  getMinimalProductsQuery,
  getFirstProductIdQuery,
} from './queries';
import { extendQuery, query, VariablesHelper } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getProduct(
  context: Context,
  params: VariablesHelper<typeof BaseQuery>,
  customQuery?: CustomQuery
) {
  try {
    const { query: queryGql, variables } = extendQuery(
      context,
      BaseQuery as any,
      params,
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
  params: VariablesHelper<typeof getProductsNotFilteredQuery>,
  customQuery?: CustomQuery
) {
  try {
    const { query: queryGql, variables } = extendQuery(
      context,
      getProductsNotFilteredQuery as any,
      params,
      customQuery
    );
    const data: any = await query(context, queryGql, variables);

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
    };
  } catch (err) {
    console.log('Sylius getProductNotFiltered error', err);

    return {
      products: [],
    };
  }
}

export async function getMinimalProduct(
  context,
  params,
  customQuery?: CustomQuery
): Promise<any> {
  let pagination = {};
  let products = [];

  try {
    const productsQuery = extendQuery(
      context,
      getMinimalProductsQuery as any,
      params,
      customQuery
    );
    const data: any = await query(
      context,
      productsQuery.query,
      productsQuery.variables
    );

    const { locale, imagePaths } = context.config;
    pagination = data.products.paginationInfo;
    products = data.products.collection.map((item) => {
      if (item.attributes) {
        item.attributes = item.attributes.collection.filter(
          (attr) => attr.type === 'integer' || attr.localeCode === locale
        );
      }

      if (item.productTaxons) {
        item._categoriesRef = item.productTaxons.collection.map(
          (taxon) => taxon.taxon.id
        );
        delete item.productTaxons;
      }

      if (item.options) {
        item.options = item.options.edges.map((edge) => {
          edge.node.values = edge.node.values.edges.map((e) => e.node);
          return edge.node;
        });
      }

      if (item.variants) {
        item.variants = item.variants.collection.map((variant) => {
          variant.optionValues = variant.optionValues.edges.map((e) => e.node);
          if (variant.channelPricings) {
            variant.channelPricings = variant.channelPricings.collection;
          }
          return variant;
        });
      }
      item.selectedVariant = item?.variants?.length ? item.variants?.[0] : null;

      if (item.imagesRef) {
        const mapImages = item.imagesRef.collection;
        item.images = mapImages.map((img) =>
          [imagePaths.thumbnail, img.path].join('/')
        );
        item.galleryImages = mapImages.map((img) =>
          [imagePaths.regular, img.path].join('/')
        );
        delete item.imagesRef;
      }
      return item;
    });

    return {
      products,
    };
  } catch (err) {
    console.log('Sylius getMinimalProduct error', err);

    return {
      products: [],
    };
  }
}

export async function getProductAttribute(
  context: Context,
  params: { categorySlug: string },
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

  const variables = { ...params, locale: context.config.locale };
  const { query: attributeQuery, variables: attributeVariables } = extendQuery(
    context,
    getProductsAttributesQuery,
    variables,
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
    const data: any = query(context, getFirstProductIdQuery, params);

    return data.products.collection;
  } catch (err) {
    console.log('Sylius getFirstProductId error', err);
  }

  return null;
}
