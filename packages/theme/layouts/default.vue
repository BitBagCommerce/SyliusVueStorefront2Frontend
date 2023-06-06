<template>
  <div>
    <LazyHydrate when-visible>
      <TopBar class="desktop-only" />
    </LazyHydrate>

    <AppHeader />

    <div id="layout">
      <nuxt :key="route.fullPath" />

      <BottomNavigation />
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
      <VariantSelector />
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import AppFooter from '~/components/AppFooter.vue';
import TopBar from '~/components/TopBar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';
import { onSSR } from '@vue-storefront/core';
import { useRoute, onMounted } from '@nuxtjs/composition-api';
import {
  useCart,
  useStore,
  useUser,
  useWishlists,
} from '@vue-storefront/sylius';
import VariantSelector from '~/components/VariantSelector.vue';

export default {
  name: 'DefaultLayout',

  components: {
    LazyHydrate,
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification,
    VariantSelector,
  },

  middleware: ['is-connected'],

  setup() {
    const route = useRoute();
    const { load: loadStores } = useStore();
    const { load: loadUser, isAuthenticated } = useUser();
    const { cart, load: loadCart } = useCart();
    const { load: loadWishlists } = useWishlists();

    onSSR(async () => {
      await loadUser();
    });

    onMounted(async () => {
      await loadStores();
      if (isAuthenticated.value) await loadWishlists();
      if (!cart.value) {
        await loadCart();
      }
    });

    return {
      route,
    };
  },
};
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles';

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}
body {
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: var(--c-link);
  &:hover {
    color: var(--c-link-hover);
  }
}
h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}
h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}
h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}
h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}

.sf-input:not(.sf-input--filled) {
  input {
    padding-left: 1%;
  }

  .sf-input__label {
    top: 60%;
    left: 1%;
  }
}

.sf-accordion-item.no-children {
  .sf-accordion-item__chevron {
    display: none;
  }
  .sf-accordion-item__content {
    padding: 0;
  }
}

.sf-accordion-item__content {
  .sf-list__item {
    .sf-menu-item {
      text-align: left;
    }
  }
}

.sf-accordion-item-active {
  .sf-accordion-item__header {
    font-weight: var(--font-weight--bold);
  }
}

.sf-header-navigation-item__item--desktop {
  @include for-mobile {
    display: none;
  }
}

.sf-accordion-item__header.is-open {
  --accordion-item-header-border-width: 0;
  --accordion-item-header-color: initial;
  --chevron-color: initial;
}
</style>
