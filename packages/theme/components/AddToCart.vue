<template>
  <div class="sf-add-to-cart">
    <slot name="quantity-select-input">
      <QuantitySelector
        class="sf-collected-product__quantity-selector"
        @quantity-change="$emit('quantity-change', $event)"
        :qty="qty"
        :min="1"
        :max="productGetters.getQuantityLimit(selectedVariant)"
        :disabled="disabledOrOutOfStock"
      />
    </slot>
    <slot name="add-to-cart-btn">
      <SfButton
        class="sf-add-to-cart__button"
        :disabled="disabledOrOutOfStock"
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
import { computed } from '@nuxtjs/composition-api';

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
    selectedVariant: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const disabledOrOutOfStock = computed(() => props.disabled || (props.selectedVariant.tracked && !productGetters.isInStock(props.selectedVariant)));

    return {
      productGetters,
      disabledOrOutOfStock
    };
  }
};
</script>
<style lang="scss">
.sf-add-to-cart {
  display: flex;
  gap: 1em;
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
