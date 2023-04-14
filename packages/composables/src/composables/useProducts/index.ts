import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

const composableName = 'useProducts';

export const useProducts = () => {
  const context = useVSFContext();
  const products = sharedRef(null, composableName);
  const productsNotFiltered = sharedRef(null, `${composableName}NotFiltered`);
  const loading = sharedRef(false, `${composableName}-loading`);
  const error = sharedRef({ load: null }, `${composableName}-error`);

  const load = async (params) => {
    try {
      loading.value = true;

      const data = await Promise.all([
        context.$sylius.api.getProduct(params),
        context.$sylius.api.getProductNotFiltered(params)
      ]);

      products.value = data[0];
      loading.value = false;
    } catch (error) {
      products.value = [];
      error.value.load = error;
      Logger.error(`${composableName}/load`, error);
    }
  };

  return {
    result: computed(() => products.value),
    productsNotFiltered: computed(() => productsNotFiltered.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    load
  };
};
