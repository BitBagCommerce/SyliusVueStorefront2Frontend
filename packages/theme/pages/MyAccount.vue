<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      v-e2e="'my-account-content-pages'"
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="handleActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile">
          <MyProfile />
        </SfContentPage>

        <SfContentPage title="My addresses">
          <ShippingDetails />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory title="Order details">
        <SfContentPage title="Order history">
          <OrderHistory />
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import { ref, computed, onBeforeUnmount, onMounted } from '@vue/composition-api';
import { useUser } from '@vue-storefront/sylius';
import { useUiNotification } from '~/composables/';
import MyProfile from './MyAccount/MyProfile';
import ShippingDetails from './MyAccount/ShippingDetails';
import OrderHistory from './MyAccount/OrderHistory';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';

export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    ShippingDetails,
    OrderHistory
    // MyReviews
  },
  middleware: [
    'is-authenticated'
  ],
  setup(props, context) {
    const { $router, $route } = context.root;
    const { logout } = useUser();
    const { send } = useUiNotification();
    const isMobile = computed(() => mapMobileObserver().isMobile.get());
    const activePage = ref('');

    const changeActivePage = () => {
      const { pageName } = $route.params;

      if (pageName) {
        activePage.value = (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace('-', ' ');

        return;
      }

      if (!isMobile.value) {
        activePage.value = 'My profile';

        return;
      }

      activePage.value = '';
    };

    const handleActivePage = async (title) => {
      if (title === 'Log out') {
        await logout();
        $router.push(context.root.localePath({ name: 'home' }));
        send({ type: 'info', message: 'Logout successful' });
        return;
      }

      const slugifiedTitle = (title || '').toLowerCase().replace(' ', '-');
      const transformedPath = `/my-account/${slugifiedTitle}`;
      const localeTransformedPath = context.root.localePath(transformedPath);

      $router.push(localeTransformedPath);

      changeActivePage();
    };

    onMounted(() => {
      changeActivePage();
    });

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return { handleActivePage, activePage };
  },

  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          route: { link: '#' }
        },
        {
          text: 'My Account',
          route: { link: '#' }
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight:
      var(--font-weight--bold);
    --content-pages-sidebar-category-title-margin:
      var(--spacer-sm) var(--spacer-sm) var(--spacer-sm) var(--spacer-sm);
    ::v-deep .sf-list__item {
      padding: var(--spacer-sm) var(--spacer-lg);
    }
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
</style>
