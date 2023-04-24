import { Context, useFacetFactory, FacetSearchResult, Logger } from '@vue-storefront/core';
const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    let category = [];
    let categories = [];
    let categoriesFlat = [];

    try {
      const allCategories = await context.$sylius.api.getCategory();

      const foundCategory = allCategories.filter(cat => cat.children.some(child => child.slug === params.input.categorySlug));
      categories = foundCategory.length ? foundCategory : allCategories.filter(cat => cat.slug === params.input.categorySlug);
      categoriesFlat = categories.reduce((acc, curr) => {
        return acc.concat(curr.children);
      }, categories);
      category = categoriesFlat.find(cat => cat.slug === params.input.categorySlug);

    } catch (e) {
      Logger.error(e);
    }

    return {
      category,
      categories,
      categoriesFlat,
      page: params.input.page,
      availableFilters: [],
      availableSortingOptions: [
        { type: 'sort', id: 'name-asc', value: 'Name: a-z' },
        { type: 'sort', id: 'name-desc', value: 'Name: z-a' },
        { type: 'sort', id: 'price-highest', value: 'Price: highest' },
        { type: 'sort', id: 'price-lowest', value: 'Price: lowest' },
        { type: 'sort', id: 'rating-highest', value: 'Rating: highest' },
        { type: 'sort', id: 'rating-lowest', value: 'Rating: lowest' }
      ]

    };
  }
};

export const useFacet = useFacetFactory<any>(factoryParams);
