<template>
  <div class="sf-header__navigation desktop" v-if="!isMobile">
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${category.slug}`"
      :label="category.name"
      :link="localePath(`/c/${category.slug}`)"
    />
  </div>
  <SfModal v-else :visible="isMobileMenuOpen">
    <SfHeaderNavigationItem>
      <template #mobile-navigation-item>
        <SfAccordion
          class="smartphone-only"
          :open="activeAccordionItem"
          :multiple="false"
        >
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="nav-item"
          >
            <SfAccordionItem
              v-if="category.children.length"
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
                      aria-label="Show list"
                      icon="chevron_right"
                      :class="`
                        sf-circle-icon__icon
                        nav-item__header-button
                        ${activeAccordionItem === category.name ? 'active' : ''}
                      `"
                      @click="toggleAccordionItem(category.name)"
                    />
                </div>
              </template>
              <template>
                <SfList class="nav-item__list">
                  <SfListItem
                    v-for="child in category.children"
                    :key="child.name"
                    class="nav-item__list-item"
                  >
                    <NuxtLink :to="`/c/${child.slug}`" @click.native="toggleMobileMenu">
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
</template>

<script>
import { onSSR } from '@vue-storefront/core';
import {
  SfMenuItem,
  SfModal,
  SfAccordion,
  SfList,
  SfCircleIcon
} from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
import { useUiState } from '~/composables';
import { useCategory } from '@vue-storefront/sylius';
export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal,
    SfAccordion,
    SfList,
    SfCircleIcon
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const {
      categories,
      search: categoriesListSearch
    } = useCategory('AppHeader:CategoryList');
    const activeAccordionItem = ref('');

    const toggleAccordionItem = (item) => {
      activeAccordionItem.value = item;
    };

    onSSR(async () => {
      await categoriesListSearch({
        level: 1
      });
    });

    return {
      categories,
      isMobileMenuOpen,
      toggleMobileMenu,
      toggleAccordionItem,
      activeAccordionItem
    };
  }
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
        transition: transform .3s ease;
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
</style>
