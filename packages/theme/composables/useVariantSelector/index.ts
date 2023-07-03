import { computed, reactive, ref, watch } from '@nuxtjs/composition-api';
import Vue from 'vue';
import { productGetters } from '@vue-storefront/sylius';

const state = reactive({ product: null });
const attributes = ref({});
const initialQty = ref(1);

const useVariantSelector = () => {
  const open = (product: any, qty = 1) => {
    state.product = product;
    initialQty.value = qty;
  };
  const close = () => (state.product = null);
  const setAttribute = (key, value) => Vue.set(attributes.value, key, value);
  const product = computed(() =>
    state.product
      ? productGetters.getFiltered([state.product], {
          master: true,
          attributes: attributes.value,
        })[0]
      : null
  );

  const options = computed(() =>
    product.value
      ? productGetters.getAttributes([product.value], ['color', 'size'])
      : []
  );
  const configuration = computed(() =>
    product.value
      ? productGetters.getAttributes(product.value, ['color', 'size'])
      : []
  );
  const optionKeys = computed(() => Object.keys(options.value));

  const initAttributes = () => {
    attributes.value = {};

    optionKeys.value.forEach((key) => {
      setAttribute(key, configuration.value[key]);
    });
  };

  watch(
    () => state.product,
    () => {
      initAttributes();
    }
  );

  return {
    open,
    close,
    product,
    initialQty: computed(() => initialQty.value),
    setAttribute,
    attributes,
    optionKeys,
    options,
  };
};

export default useVariantSelector;
