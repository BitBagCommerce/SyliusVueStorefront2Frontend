import { computed, reactive } from '@nuxtjs/composition-api';

const state = reactive({ product: null });

const useVariantSelector = () => {
  const open = (product: any) => state.product = product;
  const close = () => state.product = null;
  const product = computed(() => state.product);

  return {
    open,
    close,
    product
  };
};

export default useVariantSelector;
