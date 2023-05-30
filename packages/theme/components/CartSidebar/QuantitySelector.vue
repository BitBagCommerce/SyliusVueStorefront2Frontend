<template>
  <div class="quantity" v-click-outside="() => handleCancel()">
    <SfButton
      v-if="!isConfirmOpen"
      class="sf-button--pure quantity__button"
      :disabled="disabled"
      @click="handleInput(inputQty - 1, false)"
    >
      <SfIcon icon="minus" size="1rem" :color="disabled ? 'lightgrey' : ''" />
    </SfButton>

    <SfButton
      v-else
      class="sf-button--pure quantity__button quantity__button--danger"
      @click="handleCancel()"
    >
      <SfIcon
        icon="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
        viewBox="0 0 320 512"
        size="1rem"
        color="white"
      />
    </SfButton>

    <SfInput
      class="sf-input--filled quantity__input"
      type="number"
      @input="handleInput($event, true)"
      :value="inputQty"
      :disabled="disabled"
    />

    <SfButton
      v-if="!isConfirmOpen"
      class="sf-button--pure quantity__button"
      :disabled="disabled"
      @click="handleInput(inputQty + 1, false)"
    >
      <SfIcon icon="plus" size="1rem" :color="disabled ? 'lightgrey' : ''" />
    </SfButton>

    <SfButton
      v-else
      class="sf-button--pure quantity__button quantity__button--primary"
      @click="handleConfirm()"
    >
      <SfIcon
        viewBox="0 0 512 512"
        icon="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
        size="1rem"
        color="white"
      />
    </SfButton>
  </div>
</template>

<script>
import { SfButton, SfInput, SfIcon } from '@storefront-ui/vue';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import { ref } from '@nuxtjs/composition-api';

export default {
  name: 'QuantitySelector',
  props: {
    qty: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 999,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SfButton,
    SfInput,
    SfIcon,
  },
  directives: { clickOutside },
  setup(props, { emit }) {
    const inputQty = ref(props.qty);
    const isConfirmOpen = ref(false);

    const handleConfirm = () => {
      emit('quantity-change', inputQty.value);
      isConfirmOpen.value = false;
    };

    const handleCancel = () => {
      if (isConfirmOpen.value) {
        inputQty.value = props.qty;
        isConfirmOpen.value = false;
      }
    };

    const handleInput = (input, isConfirm) => {
      isConfirmOpen.value = isConfirm;

      inputQty.value = Number(input);

      if (props.max !== null && input > props.max) inputQty.value = props.max;

      if (input < props.min) inputQty.value = props.min;

      if (!isConfirm) handleConfirm();
    };

    return {
      inputQty,
      isConfirmOpen,
      handleInput,
      handleConfirm,
      handleCancel,
    };
  },
};
</script>

<style lang="scss" scoped>
.quantity {
  display: flex;
  min-width: 100px;
  flex-shrink: 1;

  &__input {
    --input-padding: 0.25rem;
    --input-font-size: var(--font-size--xsm);
    text-align: center;
    z-index: 1;
  }

  &__button {
    padding: 0 0.3rem;
    background-color: var(--c-light);
    z-index: 0;

    &--primary {
      color: white;
      background-color: var(--c-primary);
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    &--danger {
      color: white;
      background-color: var(--c-danger);
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    ::v-deep .sf-icon-path {
      width: auto;
    }
  }
}
</style>
