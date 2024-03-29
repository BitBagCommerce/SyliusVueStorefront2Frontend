<template>
  <div>
    <SfHeader
      class="sf-header--has-mobile-search"
      :class="{ 'header-on-top': isSearchOpen || isLangModalOpen }"
      :isNavVisible="isMobileMenuOpen"
    >
      <!-- TODO: add mobile view buttons after SFUI team PR -->
      <template #logo>
        <nuxt-link :to="localePath({ name: 'home' })" class="sf-header__logo">
          <SfImage
            src="/icons/logo.svg"
            alt="Vue Storefront Next"
            height="34"
            width="35"
            :placeholder="loader"
            class="sf-header__logo-image"
          />
        </nuxt-link>
      </template>
      <template #navigation>
        <HeaderNavigation />
      </template>
      <template #aside> </template>
      <template #header-icons>
        <div class="sf-header__icons">
          <SfButton
            data-e2e="app-header-account"
            class="sf-button--pure sf-header__action"
            @click="handleAccountClick"
          >
            <SfIcon :icon="accountIcon" size="1.25rem" />
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="toggleWishlistSidebar"
            v-if="isAuthenticated"
          >
            <SfIcon class="sf-header__icon" icon="heart" size="1.25rem" />
          </SfButton>
          <SfButton
            data-e2e="app-header-cart"
            class="sf-button--pure sf-header__action"
            @click="toggleCartSidebar"
          >
            <SfIcon class="sf-header__icon" icon="empty_cart" size="1.25rem" />
            <SfBadge
              v-if="cartTotalItems > 0"
              key="cart_badge"
              class="sf-badge--number cart-badge"
              >{{ cartTotalItems }}</SfBadge
            >
          </SfButton>
        </div>
      </template>
      <template #search>
        <div class="sf-header__search">
          <SfSearchBar
            ref="searchBarRef"
            :placeholder="$t('Search for items')"
            :aria-label="$t('Search')"
            class="sf-header__search--bar"
            :value="term"
            :disabled="isSearchDisabled"
            @input="term = $event"
            @keydown.enter="handleSearch(), (isSearchDisabled = true)"
            @focus="openSearch"
            @blur="isSearchFocus = false"
            @keydown.esc="closeSearch"
          >
            <template #icon>
              <SfButton
                v-if="!!term"
                class="sf-search-bar__button sf-button--pure"
                @click="closeOrFocusSearchBar"
              >
                <span class="sf-search-bar__icon">
                  <SfIcon color="var(--c-text)" size="18px" icon="cross" />
                </span>
              </SfButton>
              <SfButton
                v-else
                class="sf-search-bar__button sf-button--pure"
                @click="
                  isSearchOpen ? (isSearchOpen = false) : (isSearchOpen = true)
                "
              >
                <span class="sf-search-bar__icon">
                  <SfIcon color="var(--c-text)" size="20px" icon="search" />
                </span>
              </SfButton>
            </template>
          </SfSearchBar>
          <LocaleSelector
            @click="setIsLangModalOpen"
            class="smartphone-only sf-header__search--locale"
          />
        </div>
      </template>
    </SfHeader>
    <SearchResults
      :visible="isSearchOpen"
      :result="result"
      @close="closeSearch"
      @removeSearchResults="removeSearchResults"
      v-click-outside="closeSearch"
    />
    <SfOverlay :visible="isSearchOpen || isLangModalOpen" />
  </div>
</template>

<script>
import {
  SfHeader,
  SfImage,
  SfIcon,
  SfButton,
  SfBadge,
  SfSearchBar,
  SfOverlay,
} from '@storefront-ui/vue';
import { useUiState, useUiHelpers } from '~/composables';
import {
  useCart,
  useUser,
  cartGetters,
  useProduct,
  useCategory,
} from '@vue-storefront/sylius';
import { computed, ref, watch, useRoute } from '@nuxtjs/composition-api';
import LocaleSelector from './LocaleSelector';
import SearchResults from '~/components/SearchResults';
import HeaderNavigation from './HeaderNavigation';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import debounce from 'lodash.debounce';
import loader from '~/static/icons/loader.svg';

export default {
  components: {
    SfHeader,
    SfImage,
    LocaleSelector,
    SfIcon,
    SfButton,
    SfBadge,
    SfSearchBar,
    SearchResults,
    SfOverlay,
    HeaderNavigation,
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const { search: searchProducts, products: searchProductsResults } =
      useProduct('AppHeader');
    const { search: searchCategories, categories: searchCategoriesResults } =
      useCategory('AppHeader');
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
      isMobileMenuOpen,
    } = useUiState();
    const route = useRoute();
    const { setTermForUrl, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated } = useUser();
    const { cart } = useCart();
    const term = ref(getFacetsFromURL().phrase);
    const isSearchOpen = ref(false);
    const isSearchFocus = ref(false);
    const isSearchDisabled = ref(false);
    const searchBarRef = ref(null);
    const result = ref(null);
    const isLangModalOpen = ref(false);

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );

    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        const localeAccountPath = root.localePath({ name: 'my-account' });
        return root.$router.push(localeAccountPath);
      }

      toggleLoginModal();
    };

    const openSearch = () => {
      isSearchOpen.value = true;
      isSearchFocus.value = true;
    };

    const closeSearch = debounce(() => {
      if (!isSearchOpen.value || isSearchFocus.value) return;
      term.value = '';
      isSearchOpen.value = false;
    }, 100);

    const handleSearch = debounce(async () => {
      await Promise.all([
        searchProducts({ search: term.value.trim() }),
        searchCategories({ categoryName: term.value.trim() }),
      ]);

      result.value = {
        products: searchProductsResults.value.products,
        categories: searchCategoriesResults.value,
      };
      isSearchDisabled.value = false;
    }, 1000);

    const closeOrFocusSearchBar = () => {
      term.value = '';
      return searchBarRef.value.$el.children[0].focus();
    };

    const setIsLangModalOpen = (val) => (isLangModalOpen.value = val);

    watch(
      () => term.value,
      (newVal, oldVal) => {
        const shouldSearchBeOpened =
          term.value.length > 0 &&
          ((!oldVal && newVal) ||
            (newVal.length !== oldVal.length && isSearchOpen.value === false));

        if (shouldSearchBeOpened) isSearchOpen.value = true;
        if (isSearchOpen.value) handleSearch();
      }
    );

    watch(() => route.value, closeSearch);

    const removeSearchResults = () => {
      result.value = null;
    };

    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      setTermForUrl,
      term,
      isSearchOpen,
      isSearchFocus,
      isSearchDisabled,
      openSearch,
      closeSearch,
      handleSearch,
      result,
      closeOrFocusSearchBar,
      searchBarRef,
      isMobileMenuOpen,
      removeSearchResults,
      isLangModalOpen,
      setIsLangModalOpen,
      loader,
      isAuthenticated,
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-header {
  --header-padding: var(--spacer-sm);

  @include for-desktop {
    --header-padding: 0 var(--spacer-sm);
  }

  @include for-mobile {
    --header-flex-wrap: no-wrap;

    &__search {
      display: flex;
      justify-content: flex-end;

      &--bar {
        flex-grow: 1;
        margin: 0 1rem;
      }
    }
  }

  &__logo-image {
    height: 100%;
  }
}
.header-on-top {
  z-index: 2;
}
.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}

::v-deep .sf-modal__container {
  z-index: 3;
}
</style>
