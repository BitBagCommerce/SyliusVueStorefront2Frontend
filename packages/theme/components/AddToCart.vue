<template>
  <div class="sf-add-to-cart">
    <slot name="quantity-select-input">
      <QuantitySelector
        v-model="qty"
        @input="$emit('input', $event)"
        :qty="qty"
        :min="1"
        :max="productGetters.getQuantityLimit(product.selectedVariant)"
        class="sf-collected-product__quantity-selector"
        :disabled="disabled"
      />
    </slot>
    <slot name="add-to-cart-btn">
      <SfButton
        class="sf-add-to-cart__button"
        :disabled="disabled"
        v-on="$listeners"
      >
        {{ $t('Add to cart') }}
      </SfButton>
    </slot>
  </div>
</template>
<script>
import {
  SfButton
} from '@storefront-ui/vue';
import QuantitySelector from './CartSidebar/QuantitySelector.vue';
import { productGetters } from '@vue-storefront/sylius';
export default {
  name: 'AddToCart',
  components: {
    SfButton,
    QuantitySelector
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    qty: {
      type: Number,
      default: 1
    },
    product: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    productGetters
  })
};
</script>
<style lang="scss">
.sf-add-to-cart {
  display: flex;
  &__button {
    --button-font-weight: var(--font-weight--semibold);
    --button-width: 100%;
    align-items: center;
    &:disabled {
      color: var(--c-text-disabled);
    }
  }
  &__select-quantity {
    --add-to-cart-select-quantity-margin: 0 var(--spacer-base) 0 0;
    flex: none;
    margin: var(--add-to-cart-select-quantity-margin, 0 0 0 var(--spacer-xs));
  }
  @include for-desktop {
    --add-to-cart-select-quantity-display: flex;
  }
}
</style>
