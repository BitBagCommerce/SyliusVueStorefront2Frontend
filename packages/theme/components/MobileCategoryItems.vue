<template>
  <SfAccordion
    class="smartphone-only"
    :open="activeAccordionItem"
    :multiple="false"
  >
    <div v-for="category in categories" :key="category.id" class="nav-item">
      <SfAccordionItem v-if="category.children.length" :header="category.name">
        <template #header>
          <div class="nav-item__header">
            <SfMenuItem
              :label="category.name"
              class="
                sf-header-navigation-item__menu-item
                nav-item__header-title
              "
              icon=""
              :link="localePath(`/c/${category.slug}`)"
              @click.native="toggleMobileMenu"
            />
            <SfIcon
              icon-size="12px"
              aria-label="Show list"
              icon="chevron_right"
              class="nav-item__header-button"
              :class="{ active: activeAccordionItem === category.name }"
              @click="toggleAccordionItem(category.name)"
            />
          </div>
        </template>
        <template>
          <MobileCategoryItems :categories="category.children" />
        </template>
      </SfAccordionItem>
      <SfMenuItem
        v-else
        :label="category.name"
        class="sf-header-navigation-item__menu-item nav-item__header"
        icon=""
        :link="localePath(`/c/${category.slug}`)"
        @click.native="toggleMobileMenu"
      />
    </div>
  </SfAccordion>
</template>

<script>
import { ref } from '@nuxtjs/composition-api';
import { SfMenuItem, SfAccordion, SfIcon } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
export default {
  name: 'MobileCategoryItems',
  components: {
    SfMenuItem,
    SfAccordion,
    SfIcon,
  },
  props: {
    categories: {
      type: Array,
    },
  },
  setup() {
    const { toggleMobileMenu } = useUiState();
    const activeAccordionItem = ref('');

    const toggleAccordionItem = (item) => {
      activeAccordionItem.value = item;
    };

    return {
      activeAccordionItem,
      toggleAccordionItem,
      toggleMobileMenu,
    };
  },
};
</script>

<style lang="scss">
.nav-item {
  white-space: nowrap;
  padding: var(--spacer-sm) 0;

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
</style>
