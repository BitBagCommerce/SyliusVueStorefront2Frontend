<template>
  <div id="filters">
    <SfSidebar
      :visible="isFilterSidebarOpen"
      title="Filters"
      class="sidebar-filters"
      @close="toggleFilterSidebar"
    >
      <div class="filters desktop-only">
        <SfHeading
          :level="4"
          title="Price:"
          class="filters__title sf-heading--left"
        />
        <SfRange
          :config="rangeConfig"
          class="filters__price"
          @change="setPriceRange"
        />
        <SfHeading
          :level="4"
          title="Attributes:"
          class="filters__title sf-heading--left"
        />
        <div v-for="(facet, i) in facets" :key="i">
          <!-- <div
            v-if="isFacetColor(facet)"
            class="filters__colors"
            :key="`${facet.id}-colors`"
          >
            <SfColor
              v-for="option in facet.options"
              :key="`${facet.id}-${option.value}`"
              :color="option.value"
              :selected="isFilterSelected(facet, option)"
              class="filters__color"
              @click="() => selectFilter(facet, option)"
            />
          </div> -->
          <div>
            <SfFilter
              v-if="facet.type === 'text'"
              :label="facet.stringValue"
              :selected="isFilterSelected(facet)"
              class="filters__item"
              @change="() => selectFilter(facet)"
            />
            <SfRange
              v-else
              :config="rangeConfig"
              class="filters__price"
              @change="setPriceRange"
            />
          </div>
        </div>
      </div>
      <!-- <SfAccordion class="filters smartphone-only">
        <div v-for="(facet, i) in facets" :key="i">
          <SfAccordionItem
            :key="`filter-title-${facet.id}`"
            :header="facet.label"
            class="filters__accordion-item"
          >
            <SfFilter
              v-for="option in facet.options"
              :key="`${facet.id}-${option.id}`"
              :label="option.id"
              :selected="isFilterSelected(facet, option)"
              class="filters__item"
              @change="() => selectFilter(facet, option)"
            />
          </SfAccordionItem>
        </div>
      </SfAccordion> -->
      <template #content-bottom>
        <div class="filters__buttons">
          <SfButton
            class="sf-button--full-width"
            @click="applyFilters"
          >
            {{ $t('Done') }}
          </SfButton
          >
          <SfButton
            class="sf-button--full-width filters__button-clear"
            @click="clearFilters"
          >
            {{ $t('Clear all') }}
          </SfButton
          >
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
  SfInput
} from '@storefront-ui/vue';

import { ref, computed, onMounted } from '@nuxtjs/composition-api';
import { useFacet, facetGetters } from '@vue-storefront/sylius';
import { useUiHelpers, useUiState } from '~/composables';

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
    SfInput
  },
  setup(props, context) {
    const { changeFilters, isFacetColor } = useUiHelpers();
    const { toggleFilterSidebar, isFilterSidebarOpen } = useUiState();
    const { result } = useFacet();
    const facets = computed(() => {
      const data = facetGetters.getGrouped(result.value);

      const uniqueIds = [];
      const uniqueFacets = data.filter(facet => {
        if (facet.type === 'text' && !uniqueIds.includes(facet.stringValue)) {
          uniqueIds.push(facet.stringValue);

          return true;
        }

        if (facet.type === 'integer' && !uniqueIds.includes(facet.name)) {
          uniqueIds.push(facet.name);

          return true;
        }

        return false;
      });

      return uniqueFacets;
    });
    const products = computed(() => facetGetters.getProductsNotFiltered(result.value));

    const getMaxRange = computed(() => {
      if (!products.value.length) return [0, 1];

      const prices = products.value.map((prod) => prod.variants[0].channelPricings[0].price);

      return [Math.min(...prices) / 100, Math.max(...prices) / 100];
    });

    const selectedFilters = ref({
      priceRange: [0, 1],
      textFilters: [],
      integerFilters: []
    });

    const getRange = computed(() => result.value.input.price?.[0].between.split('..').map(price => price / 100) || getMaxRange.value);

    const rangeConfig = computed(() => ({
      start: getRange.value,
      range: {
        min: getMaxRange.value[0],
        max: getMaxRange.value[1]
      },
      tooltips: true,
      connect: true
    }));

    const setPriceRange = (range) => {
      selectedFilters.value.priceRange = range;
    };

    // const setSelectedFilters = () => {
    //   if (!facets.value.length || Object.keys(selectedFilters.value).length) return;
    //   selectedFilters.value = facets.value.reduce((prev, curr) => ({
    //     ...prev,
    //     [curr.id]: curr.options
    //       .filter(o => o.selected)
    //       .map(o => o.id)
    //   }), {});
    // };

    const isFilterSelected = (facet) => selectedFilters.value.textFilters.some(filter => filter.id === facet.id);

    const selectFilter = (facet) => {
      if (isFilterSelected(facet)) {
        selectedFilters.value.textFilters = selectedFilters.value.textFilters.filter(filter => filter.id !== facet.id);

        return;
      }

      selectedFilters.value.textFilters.push(facet);
    };

    const clearFilters = () => {
      toggleFilterSidebar();
      selectedFilters.value = [];
      // changeFilters(selectedFilters.value);
    };

    const applyFilters = () => {
      toggleFilterSidebar();
      changeFilters(selectedFilters.value);
    };

    onMounted(() => {
      context.root.$scrollTo(context.root.$el, 2000);
      setPriceRange(getRange.value);
      // setSelectedFilters();
    });

    return {
      facets,
      isFacetColor,
      selectFilter,
      isFilterSelected,
      isFilterSidebarOpen,
      toggleFilterSidebar,
      clearFilters,
      applyFilters,
      rangeConfig,
      setPriceRange
    };
  }
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
  &__price {
    margin: var(--spacer-xl) auto calc(var(--spacer-xl) + var(--spacer-base)) auto;
    width: calc(100% - var(--spacer-sm));
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
      margin-left: var(--spacer-xs);
      border: 0;
      padding: 0;
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
}
</style>
