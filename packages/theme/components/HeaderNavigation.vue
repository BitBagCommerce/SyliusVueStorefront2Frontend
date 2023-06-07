<template>
  <div>
    <SfLoader :class="{ loading }" :loading="loading">
      <div class="sf-header__navigation desktop" v-if="!loading">
        <SfHeaderNavigationItem
          v-for="(category, index) in allCategories"
          :key="index"
          class="nav-item"
          :data-e2e="`app-header-url_${category.slug}`"
          :label="category.name"
          :link="localePath(`/c/${category.slug}`)"
        />
      </div>
    </SfLoader>
    <SfModal class="smartphone-only" :visible="isMobileMenuOpen">
      <template #modal-bar>
        <SfBar
          class="sf-modal__bar smartphone-only"
          :close="true"
          :title="$t('Menu')"
          @click:close="toggleMobileMenu"
        />
      </template>
      <SfHeaderNavigationItem>
        <template #mobile-navigation-item>
          <MobileCategoryItem :categories="allCategories" />
        </template>
      </SfHeaderNavigationItem>
    </SfModal>
  </div>
</template>

<script>
import {
  SfMenuItem,
  SfModal,
  SfAccordion,
  SfList,
  SfCircleIcon,
  SfLoader,
  SfBar,
} from '@storefront-ui/vue';
import { onMounted, onUnmounted, computed } from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';
import { useCategory, categoryGetters } from '@vue-storefront/sylius';
import MobileCategoryItem from './MobileCategoryItems.vue';
export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal,
    SfAccordion,
    SfList,
    SfCircleIcon,
    SfLoader,
    SfBar,
    MobileCategoryItem,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const {
      categories,
      search: categoriesListSearch,
      loading,
    } = useCategory('AppHeader:CategoryList');
    const allCategories = computed(() =>
      categoryGetters.getChildren(null, categories.value)
    );

    onMounted(async () => {
      window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && isMobileMenuOpen.value)
          toggleMobileMenu();
      });
      await categoriesListSearch({});
    });

    onUnmounted(() => {
      window.removeEventListener('resize', () => {
        if (window.innerWidth > 1024 && isMobileMenuOpen.value)
          toggleMobileMenu();
      });
    });

    return {
      categories,
      categoryGetters,
      allCategories,
      isMobileMenuOpen,
      toggleMobileMenu,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }

  &__menu-item {
    color: var(--c-link);
    font-weight: var(--font-weight--medium);
    padding: var(--spacer-sm);
  }
}

.sf-modal {
  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}

.loading {
  height: var(--spacer-2xl);
  width: var(--spacer-2xl);
}
</style>
