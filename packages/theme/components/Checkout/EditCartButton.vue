<template>
  <div class="view-cart" @click="toggleCartSidebar">{{ $t('Edit cart') }}</div>
</template>

<script>
import { useUiState } from '~/composables';
export default {
  name: 'EditCartButton',
  setup(props, context) {
    const t = (key) => context.root.$i18n.t(key);
    const { toggleCartSidebar } = useUiState();
    return {
      t,
      toggleCartSidebar,
    };
  },
};
</script>

<style lang="scss" scoped>
.view-cart {
  display: flex;
  align-items: center;
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  color: var(--c-primary);
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
