<template>
  <div>
    <SfHeading
      :level="4"
      :title="$t('Shipping method')"
      class="sf-heading--left sf-heading--no-underline title shipping__title"
    />
    <SfRadio
      data-e2e="shipping-method"
      v-for="method in shippingMethods"
      :key="method.value"
      :label="method.label"
      :value="method.value"
      :description="method.description"
      :selected="selectedMethod"
      name="shippingMethod"
      class="form__radio shipping"
      @input="selectMethod(method.value)"
    >
      <template #label="{ label }">
        <div class="sf-radio__label shipping__label">
          <div>{{ label }}</div>
          <div>{{ $n(method.cost, 'currency') }}</div>
        </div>
      </template>

      <template #description="{ description }">
        <div class="sf-radio__description shipping__description">
          <div class="shipping__info">
            {{ description }}
          </div>
        </div>
      </template>
    </SfRadio>

    <div class="form__action go-payment">
      <SfButton
        type="button"
        class="sf-button color-secondary form__back-button"
        @click="$emit('cancel')"
      >
        {{ $t('Go back') }}
      </SfButton>
      <SfButton
        data-e2e="continue-to-payment"
        class="form__action-button"
        :disabled="!selectedMethod"
        type="button"
        @click="$emit('submit')"
      >
        {{ $t('Continue to payment') }}
      </SfButton>
    </div>
  </div>
</template>

<script>
import { SfButton, SfRadio, SfHeading } from '@storefront-ui/vue';
import { ref, onMounted } from '@nuxtjs/composition-api';
import { useCart, useShippingProvider } from '@vue-storefront/sylius';
export default {
  name: 'VsfShippingProvider',

  components: {
    SfButton,
    SfRadio,
    SfHeading,
  },
  props: {
    shippingMethods: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { cart } = useCart();
    const { save: saveShippingMethod, load: loadShippingMethod, state: shippingState } = useShippingProvider();
    const selectedMethod = ref(null);

    const updateShipping = (code) => {
      const shippingMethod = {
        orderTokenValue: cart.value.tokenValue,
        shippingMethodCode: code,
        shipmentId: String(cart.value.shipments._id),
      };
      saveShippingMethod({ shippingMethod });
    };

    const selectMethod = async (method) => {
      selectedMethod.value = method;
      updateShipping(method);
    };

    onMounted(async () => {

      await loadShippingMethod();

      if (shippingState.value) {
        selectedMethod.value = shippingState.value.code;
      }

      if (props.shippingMethods.value?.length) {
        selectedMethod.value = cart.value.shipments
          ? cart.value.shipments.method.code
          : null;
        if (selectedMethod.value) updateShipping(selectedMethod.value);
      }
    });

    return {
      selectedMethod,
      selectMethod,
    };
  },
};
</script>

<style lang="scss" scoped>
.go-payment {
  margin: var(--spacer-xl) 0 0 0;
}
.form {
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }

  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color: var(--c-white);
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}

.shipping {
  &__title {
    margin-top: 30px;
  }

  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
