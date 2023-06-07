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

        <div class="product__price-and-stock">
          <SfPrice
            :regular="$n(productGetters.getPrice(product).regular, 'currency')"
            :special="
              productGetters.getPrice(product).special &&
              $n(productGetters.getPrice(product).special, 'currency')
            "
          />
          <div
            v-if="product.selectedVariant.tracked"
            :class="`stock-info ${
              productGetters.isInStock(product.selectedVariant) ? '' : 'danger'
            }`"
          >
            <p>
              {{
                productGetters.isInStock(product.selectedVariant)
                  ? productGetters.getStockForVariant(product.selectedVariant)
                  : 0
              }}
              {{ $t('in stock') }}
            </p>
          </div>
        </div>
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
          {{ size.label }}
        </SfSelectOption>
      </SfSelect>
    </div>

    <AddToCart
      data-e2e="modal__add-to-cart"
      class="modal__add-to-cart"
      v-model="qty"
      :selectedVariant="product.selectedVariant"
      :disabled="loading"
      @quantity-change="qty = $event"
      @click="handleAddToCart"
    />
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
  SfAddToCart,
} from '@storefront-ui/vue';
import { ref, watch } from '@nuxtjs/composition-api';
import QuantitySelector from '~/components/CartSidebar/QuantitySelector.vue';
import AddToCart from '~/components/AddToCart.vue';

export default {
  name: 'VariantSelector',
  components: {
    SfModal,
    SfHeading,
    SfImage,
    SfPrice,
    SfSelect,
    SfAddToCart,
    QuantitySelector,
    AddToCart,
  },
  setup(_, context) {
    const { product, close, setAttribute, attributes, options, optionKeys } =
      useVariantSelector();
    const { addItem, loading, error } = useCart();
    const { send } = useUiNotification();

    const qty = ref(1);

    const t = (key) => context.root.$i18n.t(key);

    const handleAddToCart = async () => {
      await addItem({ product: product.value, quantity: qty.value });

      const { addItem: addItemError } = error.value;

      if (addItemError) {
        send({ type: 'danger', message: addItemError.message });

        return;
      }

      send({
        type: 'success',
        message: t('Product has been added to the cart'),
      });
      close();
    };

    watch(
      () => product.value,
      () => {
        qty.value = 1;

        if (optionKeys.value.length < 1 && product.value) {
          handleAddToCart();
          close();
        }
      }
    );

    return {
      productGetters,
      close,
      loading,
      product,
      options,
      optionKeys,
      qty,
      setAttribute,
      handleAddToCart,
      attributes,
    };
  },
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

.stock-info {
  display: inline-flex;
  align-items: center;
  padding: 0.1rem 0.5rem;
  background-color: var(--c-light);
  border-radius: 15px;
  p {
    line-height: 1.3;
    margin: 0;
  }
  &.danger {
    background-color: lighten(#d12727, 40);
  }
}
</style>
