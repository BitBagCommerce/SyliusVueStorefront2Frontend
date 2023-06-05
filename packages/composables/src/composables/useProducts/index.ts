import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';
import { Context } from '@vue-storefront/sylius-api';

const composableName = 'useProducts';

export const useProducts = () => {
  const context = useVSFContext() as Context;
  const products = sharedRef(null, composableName);
  const loading = sharedRef(false, `${composableName}-loading`);
  const error = sharedRef({ load: null }, `${composableName}-error`);

  const load = async (params) => {
    try {
      loading.value = true;
      products.value = await context.$sylius.api.getMinimalProduct(params);
    } catch (error) {
      products.value = [];
      error.value.load = error;
      Logger.error(`${composableName}/load`, error);
    } finally {
      loading.value = false;
    }
  };

  return {
    result: computed(() => products.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    load,
  };
};
