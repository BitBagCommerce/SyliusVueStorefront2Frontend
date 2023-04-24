<template>
  <SfModal
    :visible="!!product && optionKeys.length > 0"
    v-if="!!product && optionKeys.length > 0"
    :title="$t('Select size')"
    @close="close"
    class="modal"
  >
    <div class="modal__header">
      <SfImage
        :src="productGetters.getCoverImage(product)"
        :alt="productGetters.getName(product)"
        :height="100"
        :width="100"
      />

      <div class="modal__header--text">
        <SfHeading
          :title="productGetters.getName(product)"
          :level="3"
          class="sf-heading--no-underline sf-heading--left"
        />

        <SfPrice
          :regular="$n(productGetters.getPrice(product).regular, 'currency')"
          :special="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
        />
      </div>
    </div>

    <div class="modal__selects">
      <SfSelect
        v-for="(item, key) in optionKeys"
        :key="key"
        :value="attributes[item]"
        @input="setAttribute(item, $event)"
        :label="options[item].label"
        class="sf-select--underlined"
        :required="true"
      >
        <SfSelectOption
          v-for="size in options[item].value"
          :key="size.value"
          :value="size.value"
        >
          {{size.label}}
        </SfSelectOption>
      </SfSelect>
    </div>

    <SfAddToCart
      v-e2e="'modal_add-to-cart'"
      :stock="productUpdated.selectedVariant.onHand"
      v-model="qty"
      :disabled="loading || !productUpdated.selectedVariant.inStock"
      class="modal__add-to-cart"
      @click="handleAddToCart"
    >
      <template #quantity-select-input>
        <QuantitySelector
          :qty="1"
          :min="1"
          :max="productUpdated.selectedVariant.tracked ? productGetters.getStockForVariant(productUpdated.selectedVariant) : 999"
          class="sf-collected-product__quantity-selector"
          @input="$emit('input', $event)"
          :disabled="loading || (!productGetters.isInStock(productUpdated.selectedVariant) && productUpdated.selectedVariant.tracked)"
        />
      </template>
    </SfAddToCart>
  </SfModal>
</template>

<script>
import { productGetters, useCart } from '@vue-storefront/sylius';
import useVariantSelector from '~/composables/useVariantSelector';
import { useUiNotification } from '~/composables';
import {
  SfModal,
  SfHeading,
  SfImage,
  SfPrice,
  SfSelect,
  SfAddToCart
} from '@storefront-ui/vue';
import { computed, ref, watch } from '@nuxtjs/composition-api';
import Vue from 'vue';
import QuantitySelector from '~/components/CartSidebar/QuantitySelector.vue';

export default {
  name: 'VariantSelector',
  components: {
    SfModal,
    SfHeading,
    SfImage,
    SfPrice,
    SfSelect,
    SfAddToCart,
    QuantitySelector
  },
  setup(_, context) {
    const { product, close } = useVariantSelector();
    const { addItem, loading, error } = useCart();
    const { send } = useUiNotification();

    const productUpdated = computed(() => productGetters.getFiltered([product.value], { master: true, attributes: attributes.value })[0]);

    const options = computed(() => product.value ? productGetters.getAttributes([product.value], ['color', 'size']) : []);
    const configuration = computed(() => product.value ? productGetters.getAttributes(product.value, ['color', 'size']) : []);
    const optionKeys = computed(() => Object.keys(options.value));

    const qty = ref(1);
    const attributes = ref({});

    const t = (key) => context.root.$i18n.t(key);

    const setAttribute = (key, value) => Vue.set(attributes.value, key, value);

    const initAttributes = () => {
      attributes.value = {};

      optionKeys.value.forEach(key => {
        setAttribute(key, configuration.value[key]);
      });
    };

    const handleAddToCart = async () => {
      await addItem({ product: productUpdated.value, quantity: qty.value });

      const cartError = Object.values(error.value).find(err => err !== null);

      if (cartError) {
        send({ type: 'danger', message: cartError.message });

        return;
      }

      close();
      send({ type: 'success', message: t('Product has been added to the cart') });
    };

    watch(() => product.value, () => {
      initAttributes();
      qty.value = 1;

      if (optionKeys.value.length < 1 && product.value) {
        handleAddToCart();
        close();
      }
    });

    return {
      productGetters,
      close,
      loading,
      product,
      options,
      configuration,
      optionKeys,
      qty,
      attributes,
      setAttribute,
      handleAddToCart,
      productUpdated
    };
  }
};
</script>

<style lang="scss" scoped>
.modal {
  --modal-width: 35rem;
  --modal-content-padding: var(--spacer-base) 0;

  @include for-mobile {
    --modal-width: 100%;
  }

  &__header {
    margin: 0 var(--spacer-lg);
    display: flex;
    gap: var(--spacer-sm);

    &--header {
      margin-bottom: var(--spacer-sm);
    }
  }

  &__selects {
    margin: var(--spacer-sm) 0;
    padding: var(--spacer-base) var(--spacer-xl) 0 var(--spacer-xl);
    background-color: var(--c-light);
  }

  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    gap: 1.5rem;
    flex-direction: column;
    @media screen and (min-width: 300px) {
      flex-direction: row;
    }
  }
}
</style>
