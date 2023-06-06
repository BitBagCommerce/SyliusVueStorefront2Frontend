import {
  Context,
  useFacetFactory,
  FacetSearchResult,
} from '@vue-storefront/core';
const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    return {
      page: params.input.page,
      availableFilters: [],
      availableSortingOptions: [
        { type: 'sort', id: 'name-asc', value: 'Name: a-z' },
        { type: 'sort', id: 'name-desc', value: 'Name: z-a' },
        { type: 'sort', id: 'price-highest', value: 'Price: highest' },
        { type: 'sort', id: 'price-lowest', value: 'Price: lowest' },
        { type: 'sort', id: 'rating-highest', value: 'Rating: highest' },
        { type: 'sort', id: 'rating-lowest', value: 'Rating: lowest' },
      ],
    };
  },
};

export const useFacet = useFacetFactory<any>(factoryParams);
