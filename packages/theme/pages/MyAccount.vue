<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      data-e2e="my-account-content-pages"
      :title="$t('My Account')"
      :active="activePage"
      class="my-account"
      @click:change="handleActivePage"
    >
      <SfContentCategory :title="$t('Personal details')">
        <SfContentPage :title="$t('My profile')">
          <MyProfile />
        </SfContentPage>

        <SfContentPage :title="$t('My addresses')">
          <ShippingDetails />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory :title="$t('Order details')">
        <SfContentPage :title="$t('Order history')">
          <OrderHistory />
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage :title="$t('Log out')" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import { ref, onMounted, onUnmounted, watch } from '@nuxtjs/composition-api';
import { useUser } from '@vue-storefront/sylius';
import { useUiNotification } from '~/composables/';
import MyProfile from './MyAccount/MyProfile';
import ShippingDetails from './MyAccount/ShippingDetails';
import OrderHistory from './MyAccount/OrderHistory';

export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    ShippingDetails,
    OrderHistory,
    // MyReviews
  },
  middleware: ['is-authenticated'],
  setup(props, { root }) {
    const { $router, $route } = root;
    const { logout } = useUser();
    const { send } = useUiNotification();
    const activePage = ref('');
    const isMobile = ref(false);

    const changeActivePage = () => {
      const { pageName } = $route.params;

      if (pageName) {
        activePage.value = (
          pageName.charAt(0).toUpperCase() + pageName.slice(1)
        ).replace('-', ' ');

        return;
      }

      if (!isMobile.value) {
        activePage.value = 'My profile';

        return;
      }

      activePage.value = '';
    };

    const handleActivePage = async (title) => {
      if (title === root.$t('Log out')) {
        await logout();
        $router.push(root.localePath({ name: 'home' }));
        send({ type: 'info', message: root.$t('Logout successful') });
        return;
      }

      const slugifiedTitle = (title || '').toLowerCase().replace(' ', '-');
      const transformedPath = `/my-account/${slugifiedTitle}`;
      const localeTransformedPath = root.localePath(transformedPath);

      $router.push(localeTransformedPath);

      changeActivePage();
    };

    const handleIsMobile = () => {
      if (window.innerWidth < 1024) {
        isMobile.value = true;

        return;
      }

      isMobile.value = false;
    };

    watch(isMobile, () => changeActivePage());

    onMounted(() => {
      changeActivePage();
      handleIsMobile();
      window.addEventListener('resize', handleIsMobile);
    });

    onUnmounted(() => window.removeEventListener('resize', handleIsMobile));

    const breadcrumbs = [
      {
        text: root.$t('Home'),
        link: '#',
      },
      {
        text: root.$t('My Account'),
        link: '#',
      },
    ];

    return { handleActivePage, activePage, breadcrumbs };
  },
};
</script>

<style lang="scss" scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--bold
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-sm);
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
