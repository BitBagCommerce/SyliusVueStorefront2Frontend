
import { useRoute, useRouter } from '@nuxtjs/composition-api';

const nonFilters = ['page', 'sort', 'phrase', 'itemsPerPage'];

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]]
  };
};

const getFiltersDataFromUrl = (query, onlyFilters) => {
  return Object.keys(query)
    .filter(f => onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f))
    .reduce(reduceFilters(query), {});
};

const getQueryParameter = (item): string => {
  return Array.isArray(item)
    ? item[0]
    : item;
};

const useUiHelpers = () => {
  const route = useRoute();
  const router = useRouter();
  const { query, params } = route.value;

  const getFacetsFromURL = () => {
    const getOrderBy = (sort: string | string[]) => {
      if (sort === 'name-desc') return [{ translations_name: 'DESC' }];
      if (sort === 'name-asc') return [{ translations_name: 'ASC' }];
      if (sort === 'price-highest') return [{ variants_channelPricings_price: 'DESC' }];
      if (sort === 'price-lowest') return [{ variants_channelPricings_price: 'ASC' }];
      if (sort === 'rating-highest') return [{ averageRating: 'DESC' }];
      if (sort === 'rating-lowest') return [{ averageRating: 'ASC' }];

      return [{ translations_name: 'ASC' }];
    };

    const getPriceRange = (range: string | string[]) => {
      if (!range) return;
      if (Array.isArray(range)) return [{ between: range[0] }];

      return [{ between: range }];
    };

    const getAttributes = (filters: any) => {
      let attributes = {};

      if (Array.isArray(filters)) {
        const textFilters = filters.map(filter => filter.split(':'));

        textFilters.forEach(filter => {
          if (attributes?.[filter[0]]) {
            attributes = {
              ...attributes,
              [filter[0]]: [...attributes[filter[0]], filter[1]]
            };

            return;
          }

          attributes = {
            ...attributes,
            [filter[0]]: [filter[1]]
          };
        });
      }

      return attributes;
    };

    return {
      categorySlug: Object.values(params).filter(Boolean).join('/'),
      page: parseInt(getQueryParameter(query.page)) || 1,
      phrase: query.phrase,
      orderBy: getOrderBy(query.sort),
      averageRating: (query.sort === 'rating-highest' || query.sort === 'rating-lowest') ? [{ between: '1..5' }] : null,
      price: getPriceRange(query.priceRange),
      attributes: getAttributes(query.filters),
      itemsPerPage: parseInt(getQueryParameter(query.itemsPerPage)) || 10,
      channelsCode: 'FASHION_WEB'
    } as any;
  };

  // eslint-disable-next-line
  const getCatLink = (category): string => {
    return `/c/${category.slug}`;
  };

  // eslint-disable-next-line
  const changeSorting = (sort: string) => {
    router.push({ query: { ...query, sort } });
  };

  // eslint-disable-next-line
  const changeFilters = (filters: any, priceRange: number[]) => {
    const options = [];

    for (const filter in filters) {
      filters[filter].forEach(option => options.push(`${filter}:${option}`));
    }

    router.push({
      query: {
        ...query,
        priceRange: `${(priceRange[0] * 100).toFixed(0)}..${(priceRange[1] * 100).toFixed(0)}`,
        filters: options
      }
    });
  };

  // eslint-disable-next-line
  const changeItemsPerPage = (itemsPerPage: number) => {
    router.push({
      query: {
        ...getFiltersDataFromUrl(query, false),
        itemsPerPage
      }
    });
  };

  // eslint-disable-next-line
  const setTermForUrl = (term: string) => {
    router.push({
      query: {
        ...getFiltersDataFromUrl(query, false),
        phrase: term || undefined
      }
    });
  };

  // eslint-disable-next-line
  const isFacetColor = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetColor.');

    return false;
  };

  // eslint-disable-next-line
  const isFacetCheckbox = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetCheckbox.');

    return false;
  };

  const getSearchTermFromUrl = () => {
    console.warn('[VSF] please implement useUiHelpers.getSearchTermFromUrl.');
  };

  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl
  };
};

export default useUiHelpers;
