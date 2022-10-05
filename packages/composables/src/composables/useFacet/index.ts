import { Context, useFacetFactory, FacetSearchResult, Logger } from '@vue-storefront/core';
const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    let products = [];
    let productsNotFiltered = [];
    let attributes = [];
    let category = [];
    let categories = [];
    let categoriesFlat = [];
    let pagination = {
      totalCount: 0,
      lastPage: 0,
      itemsPerPage: 0
    };

    try {
      const data = await Promise.all([
        context.$sylius.api.getCategory(),
        context.$sylius.api.getProduct(params.input),
        context.$sylius.api.getProductNotFiltered(params.input),
        context.$sylius.api.getProductAttribute(params.input)
      ]);

      const foundCategory = data[0].filter(cat => cat.children.some(child => child.slug === params.input.categorySlug));
      categories = foundCategory.length ? foundCategory : data[0].filter(cat => cat.slug === params.input.categorySlug);
      categoriesFlat = categories.reduce((acc, curr) => {
        return acc.concat(curr.children);
      }, categories);
      category = categoriesFlat.find(cat => cat.slug === params.input.categorySlug);

      const { products: loadedProducts, pagination: loadedPagination } = data[1];
      products = loadedProducts;
      pagination = loadedPagination;

      productsNotFiltered = data[2].products;

      attributes = data[3];
      attributes.forEach(attr => {
        if (attr.type === 'text') {
          attr.options = attr.options.map(option => ({
            ...option,
            selected: params.input.attributes[option.code]?.includes(option.stringValue) || false
          }));

          return;
        }

        if (params.input.attributes?.[attr.id]) {
          attr.options[0].selected = true;
          attr.range = params.input.attributes[attr.id];

          return;
        }

        attr.options[0].selected = false;
      });
    } catch (e) {
      Logger.error(e);
    }

    return {
      products,
      productsNotFiltered,
      category,
      categories,
      categoriesFlat,
      facets: attributes,
      page: params.input.page,
      total: pagination.totalCount,
      totalPages: pagination.lastPage,
      availableFilters: [],
      availableSortingOptions: [
        { type: 'sort', id: 'name-asc', value: 'Name: a-z' },
        { type: 'sort', id: 'name-desc', value: 'Name: z-a' },
        { type: 'sort', id: 'price-highest', value: 'Price: highest' },
        { type: 'sort', id: 'price-lowest', value: 'Price: lowest' },
        { type: 'sort', id: 'rating-highest', value: 'Rating: highest' },
        { type: 'sort', id: 'rating-lowest', value: 'Rating: lowest' }
      ],
      perPageOptions: [10, 20, 50],
      itemsPerPage: pagination.itemsPerPage
    };
  }
};

export const useFacet = useFacetFactory<any>(factoryParams);
