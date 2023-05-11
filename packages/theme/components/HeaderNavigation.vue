<template>
  <div>
    <SfLoader :class="{ loading }" :loading="loading">
      <div class="sf-header__navigation desktop" v-if='!loading'>
        <SfHeaderNavigationItem
          v-for="(category, index) in topLevelCategories"
          :key="index"
          class="nav-item"
          v-e2e="`app-header-url_${category.slug}`"
          :label="category.name"
          :link="localePath(`/c/${category.slug}`)"
        />
      </div>
    </SfLoader>
    <SfModal class="smartphone-only" :visible="isMobileMenuOpen">
      <SfHeaderNavigationItem>
        <template #mobile-navigation-item>
          <SfAccordion
            class="smartphone-only"
            :open="activeAccordionItem"
            :multiple="false"
          >
            <div
              v-for="(category, index) in topLevelCategories"
              :key="index"
              class="nav-item"
            >
              <SfAccordionItem
                v-if="categoryGetters.getChildren(category, categories).length"
                :header="category.name"
              >
                <template #header>
                  <div class="nav-item__header">
                    <SfMenuItem
                      :label="category.name"
                      class="sf-header-navigation-item__menu-item nav-item__header-title"
                      icon=""
                      :link="localePath(`/c/${category.slug}`)"
                      @click.native="toggleMobileMenu"
                    />

                    <SfCircleIcon
                      icon-size="12px"
                      :aria-label="$t('Show list')"
                      icon="chevron_right"
                      :class="`
                          sf-circle-icon__icon
                          nav-item__header-button
                          ${
                            activeAccordionItem === category.name
                              ? 'active'
                              : ''
                          }
                        `"
                      @click="toggleAccordionItem(category.name)"
                    />
                  </div>
                </template>
                <template>
                  <SfList class="nav-item__list">
                    <SfListItem
                      v-for="child in categoryGetters.getChildren(category, categories)"
                      :key="child.name"
                      class="nav-item__list-item"
                    >
                      <NuxtLink
                        :to="`/c/${child.slug}`"
                        @click.native="toggleMobileMenu"
                      >
                        {{ child.name }}
                      </NuxtLink>
                    </SfListItem>
                  </SfList>
                </template>
              </SfAccordionItem>

              <SfMenuItem
                v-else
                :label="category.name"
                class="sf-header-navigation-item__menu-item"
                icon=""
                :link="localePath(`/c/${category.slug}`)"
                @click.native="toggleMobileMenu"
              />
            </div>
          </SfAccordion>
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
} from '@storefront-ui/vue';
import { onMounted, onUnmounted, ref, computed } from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';
import { useCategory, categoryGetters } from '@vue-storefront/sylius';
export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal,
    SfAccordion,
    SfList,
    SfCircleIcon,
    SfLoader,
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
      loading
    } = useCategory('AppHeader:CategoryList');
    const activeAccordionItem = ref('');

    const toggleAccordionItem = (item) => {
      activeAccordionItem.value = item;
    };

    const topLevelCategories = computed(() => categoryGetters.getTopLevelCategories(categories.value));

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
      topLevelCategories,
      isMobileMenuOpen,
      toggleMobileMenu,
      toggleAccordionItem,
      activeAccordionItem,
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

.nav-item {
  white-space: nowrap;
  padding: var(--spacer-sm) 0;
  border-bottom: 1px solid var(--c-light);

  &__header {
    padding: 0 var(--spacer-sm);
    display: flex;

    &-title {
      flex-grow: 1;
      padding: 0;
    }

    &-button {
      margin-bottom: var(--spacer-xs);

      .sf-icon-path {
        transition: transform 0.3s ease;
      }

      &.active .sf-icon-path {
        transform: rotate(90deg);
      }
    }
  }

  &__list-item {
    padding: var(--spacer-xs) var(--spacer-sm);
  }
}

.sf-modal {
  ::v-deep &__bar {
    display: none;
  }

  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}

.loading {
  height: var(--spacer-2xl);
  width: var(--spacer-2xl);
}
</style>
