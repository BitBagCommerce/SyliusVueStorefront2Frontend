<template>
  <div class="checkout-title-container">
    <SfHeading
      :data-e2e="e2e"
      :level="3"
      :title="title"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfButton class="edit-cart sf-button--pure" @click="toggleCartSidebar">
      {{ $t('Edit cart') }}
    </SfButton>
  </div>
</template>

<script>
import { SfHeading, SfButton } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
export default {
  name: 'CheckoutHeader',
  components: {
    SfHeading,
    SfButton,
  },
  props: {
    e2e: {
      type: String,
      required: false,
    },
    title: {
      type: String,
    },
  },
  setup() {
    const { toggleCartSidebar } = useUiState();
    return {
      toggleCartSidebar,
    };
  },
};
</script>

<style lang="scss" scoped>
.checkout-title-container {
  display: flex;
  justify-content: space-between;
  padding: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.edit-cart {
  display: flex;
  align-items: center;
  color: var(--c-primary);
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
