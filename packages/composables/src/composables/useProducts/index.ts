import { computed, ref } from '@nuxtjs/composition-api';
import { useVSFContext, Logger } from '@vue-storefront/core';
import { Context } from '@vue-storefront/sylius-api';

const composableName = 'useProducts';

export const useProducts = () => {
  const context = useVSFContext() as Context;
  const products = ref(null);
  const loading = ref(false);
  const error = ref({ load: null });

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
