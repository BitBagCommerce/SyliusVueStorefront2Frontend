import {
  Logger,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import { Context } from '@vue-storefront/sylius-api/src/types';
import { Category } from 'composables/src/types';

// TODO: add better typing after category list changes
const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, { customQuery, ...searchParams }) => {
    try {
      const category = await context.$sylius.api.getCategory(searchParams, customQuery);

      return category as any;
    } catch (e) {
      Logger.error(e);
    }

    return [];
  }
};

export const useCategory = useCategoryFactory<Category, any>(params);
