<template>
  <DropdownButton
    v-if="isAuthenticated"
    label="wishlist"
    :buttonStyle="buttonStyle === BUTTON_STYLES.ICON ? 'unstyled' : buttonStyle"
    :content="WishlistDropdown"
    :props="dropdownProps"
    class="ignore-click"
    :class="{ 'color-danger': buttonStyle !== BUTTON_STYLES.BUTTON }"
  >
    <SfIcon
      v-if="buttonStyle !== BUTTON_STYLES.BUTTON"
      :icon="isInAnyWishlist ? 'heart_fill' : 'heart'"
      :color="buttonStyle === BUTTON_STYLES.ICON ? '' : 'white'"
      size="1.25rem"
      class="sf-header__icon"
    />

    <template v-else>
      {{ $t('Add to wishlist') }}
    </template>
  </DropdownButton>
</template>

<script setup>
import DropdownButton from '../Dropdown/DropdownButton.vue';
import WishlistDropdown from './WishlistDropdown.vue';
import { computed } from '@nuxtjs/composition-api';
import { useWishlists, useUser } from '@vue-storefront/sylius';
import { SfIcon } from '@storefront-ui/vue';

const BUTTON_STYLES = {
  BUTTON: 'button',
  CIRCLE: 'circle',
  ICON: 'icon',
};

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  buttonStyle: {
    type: String,
    default: 'button',
  },
});

const { wishlists, isInWishlist } = useWishlists();
const { isAuthenticated } = useUser();

const dropdownProps = computed(() => ({
  wishlists,
  product: props.product,
}));
const isInAnyWishlist = computed(() =>
  wishlists.value
    ? wishlists.value.some((wishlist) => isInWishlist(props.product, wishlist))
    : false
);
</script>

<style scoped lang="scss">
.ignore-click * {
  pointer-events: none !important;
}
</style>
