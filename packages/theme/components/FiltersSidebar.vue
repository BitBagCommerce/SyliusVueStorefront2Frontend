<template>
  <div id="filters">
    <SfSidebar
      :visible="isFilterSidebarOpen"
      :title="$t('Filters')"
      class="sidebar-filters"
      @close="toggleFilterSidebar"
    >
      <SfLoader :class="{ loading }" :loading="loading">
        <div v-if="!loading">
          <div class="filters desktop-only">
            <div v-for="(facet, i) in facets" :key="i">
              <div v-if="facet.type === 'text'">
                <SfHeading
                  :level="4"
                  :title="facet.label"
                  class="filters__title sf-heading--left"
                  :key="`filter-title-${facet.id}`"
                />
                <SfFilter
                  v-for="option in facet.options"
                  :key="`${facet.id}-${option.stringValue}`"
                  :label="option.stringValue"
                  :selected="isFilterSelected(facet, option)"
                  class="filters__item"
                  @change="() => selectFilter(facet, option)"
                />
              </div>
              <div v-else>
                <div class="filters__wrapper filters__title sf-heading--left">
                  <SfHeading
                    :level="4"
                    :title="facet.label"
                    :key="`filter-title-${facet.id}`"
                  />
                  <SfCircleIcon
                    v-if="isRangeSelected(facet)"
                    icon-size="12px"
                    :aria-label="$t('Remove filter')"
                    icon="cross"
                    class="sf-circle-icon__icon desktop-only"
                    @click="removeRange(facet)"
                  />
                </div>
                <SfRange
                  :config="{
                    start: getRange(facet),
                    range: { min: 0, max: 20 },
                    step: 1,
                    margin: 1,
                    tooltips: true,
                    connect: true,
                  }"
                  class="filters__range"
                  @change="setPrice"
                />
              </div>
            </div>
            <SfHeading
              :level="4"
              :title="$t('Price')"
              class="filters__title sf-heading--left"
            />
            <SfRange
              :config="{
                start: priceRange,
                range: maxPrice,
                tooltips: true,
                connect: true,
              }"
              class="filters__range"
              @change="setPrice"
            />
          </div>
          <SfAccordion class="filters smartphone-only">
            <div v-for="(facet, i) in facets" :key="i">
              <div v-if="facet.type === 'text'">
                <SfAccordionItem
                  :key="`filter-title-${facet.id}`"
                  :header="facet.label"
                  class="filters__accordion-item"
                >
                  <SfFilter
                    v-for="option in facet.options"
                    :key="`${facet.id}-${option.stringValue}`"
                    :label="option.stringValue"
                    :selected="isFilterSelected(facet, option)"
                    class="filters__item"
                    @change="() => selectFilter(facet, option)"
                  />
                </SfAccordionItem>
              </div>
              <div v-else>
                <div class="filters__wrapper filters__title sf-heading--left">
                  <SfHeading
                    :level="4"
                    :title="facet.label"
                    :key="`filter-title-${facet.id}`"
                  />
                  <SfCircleIcon
                    v-if="isRangeSelected(facet)"
                    icon-size="12px"
                    :aria-label="$t('Remove filter')"
                    icon="cross"
                    class="sf-circle-icon__icon desktop-only"
                    @click="removeRange(facet)"
                  />
                </div>
                <SfRange
                  :config="{
                    start: getRange(facet),
                    range: { min: 0, max: 20 },
                    step: 1,
                    margin: 1,
                    tooltips: true,
                    connect: true,
                  }"
                  class="filters__range"
                  @change="setPrice"
                />
              </div>
            </div>
            <SfHeading
              :level="4"
              :title="$t('Price')"
              class="filters__title sf-heading--left"
            />
            <SfRange
              :config="{
                start: priceRange,
                range: maxPrice,
                tooltips: true,
                connect: true,
              }"
              class="filters__range"
              @change="setPrice"
            />
          </SfAccordion>
        </div>
      </SfLoader>
      <template #content-bottom>
        <div class="filters__buttons">
          <SfButton class="sf-button--full-width" @click="applyFilters">
            {{ $t('Done') }}
          </SfButton>
          <SfButton
            class="sf-button--full-width filters__button-clear"
            @click="clearFilters"
          >
            {{ $t('Clear all') }}
          </SfButton>
        </div>
      </template>
    </SfSidebar>
  </div>
</template>

<script>
import {
  SfSidebar,
  SfButton,
  SfHeading,
  SfFilter,
  SfAccordion,
  SfColor,
  SfRange,
  SfCircleIcon,
  SfLoader,
} from '@storefront-ui/vue';

import {
  ref,
  computed,
  onMounted,
  watch,
  useRoute,
} from '@nuxtjs/composition-api';
import { useAttributes, useProductsNotFiltered } from '@vue-storefront/sylius';
import { useUiHelpers, useUiState } from '~/composables';
import Vue from 'vue';

export default {
  name: 'FiltersSidebar',
  components: {
    SfButton,
    SfSidebar,
    SfFilter,
    SfAccordion,
    SfColor,
    SfHeading,
    SfRange,
    SfCircleIcon,
    SfLoader,
  },
  setup(props, context) {
    const route = useRoute();

    const { changeFilters, isFacetColor, getFacetsFromURL } = useUiHelpers();
    const { toggleFilterSidebar, isFilterSidebarOpen } = useUiState();
    const { attributes, loading } = useAttributes();
    const { productsNotFiltered, load } = useProductsNotFiltered();

    const facets = computed(() => attributes.value);
    const products = computed(() => productsNotFiltered.value);
    const selectedFilters = ref({});
    const priceRange = ref([]);
    const maxPrice = ref({ min: 0, max: 1 });

    const setSelectedFilters = () => {
      if (!facets.value.length) return;

      selectedFilters.value = facets.value.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.id]: curr.options
            .filter((o) => o.selected)
            .map((o) => o.stringValue),
        }),
        {}
      );

      for (const filter in selectedFilters.value) {
        const find = facets.value.find((f) => f.id === filter);

        if (find?.type === 'integer') {
          Vue.set(selectedFilters.value, filter, find.range || []);
        }
      }
    };

    const isFilterSelected = (facet, option) =>
      (selectedFilters.value[facet.id] || []).includes(option.stringValue);

    const selectFilter = (facet, option) => {
      if (!selectedFilters.value[facet.id]) {
        Vue.set(selectedFilters.value, facet.id, []);
      }

      if (
        selectedFilters.value[facet.id].find((f) => f === option.stringValue)
      ) {
        selectedFilters.value[facet.id] = selectedFilters.value[
          facet.id
        ].filter((f) => f !== option.stringValue);
        return;
      }

      selectedFilters.value[facet.id].push(option.stringValue);
    };

    const setMaxPrice = (products) => {
      if (!products?.length) return { min: 0, max: 1 };

      const prices = products.map(
        (prod) => prod.variants[0].channelPricings[0].price / 100
      );

      maxPrice.value = {
        min: Math.min(...prices),
        max: Math.max(...prices),
      };
    };

    const getPrice = () =>
      route.value.query?.priceRange?.split('..')?.map((price) => price / 100) ||
      Object.values(maxPrice.value);
    const setPrice = (range) => (priceRange.value = range);

    const isRangeSelected = (facet) =>
      Boolean(selectedFilters.value[facet.id]?.length);
    const getRange = (facet) =>
      isRangeSelected(facet) ? selectedFilters.value[facet.id] : [0, 20];
    const setRange = (facet, range) =>
      Vue.set(
        selectedFilters.value,
        facet.id,
        range.map((num) => parseInt(num))
      );
    const removeRange = (facet) => {
      selectedFilters.value[facet.id] = [];
    };

    const clearFilters = () => {
      selectedFilters.value = {};
      priceRange.value = Object.values(maxPrice.value);

      toggleFilterSidebar();
      changeFilters(selectedFilters.value, priceRange.value);
    };

    const applyFilters = () => {
      toggleFilterSidebar();
      changeFilters(selectedFilters.value, priceRange.value);
    };

    if (attributes.value) setSelectedFilters();

    onMounted(async () => {
      context.root.$scrollTo(context.root.$el, 2000);
      await load(getFacetsFromURL());
      setPrice(getPrice());
    });

    watch(
      () => attributes.value,
      () => {
        setPrice(getPrice());
        setSelectedFilters();
      }
    );

    watch(
      () => products.value,
      (newVal) => {
        setMaxPrice(newVal.products);
        setPrice(getPrice());
      }
    );

    return {
      facets,
      loading,
      isFacetColor,
      selectFilter,
      isFilterSelected,
      isFilterSidebarOpen,
      toggleFilterSidebar,
      clearFilters,
      applyFilters,
      priceRange,
      getPrice,
      maxPrice,
      setPrice,
      isRangeSelected,
      getRange,
      setRange,
      removeRange,
      selectedFilters,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar-filters {
  --overlay-z-index: 3;
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}
::v-deep .sf-sidebar__bottom {
  @include for-mobile {
    margin-bottom: var(--spacer-2xl);
  }
}
.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__colors {
    display: flex;
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }
  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }
  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);
    &:last-child {
      border-bottom: 0;
    }
    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }
  &__range {
    margin: var(--spacer-xl) 0 calc(var(--spacer-xl) + var(--spacer-base)) 0;

    @include for-mobile {
      padding: 0 var(--spacer-sm);
    }
  }
  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
  &__buttons {
    margin: var(--spacer-sm) 0;
  }
  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
  &__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--spacer-xs);
  }
}
</style>
