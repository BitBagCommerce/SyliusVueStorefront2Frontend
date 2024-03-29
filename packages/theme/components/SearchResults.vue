<template>
  <div>
    <SfMegaMenu
      :visible="isSearchOpen"
      :title="$t('Search results')"
      class="search"
    >
      <transition name="sf-fade" mode="out-in" @after-enter="handleToggle">
        <div
          v-if="products && products.length > 0"
          class="search__wrapper-results"
          key="results"
        >
          <SfMegaMenuColumn
            :title="$t('Categories')"
            class="sf-mega-menu-column--pined-content-on-mobile search__categories"
          >
            <template #title="{ title }">
              <SfHeading :title="title" :level="4" class="search__header" />
            </template>
            <SfList>
              <SfListItem v-for="(category, key) in categories" :key="key">
                <SfMenuItem
                  :label="category.name"
                  :link="localePath(`/c/${category.slug}`)"
                  @click.native="$emit('close')"
                >
                  <template #mobile-nav-icon> &#8203; </template>
                </SfMenuItem>
              </SfListItem>
            </SfList>
          </SfMegaMenuColumn>
          <SfMegaMenuColumn
            :title="$t('Product suggestions')"
            class="sf-mega-menu-column--pined-content-on-mobile search__results"
          >
            <template #title="{ title }">
              <SfMenuItem
                :label="title"
                class="sf-mega-menu-column__header search__header"
              >
                <template #mobile-nav-icon> &#8203; </template>
              </SfMenuItem>
            </template>
            <SfScrollable
              class="results--desktop desktop-only"
              show-text=""
              hide-text=""
            >
              <div class="results-listing">
                <ProductCard
                  v-for="(product, index) in products"
                  :key="index"
                  :product="product"
                  :index="index"
                />
              </div>
            </SfScrollable>
            <div class="results--mobile smartphone-only">
              <ProductCard
                v-for="(product, index) in products"
                :key="index"
                :product="product"
                :index="index"
              />
            </div>
          </SfMegaMenuColumn>
          <div class="action-buttons smartphone-only">
            <SfButton
              class="action-buttons__button color-light"
              @click="$emit('close')"
              >{{ $t('Cancel') }}</SfButton
            >
          </div>
        </div>
        <div v-else key="no-results" class="before-results">
          <SfImage
            src="/error/error.svg"
            height="240"
            width="240"
            class="before-results__picture"
            alt="error"
            loading="lazy"
          />
          <p class="before-results__paragraph">
            {{ $t("You haven't searched for items yet") }}
          </p>
          <p class="before-results__paragraph">
            {{ $t("Let's start now - we'll help you") }}
          </p>
          <SfButton
            class="before-results__button color-secondary smartphone-only"
            @click="$emit('close')"
            >{{ $t('Go back') }}</SfButton
          >
        </div>
      </transition>
    </SfMegaMenu>
  </div>
</template>
<script>
import {
  SfMegaMenu,
  SfList,
  SfBanner,
  SfProductCard,
  SfScrollable,
  SfMenuItem,
  SfButton,
  SfHeading,
} from '@storefront-ui/vue';
import SfImage from '~/components/SearchResults/SfImage.vue';
import { ref, watch, computed } from '@nuxtjs/composition-api';
import { productGetters, useCart } from '@vue-storefront/sylius';
import { useUiNotification } from '~/composables/';
import ProductCard from '~/components/Product/ProductCard.vue';
import useDropdown from '~/composables/useDropdown';

export default {
  name: 'SearchResults',
  components: {
    ProductCard,
    SfMegaMenu,
    SfList,
    SfBanner,
    SfProductCard,
    SfScrollable,
    SfMenuItem,
    SfButton,
    SfImage,
    SfHeading,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    result: {
      type: Object,
    },
  },
  setup(props, { emit, root }) {
    const { addItem: addItemToCart, isInCart, error } = useCart();
    const { toggle } = useDropdown();
    const { send } = useUiNotification();
    const isSearchOpen = ref(props.visible);
    const products = computed(() => props.result?.products);
    const categories = computed(() => props.result?.categories);

    const handleAddToCart = async (params) => {
      await addItemToCart(params);

      const { addItem: addItemError } = error.value;

      if (addItemError) {
        send({ type: 'danger', message: addItemError.message });

        return;
      }

      send({
        type: 'success',
        message: root.$t('Product has been added to the cart'),
      });
    };

    const handleToggle = () => {
      const scrollable = document.querySelector('.sf-scrollable__content');

      scrollable.addEventListener('scroll', () => toggle());
    };

    watch(
      () => props.visible,
      (newVal) => {
        isSearchOpen.value = newVal;

        if (isSearchOpen.value) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
          emit('remove-search-results');
        }
      }
    );

    return {
      isSearchOpen,
      productGetters,
      products,
      categories,
      handleAddToCart,
      isInCart,
      handleToggle,
    };
  },
};
</script>
<style lang="scss" scoped>
.search {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 3;
  --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
  --mega-menu-content-padding: 0 0 var(--spacer-2xl) 0;
  --mega-menu-height: auto;

  @include for-desktop {
    --mega-menu-content-padding: var(--spacer-xl) 0;
  }

  @include for-mobile {
    --mega-menu-height: auto;
    top: 5.25rem;
    bottom: 0;
    overflow: scroll;
    z-index: 10;
  }

  &__wrapper-results {
    width: 100%;
    display: flex;
    flex-direction: column;

    @include for-desktop {
      flex-direction: row;
      flex: 1;
    }

    @include for-mobile {
      ::v-deep .sf-scrollable__content {
        display: contents;
      }
    }
  }
  &__categories {
    flex: 0 0 220px;
    margin: var(--spacer-sm);
    @include for-mobile {
      width: 95%;
      margin: auto;
      flex: 0 0 auto;
    }
  }
  &__results {
    flex: 1;
  }
  &__header {
    text-align: left;
  }
  ::v-deep .sf-bar {
    display: none;
  }
  ::v-deep .sf-mega-menu {
    &__menu {
      align-items: center;
    }
    &-column__header {
      display: none;
      @include for-desktop {
        display: flex;
      }
    }
  }
}
.results {
  &--desktop {
    --scrollable-max-height: 35vh;
    --product-card-add-button-bottom: var(--spacer-base);
  }
  &--mobile {
    --scrollable-max-height: 35vh;

    padding: var(--spacer-base) var(--spacer-sm);
    display: grid;
    grid-gap: var(--spacer-sm);
    grid-template-columns: repeat(auto-fit, 10rem);
    justify-content: center;
    background: var(--c-white);
  }
}

.see-all {
  padding: var(--spacer-xl) 0 0 var(--spacer-sm);
}
.action-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacer-sm);
  background: var(--c-white);

  &__button {
    width: calc(100% - var(--spacer-sm));
    margin: 0 auto;
  }
}

.results-listing {
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--spacer-2xs);
}
.result-card {
  margin: var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-2xs) 0;
  }
}

.before-results {
  box-sizing: border-box;
  padding: var(--spacer-base) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}
</style>
