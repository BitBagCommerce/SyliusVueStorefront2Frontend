import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

const composableName = 'useProductsNotFiltered';

export const useProductsNotFiltered = () => {
  const context = useVSFContext();
  const productsNotFiltered = sharedRef(null, `${composableName}`);
  const loading = sharedRef(false, `${composableName}-loading`);
  const error = sharedRef({ load: null }, `${composableName}-error`);

  const load = async (params) => {
    try {
      loading.value = true;
      productsNotFiltered.value = await context.$sylius.api.getProductNotFiltered(params);
      loading.value = false;
    } catch (error) {
      productsNotFiltered.value = [];
      error.value.load = error;
      Logger.error(`${composableName}/load`, error);
    }
  };

  return {
    productsNotFiltered: computed(() => productsNotFiltered.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    load
  };
};
