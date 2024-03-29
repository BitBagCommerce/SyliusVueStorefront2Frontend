<template>
  <!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <SfBottomNavigation class="navigation-bottom smartphone-only">
    <SfBottomNavigationItem
      :class="route.path == '/' ? 'sf-bottom-navigation__item--active' : ''"
      icon="home"
      size="20px"
      :label="$t('Home')"
      @click="handleHomeClick"
    />
    <SfBottomNavigationItem
      icon="menu"
      size="20px"
      :label="$t('Menu')"
      @click="toggleMobileMenu"
    />
    <SfBottomNavigationItem
      v-if="isAuthenticated"
      icon="heart"
      size="20px"
      :label="$t('Wishlist')"
      @click="toggleWishlistSidebar"
    />
    <SfBottomNavigationItem
      :icon="accountIcon"
      size="20px"
      :label="$t('Account')"
      @click="handleAccountClick"
    />
    <!-- TODO: add logic for label - if on Home then Basket, if on PDC then AddToCart etc. -->
    <SfBottomNavigationItem
      :label="$t('Cart')"
      icon="add_to_cart"
      @click="toggleCartSidebar"
    >
      <template #icon>
        <SfCircleIcon class="cart-button" :aria-label="$t('Add to cart')">
          <SfIcon
            icon="add_to_cart"
            color="white"
            size="25px"
            :style="{ margin: '0 0 0 -2px' }"
          />
          <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">{{
            cartTotalItems
          }}</SfBadge>
        </SfCircleIcon>
      </template>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import {
  SfBottomNavigation,
  SfIcon,
  SfCircleIcon,
  SfBadge,
} from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useUser, useCart, cartGetters } from '@vue-storefront/sylius';
import { computed, useRoute, useRouter } from '@nuxtjs/composition-api';

export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
    SfBadge,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
      toggleMobileMenu,
      isMobileMenuOpen,
    } = useUiState();
    const { isAuthenticated } = useUser();
    const { cart } = useCart();
    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return router.push('/my-account');
      }
      toggleLoginModal();
    };

    const handleHomeClick = () => {
      isMobileMenuOpen.value ? toggleMobileMenu() : false;
      router.push('/');
    };

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);

      return count ? count.toString() : null;
    });

    return {
      route,
      isMobileMenuOpen,
      toggleWishlistSidebar,
      toggleCartSidebar,
      toggleMobileMenu,
      cartTotalItems,
      accountIcon,
      handleAccountClick,
      handleHomeClick,
      isAuthenticated,
    };
  },
};
</script>
<style lang="scss" scoped>
.navigation-bottom {
  z-index: 11;
}
.cart-button {
  position: relative;
}
.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
