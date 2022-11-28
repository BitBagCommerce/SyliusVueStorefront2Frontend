<template>
  <div class="quantity">
    <SfButton v-if="!isConfirmOpen" class="sf-button--pure quantity__button" @click="handleInput(inputQty - 1, false)">
      <SfIcon icon="minus" size="1rem" />
    </SfButton>

    <SfButton v-else class="sf-button--pure quantity__button" @click="handleCancel()">
      <SfIcon
        icon="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
        viewBox="-80 30 550 550"
        size="1rem"
      />
    </SfButton>

    <SfInput class="sf-input--filled quantity__input" type="number" @input="handleInput($event, true)" @blur="handleConfirm()" :value="inputQty" :disabled="disabled" />

    <SfButton v-if="!isConfirmOpen" class="sf-button--pure quantity__button" @click="handleInput(inputQty + 1, false)">
      <SfIcon icon="plus" size="1rem" />
    </SfButton>

    <SfButton v-else class="sf-button--pure quantity__button" @click="handleConfirm()">
      <SfIcon icon="check" size="1rem" />
    </SfButton>
  </div>
</template>

<script>
import {
  SfButton,
  SfInput,
  SfIcon
} from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';

export default {
  name: 'QuantitySelector',
  props: {
    qty: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SfButton,
    SfInput,
    SfIcon
  },
  emits: ['input'],
  setup(props, { emit }) {
    const inputQty = ref(props.qty);
    const isConfirmOpen = ref(false);

    const handleConfirm = () => {
      emit('input', inputQty.value);
      isConfirmOpen.value = false;
    };

    const handleCancel = () => {
      inputQty.value = props.qty;
      isConfirmOpen.value = false;
    };

    const handleInput = (input, isConfirm) => {
      isConfirmOpen.value = isConfirm;
      inputQty.value = input;

      if (!isConfirm) handleConfirm();
    };

    return {
      inputQty,
      isConfirmOpen,
      handleInput,
      handleConfirm,
      handleCancel
    };
  }
};
</script>

<style lang="scss" scoped>
.quantity {
  display: flex;

  &__input {
    --input-padding: .25rem;
    --input-font-size: var(--font-size--xsm);
    text-align: center;
  }

  &__button {
    padding: 0 .1rem;
    background-color: var(--c-light);
  }
}
</style>
